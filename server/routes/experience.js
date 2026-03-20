import express from "express";
import supabase from "../db/supabase.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("experience").select("*").eq("visible", true).order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/all", auth, async (req, res) => {
  const { data, error } = await supabase
    .from("experience").select("*").order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { role, company, duration, type, points } = req.body;
  const { data: existing } = await supabase.from("experience").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;
  const { data, error } = await supabase.from("experience")
    .insert([{ role, company, duration, type, points, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const { role, company, duration, type, points } = req.body;
  const { data, error } = await supabase.from("experience")
    .update({ role, company, duration, type, points })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current } = await supabase.from("experience").select("visible").eq("id", req.params.id).single();
  const { data, error } = await supabase.from("experience")
    .update({ visible: !current.visible })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("experience").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;