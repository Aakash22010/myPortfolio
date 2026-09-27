import express from "express";
import { z } from "zod";
import sql from "../db/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const ExperienceSchema = z.object({
  role:     z.string().min(1).max(120),
  company:  z.string().min(1).max(120),
  duration: z.string().min(1).max(80),
  type:     z.string().min(1).max(80),
  points:   z.array(z.string()).min(1),
});

router.get("/", async (req, res) => {
  const rows = await sql`SELECT * FROM experience WHERE visible = true ORDER BY order_index`;
  res.json(rows);
});

router.get("/all", auth, async (req, res) => {
  const rows = await sql`SELECT * FROM experience ORDER BY order_index`;
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const parsed = ExperienceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { role, company, duration, type, points } = parsed.data;
  const [row] = await sql`
    INSERT INTO experience (role, company, duration, type, points, visible, order_index)
    VALUES (${role}, ${company}, ${duration}, ${type}, ${points}, true,
            (SELECT COALESCE(MAX(order_index) + 1, 0) FROM experience))
    RETURNING *`;
  res.status(201).json(row);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = ExperienceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { role, company, duration, type, points } = parsed.data;
  const [row] = await sql`
    UPDATE experience SET
      role = ${role}, company = ${company}, duration = ${duration}, type = ${type}, points = ${points}
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (!row) return res.status(404).json({ error: "Experience not found" });
  res.json(row);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const [row] = await sql`
    UPDATE experience SET visible = NOT visible WHERE id = ${req.params.id} RETURNING *`;
  if (!row) return res.status(404).json({ error: "Experience not found" });
  res.json(row);
});

router.delete("/:id", auth, async (req, res) => {
  await sql`DELETE FROM experience WHERE id = ${req.params.id}`;
  res.json({ success: true });
});

export default router;
