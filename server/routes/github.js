import express from "express";
import fetch from "node-fetch";

const router = express.Router();
const USERNAME = "Aakash22010";

router.get("/", async (req, res) => {
  try {
    const headers = process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {};

    const [profileRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=3`, { headers }),
    ]);

    if (!profileRes.ok) {
      return res.status(profileRes.status).json({ error: "GitHub API error" });
    }

    const profile = await profileRes.json();
    const repos   = await reposRes.json();

    res.json({ profile, repos: Array.isArray(repos) ? repos : [] });
  } catch (err) {
    console.error("[github]", err);
    res.status(500).json({ error: "Failed to fetch GitHub data" });
  }
});

export default router;