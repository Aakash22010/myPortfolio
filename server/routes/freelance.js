import express from "express";
import { z } from "zod";
import sql from "../db/index.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const FreelanceSchema = z.object({
  tag:         z.string().min(1).max(60),
  title:       z.string().min(1).max(120),
  description: z.string().min(1).max(400),
});

router.get("/", async (req, res) => {
  const rows = await sql`SELECT * FROM freelance_services WHERE visible = true ORDER BY order_index`;
  res.json(rows);
});

router.get("/all", auth, async (req, res) => {
  const rows = await sql`SELECT * FROM freelance_services ORDER BY order_index`;
  res.json(rows);
});

router.post("/", auth, async (req, res) => {
  const parsed = FreelanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { tag, title, description } = parsed.data;
  const [row] = await sql`
    INSERT INTO freelance_services (tag, title, description, visible, order_index)
    VALUES (${tag}, ${title}, ${description}, true,
            (SELECT COALESCE(MAX(order_index) + 1, 0) FROM freelance_services))
    RETURNING *`;
  res.status(201).json(row);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = FreelanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { tag, title, description } = parsed.data;
  const [row] = await sql`
    UPDATE freelance_services SET tag = ${tag}, title = ${title}, description = ${description}
    WHERE id = ${req.params.id}
    RETURNING *`;
  if (!row) return res.status(404).json({ error: "Service not found" });
  res.json(row);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const [row] = await sql`
    UPDATE freelance_services SET visible = NOT visible WHERE id = ${req.params.id} RETURNING *`;
  if (!row) return res.status(404).json({ error: "Service not found" });
  res.json(row);
});

router.delete("/:id", auth, async (req, res) => {
  await sql`DELETE FROM freelance_services WHERE id = ${req.params.id}`;
  res.json({ success: true });
});

export default router;
