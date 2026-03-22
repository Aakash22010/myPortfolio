import cron from "node-cron";
import fetch from "node-fetch";

const SELF_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${process.env.PORT || 5000}`;

export function startKeepalive() {
  // Runs every 14 minutes — just under Render's 15-min inactivity threshold
  cron.schedule("*/14 * * * *", async () => {
    try {
      const res = await fetch(`${SELF_URL}/health`);
      console.log(`[keepalive] ${new Date().toISOString()} — status ${res.status}`);
    } catch (err) {
      console.error(`[keepalive] ping failed:`, err.message);
    }
  });

  console.log(`[keepalive] started — pinging ${SELF_URL}/health every 14 min`);
}