import express from "express";
import { z } from "zod";
import supabase from "../db/supabase.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const ProjectSchema = z.object({
  title:       z.string().min(1).max(120),
  description: z.string().min(1).max(500),
  tech:        z.array(z.string()).min(1),
  github:      z.string().url().optional().default("#"),
  live:        z.string().url().optional().default("#"),
  featured:    z.boolean().optional().default(false),
  image_url:   z.string().url().nullable().optional(),
});

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
  const parsed = ProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, tech, github, live, featured, image_url } = parsed.data;
  const { data: existing } = await supabase
    .from("projects").select("order_index")
    .order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase.from("projects")
    .insert([{ title, description, tech, github, live, featured, image_url: image_url ?? null, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = ProjectSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { title, description, tech, github, live, featured, image_url } = parsed.data;
  const { data, error } = await supabase.from("projects")
    .update({ title, description, tech, github, live, featured, image_url })
    .eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current, error: fetchErr } = await supabase
    .from("projects").select("visible").eq("id", req.params.id).single();
  if (fetchErr || !current) return res.status(404).json({ error: "Project not found" });

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