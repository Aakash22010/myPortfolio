import express from "express";
import supabase from "../db/supabase.js";

const router = express.Router();

// GET /api/views — increment count and return it
router.post("/", async (req, res) => {
  const { data, error } = await supabase.rpc("increment_views");
  if (error) return res.status(500).json({ error: error.message });
  // rpc returns an array; grab the first value
  const count = Array.isArray(data) ? data[0] : data;
  res.json({ count });
});

// GET /api/views — just read, no increment (for admin / debugging)
router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("page_views")
    .select("count")
    .eq("id", 1)
    .single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ count: data.count });
});

export default router;