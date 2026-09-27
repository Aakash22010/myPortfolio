import express from "express";
import { z } from "zod";
import sql from "../db/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// The admin form sends "" for blank fields; "#" is the stored placeholder for "no link"
const LinkUrl = z.preprocess(
  (v) => (typeof v === "string" && v.trim() === "" ? undefined : v),
  z.union([z.string().url(), z.literal("#")]).default("#"),
);

const ProjectSchema = z.object({
  title:       z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  tech:        z.array(z.string()).min(1),
  github:      LinkUrl,
  live:        LinkUrl,
  featured:    z.boolean().optional().default(false),
  // "" clears the screenshot; omitting the field keeps the existing one
  image_url:   z.preprocess(
    (v) => (typeof v === "string" && v.trim() === "" ? null : v),
    z.string().url().nullable().optional(),
  ),
});

router.get("/", async (req, res) => {
  const rows = await sql`SELECT * FROM projects WHERE visible = true ORDER BY order_index`;
  res.json(rows);
});

router.get("/all", auth, async (req, res) => {
  const rows = await sql`SELECT * FROM projects ORDER BY order_index`;
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const parsed = ProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, tech, github, live, featured, image_url } = parsed.data;
  const [row] = await sql`
    INSERT INTO projects (title, description, tech, github, live, featured, image_url, visible, order_index)
    VALUES (${title}, ${description}, ${tech}, ${github}, ${live}, ${featured}, ${image_url ?? null}, true,
            (SELECT COALESCE(MAX(order_index) + 1, 0) FROM projects))
    RETURNING *`;
  res.status(201).json(row);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = ProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, tech, github, live, featured, image_url } = parsed.data;
  // image_url omitted from the body → keep the existing value
  const [row] = await sql`
    UPDATE projects SET
      title = ${title}, description = ${description}, tech = ${tech},
      github = ${github}, live = ${live}, featured = ${featured},
      image_url = CASE WHEN ${image_url === undefined} THEN image_url ELSE ${image_url ?? null} END
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (!row) return res.status(404).json({ error: "Project not found" });
  res.json(row);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const [row] = await sql`
    UPDATE projects SET visible = NOT visible WHERE id = ${req.params.id} RETURNING *`;
  if (!row) return res.status(404).json({ error: "Project not found" });
  res.json(row);
});

router.delete("/:id", auth, async (req, res) => {
  await sql`DELETE FROM projects WHERE id = ${req.params.id}`;
  res.json({ success: true });
});

export default router;
