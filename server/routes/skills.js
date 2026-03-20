import express from "express";
import supabase from "../db/supabase.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("skills").select("*").eq("visible", true).order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/all", auth, async (req, res) => {
  const { data, error } = await supabase
    .from("skills").select("*").order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { name, category, level, details } = req.body;
  const { data: existing } = await supabase.from("skills").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;
  const { data, error } = await supabase.from("skills")
    .insert([{ name, category, level, details, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const { name, category, level, details } = req.body;
  const { data, error } = await supabase.from("skills")
    .update({ name, category, level, details })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current } = await supabase.from("skills").select("visible").eq("id", req.params.id).single();
  const { data, error } = await supabase.from("skills")
    .update({ visible: !current.visible })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("skills").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;