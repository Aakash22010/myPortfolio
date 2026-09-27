import express from "express";
import sql from "../db/index.js";

const router = express.Router();

// POST /api/views — increment count and return it
router.post("/", async (req, res) => {
  const [row] = await sql`
    INSERT INTO page_views (id, count) VALUES (1, 1)
    ON CONFLICT (id) DO UPDATE SET count = page_views.count + 1
    RETURNING count`;
  res.json({ count: row.count });
});

// GET /api/views — just read, no increment (for admin / debugging)
router.get("/", async (req, res) => {
  const [row] = await sql`SELECT count FROM page_views WHERE id = 1`;
  res.json({ count: row?.count ?? 0 });
});

export default router;
