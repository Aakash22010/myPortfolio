// Creates all tables in Neon. Safe to re-run. Usage: npm run db:setup
import { readFile } from "node:fs/promises";
import sql from "../db/index.js";

const schema = await readFile(new URL("../db/schema.sql", import.meta.url), "utf8");

// The HTTP driver runs one statement per request
const statements = schema
  .split("\n").filter((line) => !line.trim().startsWith("--")).join("\n")
  .split(";").map((s) => s.trim()).filter(Boolean);

for (const statement of statements) {
  await sql.query(statement);
}

console.log(`Schema applied (${statements.length} statements).`);
