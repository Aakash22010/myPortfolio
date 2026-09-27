import express from "express";
import { z } from "zod";
import sql from "../db/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const SkillSchema = z.object({
  name:     z.string().min(1).max(80),
  category: z.string().min(1).max(80),
  // level is a select in the admin UI: "Beginner" | "Intermediate" | "Advanced"
  level:    z.enum(["Beginner", "Intermediate", "Advanced"]).optional(),
  details:  z.string().max(300).optional(),
});

router.get("/", async (req, res) => {
  const rows = await sql`SELECT * FROM skills WHERE visible = true ORDER BY order_index`;
  res.json(rows);
});

router.get("/all", auth, async (req, res) => {
  const rows = await sql`SELECT * FROM skills ORDER BY order_index`;
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const parsed = SkillSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, category, level, details } = parsed.data;
  const [row] = await sql`
    INSERT INTO skills (name, category, level, details, visible, order_index)
    VALUES (${name}, ${category}, ${level ?? null}, ${details ?? null}, true,
            (SELECT COALESCE(MAX(order_index) + 1, 0) FROM skills))
    RETURNING *`;
  res.status(201).json(row);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = SkillSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, category, level, details } = parsed.data;
  // Optional fields omitted from the body → keep the existing value
  const [row] = await sql`
    UPDATE skills SET
      name = ${name}, category = ${category},
      level   = CASE WHEN ${level === undefined}   THEN level   ELSE ${level ?? null}   END,
      details = CASE WHEN ${details === undefined} THEN details ELSE ${details ?? null} END
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (!row) return res.status(404).json({ error: "Skill not found" });
  res.json(row);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const [row] = await sql`
    UPDATE skills SET visible = NOT visible WHERE id = ${req.params.id} RETURNING *`;
  if (!row) return res.status(404).json({ error: "Skill not found" });
  res.json(row);
});

router.delete("/:id", auth, async (req, res) => {
  await sql`DELETE FROM skills WHERE id = ${req.params.id}`;
  res.json({ success: true });
});

export default router;
