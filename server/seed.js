import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

async function seed() {
  console.log("Seeding database...");

  const hash = await bcrypt.hash("Aakash@29320", 12);
  const { error: adminErr } = await supabase.from("admin_users")
    .upsert([{ username: "aakash", password_hash: hash }], { onConflict: "username" });
  if (adminErr) console.error("Admin:", adminErr.message);
  else console.log("✓ Admin user created");

  console.log("\nDone!");
}

seed().catch(console.error);
