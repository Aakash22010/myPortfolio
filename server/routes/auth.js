import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../db/supabase.js";

const router = express.Router();

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ error: "Username and password required" });

  const { data, error } = await supabase
    .from("admin_users")
    .select("*")
    .eq("username", username)
    .single();

  if (error || !data)
    return res.status(401).json({ error: "Invalid credentials" });

  const valid = await bcrypt.compare(password, data.password_hash);
  if (!valid)
    return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: data.id, username: data.username },
    process.env.JWT_SECRET,
    { expiresIn: "12h" }
  );

  res.json({ token });
});

export default router;