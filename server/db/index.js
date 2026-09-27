import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set — add your Neon connection string to server/.env");
}

// HTTP driver: every query is a stateless request, so a suspended Neon
// compute wakes up automatically on the next query — no pool to go stale.
const sql = neon(process.env.DATABASE_URL);

export default sql;
