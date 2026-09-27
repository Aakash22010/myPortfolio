// Creates or resets the admin login. Usage: npm run create-admin -- <username> <password>
import bcrypt from "bcryptjs";
import sql from "../db/index.js";

const [username, password] = process.argv.slice(2);
if (!username || !password) {
  console.error("Usage: npm run create-admin -- <username> <password>");
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
await sql`
  INSERT INTO admin_users (username, password_hash) VALUES (${username}, ${hash})
  ON CONFLICT (username) DO UPDATE SET password_hash = EXCLUDED.password_hash`;

console.log(`Admin "${username}" saved.`);
