import express from "express";
import supabase from "../db/supabase.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("projects").select("*").eq("visible", true).order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/all", auth, async (req, res) => {
  const { data, error } = await supabase
    .from("projects").select("*").order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const { title, description, tech, github, live, featured } = req.body;
  const { data: existing } = await supabase.from("projects").select("order_index").order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;
  const { data, error } = await supabase.from("projects")
    .insert([{ title, description, tech, github: github || "#", live: live || "#", featured: featured || false, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const { title, description, tech, github, live, featured } = req.body;
  const { data, error } = await supabase.from("projects")
    .update({ title, description, tech, github, live, featured })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current } = await supabase.from("projects").select("visible").eq("id", req.params.id).single();
  const { data, error } = await supabase.from("projects")
    .update({ visible: !current.visible }).eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("projects").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;