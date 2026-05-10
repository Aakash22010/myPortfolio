import express from "express";
import { z } from "zod";
import supabase from "../db/supabase.js";
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
  const parsed = SkillSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, category, level, details } = parsed.data;
  const { data: existing } = await supabase.from("skills").select("order_index")
    .order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase.from("skills")
    .insert([{ name, category, level, details, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = SkillSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { name, category, level, details } = parsed.data;
  const { data, error } = await supabase.from("skills")
    .update({ name, category, level, details })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current, error: fetchErr } = await supabase
    .from("skills").select("visible").eq("id", req.params.id).single();
  if (fetchErr || !current) return res.status(404).json({ error: "Skill not found" });

  const { data, error } = await supabase.from("skills")
    .update({ visible: !current.visible }).eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("skills").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;  