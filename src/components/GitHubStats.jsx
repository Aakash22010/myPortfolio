import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations";

const GITHUB_USERNAME = "Aakash22010";

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchGitHub() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=3`),
        ]);
        setProfile(await profileRes.json());
        const r = await reposRes.json();
        setRepos(Array.isArray(r) ? r : []);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchGitHub();
  }, []);

  function timeAgo(dateStr) {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);
    if (mins < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }

  if (error) return null;

  return (
    <motion.div variants={fadeUp} className="mt-8 sm:mt-10 space-y-4">
      <p className="mono text-xs" style={{ color: "var(--muted)" }}>// github activity</p>

      {/* CONTRIBUTION GRAPH — scrollable wrapper prevents horizontal overflow */}
      <div className="glass rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>contribution graph</span>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-xs"
            style={{ color: "var(--accent)" }}
          >
            @{GITHUB_USERNAME} ↗
          </a>
        </div>
        {/* On desktop the image stretches to fill. On mobile (<640px) it
            keeps a minimum readable width and the parent scrolls.          */}
        <div
          className="p-3 sm:p-4"
          style={{ background: "var(--surface)", overflowX: "auto" }}
        >
          <img
            src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
            alt="GitHub contribution graph"
            className="rounded"
            style={{
              filter: "hue-rotate(165deg) saturate(0.8) brightness(0.9)",
              minHeight: "80px",
              // Fill the container on all screen sizes;
              // minWidth keeps it legible on very narrow phones.
              width: "100%",
              minWidth: "480px",
              display: "block",
            }}
            loading="lazy"
            decoding="async"
            onError={(e) => { e.target.onerror = null; e.target.src = "/github-placeholder.png"; }}
          />
        </div>
      </div>

      {/* STATS + RECENT REPOS */}
      {loading ? (
        <p className="mono text-xs" style={{ color: "var(--muted)" }}>Fetching GitHub data...</p>
      ) : (
        profile && (
          // Stack vertically on mobile, side-by-side on sm+
          <div className="flex flex-col sm:grid sm:grid-cols-2 gap-4">

            {/* STATS */}
            <div className="glass rounded-xl p-4 sm:p-5" style={{ border: "1px solid var(--border)" }}>
              <p className="mono text-xs mb-4" style={{ color: "var(--muted)" }}>stats</p>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {[
                  { label: "Public Repos", value: profile.public_repos },
                  { label: "Followers",    value: profile.followers },
                  { label: "Following",    value: profile.following },
                  { label: "Gists",        value: profile.public_gists },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="text-center p-2 sm:p-3 rounded-lg"
                    style={{ background: "var(--glow)", border: "1px solid var(--border)" }}
                  >
                    <div className="mono text-base sm:text-lg font-bold" style={{ color: "var(--accent)" }}>
                      {value ?? "—"}
                    </div>
                    <div className="mono text-xs mt-0.5" style={{ color: "var(--muted)" }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RECENTLY PUSHED */}
            <div className="glass rounded-xl p-4 sm:p-5" style={{ border: "1px solid var(--border)" }}>
              <p className="mono text-xs mb-4" style={{ color: "var(--muted)" }}>recently pushed</p>
              <div className="space-y-3">
                {repos.slice(0, 3).map((repo) => (
                  <a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-2 group"
                  >
                    <div className="flex-1 min-w-0">
                      <p
                        className="mono text-xs font-medium truncate group-hover:underline"
                        style={{ color: "var(--accent)" }}
                      >
                        {repo.name}
                      </p>
                      {repo.description && (
                        <p className="mono text-xs truncate mt-0.5" style={{ color: "var(--muted)" }}>
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {repo.language && (
                          <span className="mono text-xs" style={{ color: "var(--muted)" }}>
                            {repo.language}
                          </span>
                        )}
                        <span className="mono text-xs" style={{ color: "var(--muted)" }}>
                          ⭐ {repo.stargazers_count}
                        </span>
                      </div>
                    </div>
                    <span className="mono text-xs shrink-0" style={{ color: "var(--muted)" }}>
                      {timeAgo(repo.pushed_at)}
                    </span>
                  </a>
                ))}
              </div>
            </div>

          </div>
        )
      )}
    </motion.div>
  );
}