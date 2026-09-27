import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const USERNAME = "Aakash22010";
// Accounts whose contribution calendars are summed into the graph, e.g. "Aakash22010,other-account"
const CONTRIB_USERS = (process.env.GITHUB_CONTRIB_USERS || USERNAME)
  .split(",").map((u) => u.trim()).filter(Boolean);
const CACHE_MS = 10 * 60 * 1000;

const cache = new Map();
async function cached(key, load) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.value;
  const value = await load();
  cache.set(key, { at: Date.now(), value });
  return value;
}

function authHeaders() {
  return process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
}

router.get("/", async (req, res) => {
  try {
    const data = await cached("profile", async () => {
      const headers = authHeaders();
      const [profileRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
        fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=3`, { headers }),
      ]);
      if (!profileRes.ok) throw Object.assign(new Error("GitHub API error"), { status: profileRes.status });

      const profile = await profileRes.json();
      const repos   = await reposRes.json();
      return { profile, repos: Array.isArray(repos) ? repos : [] };
    });
    res.json(data);
  } catch (err) {
    console.error("[github]", err);
    res.status(err.status || 500).json({ error: "Failed to fetch GitHub data" });
  }
});

const CALENDAR_QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        weeks { contributionDays { date contributionCount } }
      }
    }
  }
}`;

async function fetchCalendar(login) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: { ...authHeaders(), "Content-Type": "application/json" },
    body: JSON.stringify({ query: CALENDAR_QUERY, variables: { login } }),
  });
  const json = await res.json();
  if (!res.ok || json.errors) throw new Error(json.errors?.[0]?.message || json.message || `GitHub GraphQL ${res.status}`);
  return json.data.user.contributionsCollection.contributionCalendar.weeks;
}

// GET /api/github/contributions — last year's daily counts, summed across CONTRIB_USERS
router.get("/contributions", async (req, res) => {
  if (!process.env.GITHUB_TOKEN) return res.status(503).json({ error: "GITHUB_TOKEN not configured" });
  try {
    const data = await cached("contributions", async () => {
      const calendars = await Promise.all(CONTRIB_USERS.map(fetchCalendar));
      const byDate = new Map();
      for (const weeks of calendars)
        for (const { contributionDays } of weeks)
          for (const { date, contributionCount } of contributionDays)
            byDate.set(date, (byDate.get(date) || 0) + contributionCount);

      // Shape the first account's calendar (all share the same date grid)
      const weeks = calendars[0].map(({ contributionDays }) =>
        contributionDays.map(({ date }) => ({ date, count: byDate.get(date) || 0 })));
      const total = [...byDate.values()].reduce((a, b) => a + b, 0);
      return { total, weeks, updatedAt: new Date().toISOString() };
    });
    res.json(data);
  } catch (err) {
    console.error("[github contributions]", err);
    res.status(502).json({ error: "Failed to fetch contributions" });
  }
});

export default router;
