import express from "express";
import { z } from "zod";
import supabase from "../db/supabase.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const FreelanceSchema = z.object({
  tag:         z.string().min(1).max(60),
  title:       z.string().min(1).max(120),
  description: z.string().min(1).max(400),
});

router.get("/", async (req, res) => {
  const { data, error } = await supabase
    .from("freelance_services").select("*").eq("visible", true).order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.get("/all", auth, async (req, res) => {
  const { data, error } = await supabase
    .from("freelance_services").select("*").order("order_index");
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.post("/", auth, async (req, res) => {
  const parsed = FreelanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { tag, title, description } = parsed.data;
  const { data: existing } = await supabase.from("freelance_services").select("order_index")
    .order("order_index", { ascending: false }).limit(1);
  const nextOrder = existing?.length ? existing[0].order_index + 1 : 0;

  const { data, error } = await supabase.from("freelance_services")
    .insert([{ tag, title, description, visible: true, order_index: nextOrder }])
    .select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data);
});

router.put("/:id", auth, async (req, res) => {
  const parsed = FreelanceSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error.flatten() });

  const { tag, title, description } = parsed.data;
  const { data, error } = await supabase.from("freelance_services")
    .update({ tag, title, description }).eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.patch("/:id/toggle", auth, async (req, res) => {
  const { data: current, error: fetchErr } = await supabase
    .from("freelance_services").select("visible").eq("id", req.params.id).single();
  if (fetchErr || !current) return res.status(404).json({ error: "Service not found" });

  const { data, error } = await supabase.from("freelance_services")
    .update({ visible: !current.visible }).eq("id", req.params.id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

router.delete("/:id", auth, async (req, res) => {
  const { error } = await supabase.from("freelance_services").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

export default router;