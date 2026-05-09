import express from "express";
import { z } from "zod";
import supabase from "../db/supabase.js";
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
  const parsed = ExperienceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { role, company, duration, type, points } = parsed.data;
  const { data: existing } = await supabase.from("experience").select("order_index")
    .order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase.from("experience")
    .insert([{ role, company, duration, type, points, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = ExperienceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { role, company, duration, type, points } = parsed.data;
  const { data, error } = await supabase.from("experience")
    .update({ role, company, duration, type, points })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current, error: fetchErr } = await supabase
    .from("experience").select("visible").eq("id", req.params.id).single();
  if (fetchErr || !current) return res.status(404).json({ error: "Experience not found" });

  const { data, error } = await supabase.from("experience")
    .update({ visible: !current.visible }).eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("experience").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;