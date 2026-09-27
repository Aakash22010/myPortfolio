import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { fadeUp } from "../animations";
import { api } from "../lib/api";

const GITHUB_USERNAME = "Aakash22010";
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const LEVEL_OPACITY = [0, 0.3, 0.5, 0.75, 1];

// Levels 1–4 split the non-zero days into quartiles, like GitHub's own graph
function levelFor(count, thresholds) {
  if (!count) return 0;
  return 1 + thresholds.filter((t) => count > t).length;
}

// Live contribution calendar from /api/github/contributions (cached ~10 min server-side).
// Falls back to the third-party image if the API is unavailable.
function ContributionGraph() {
  const [data, setData]     = useState(null);
  const [failed, setFailed] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    api.getGitHubContributions().then(setData).catch(() => setFailed(true));
  }, []);

  // On narrow screens show the most recent weeks first
  useEffect(() => {
    if (data && scrollRef.current) scrollRef.current.scrollLeft = scrollRef.current.scrollWidth;
  }, [data]);

  if (failed) {
    return (
      <div className="p-3 sm:p-4" style={{ background: "var(--surface)", overflowX: "auto" }}>
        <img
          src={`https://ghchart.rshah.org/${GITHUB_USERNAME}`}
          alt="GitHub contribution graph"
          className="rounded"
          style={{ filter: "hue-rotate(165deg) saturate(0.8) brightness(0.9)", minHeight: "80px", width: "100%", minWidth: "480px", display: "block" }}
          loading="lazy" decoding="async"
        />
      </div>
    );
  }

  if (!data) {
    return <div className="p-4 mono text-xs animate-pulse" style={{ background: "var(--surface)", color: "var(--muted)", minHeight: "130px" }}>loading contributions…</div>;
  }

  const counts = data.weeks.flat().map((d) => d.count).filter(Boolean).sort((a, b) => a - b);
  const q = (p) => counts[Math.floor((counts.length - 1) * p)] ?? 0;
  const thresholds = [q(0.25), q(0.5), q(0.75)];

  // Month label above the first week of each month; skip one that would collide with the next
  const monthOf = (i) => new Date(data.weeks[i][0].date).getUTCMonth();
  const starts = data.weeks.map((_, i) => i === 0 || monthOf(i) !== monthOf(i - 1));
  const monthLabels = data.weeks.map((_, i) => {
    if (!starts[i]) return "";
    const next = starts.indexOf(true, i + 1);
    return next !== -1 && next - i < 3 ? "" : MONTHS[monthOf(i)];
  });

  return (
    <div style={{ background: "var(--surface)" }}>
      <div ref={scrollRef} className="p-3 sm:p-4 scrollbar-hide" style={{ overflowX: "auto" }}>
        <div className="inline-flex gap-2" style={{ minWidth: "max-content" }}>
          {/* Day labels */}
          <div className="grid mono pt-4" style={{ gridTemplateRows: "repeat(7, 11px)", gap: "3px", fontSize: "9px", color: "var(--muted)" }}>
            {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => <span key={i} className="leading-[11px]">{d}</span>)}
          </div>
          <div>
            {/* Month labels */}
            <div className="grid mono mb-1" style={{ gridTemplateColumns: `repeat(${data.weeks.length}, 11px)`, gap: "3px", fontSize: "9px", color: "var(--muted)", height: "12px" }}>
              {monthLabels.map((m, i) => <span key={i} className="whitespace-nowrap">{m}</span>)}
            </div>
            {/* Cells: one column per week, Sunday at the top */}
            <div className="grid grid-flow-col" style={{ gridTemplateRows: "repeat(7, 11px)", gridAutoColumns: "11px", gap: "3px" }}>
              {data.weeks.map((week, wi) =>
                week.map((day, di) => {
                  const level = levelFor(day.count, thresholds);
                  return (
                    <div
                      key={day.date}
                      title={`${day.count} contribution${day.count === 1 ? "" : "s"} on ${day.date}`}
                      className="rounded-[2px]"
                      style={{
                        gridColumn: wi + 1,
                        gridRow: new Date(day.date).getUTCDay() + 1 || di + 1,
                        background: level ? "var(--accent)" : "var(--glow)",
                        opacity: level ? LEVEL_OPACITY[level] : 1,
                        border: level ? "none" : "1px solid var(--border)",
                      }}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 pb-3 flex flex-wrap items-center justify-between gap-2 mono text-xs" style={{ color: "var(--muted)" }}>
        <span>{data.total.toLocaleString()} contributions in the last year</span>
        <span className="flex items-center gap-1">
          less
          {LEVEL_OPACITY.map((o, i) => (
            <span key={i} className="inline-block rounded-[2px]" style={{ width: 10, height: 10, background: i ? "var(--accent)" : "var(--glow)", opacity: i ? o : 1, border: i ? "none" : "1px solid var(--border)" }} />
          ))}
          more
        </span>
      </div>
    </div>
  );
}

export default function GitHubStats() {
  const [profile, setProfile] = useState(null);
  const [repos, setRepos]     = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    // Proxied through our backend — avoids the 60 req/hr GitHub unauthenticated limit
    api.getGitHubStats()
      .then(({ profile, repos }) => {
        setProfile(profile);
        setRepos(repos);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  function timeAgo(dateStr) {
    const diff  = Date.now() - new Date(dateStr).getTime();
    const mins  = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days  = Math.floor(diff / 86400000);
    if (mins  < 60) return `${mins}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days  < 30) return `${days}d ago`;
    return `${Math.floor(days / 30)}mo ago`;
  }

  if (error) return null;

  return (
    <motion.div variants={fadeUp} className="mt-8 sm:mt-10 space-y-4">
      <p className="mono text-xs" style={{ color: "var(--muted)" }}>// github activity</p>

      {/* CONTRIBUTION GRAPH */}
      <div className="glass rounded-xl overflow-hidden" style={{ border: "1px solid var(--border)" }}>
        <div
          className="px-4 py-2.5 flex items-center justify-between"
          style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>contribution graph</span>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank" rel="noopener noreferrer"
            className="mono text-xs" style={{ color: "var(--accent)" }}
          >
            @{GITHUB_USERNAME} ↗
          </a>
        </div>
        <ContributionGraph />
      </div>

      {/* STATS + RECENT REPOS */}
      {loading ? (
        <p className="mono text-xs" style={{ color: "var(--muted)" }}>Fetching GitHub data...</p>
      ) : (
        profile && (
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
                  <div key={label} className="text-center p-2 sm:p-3 rounded-lg"
                    style={{ background: "var(--glow)", border: "1px solid var(--border)" }}>
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
                  <a key={repo.id} href={repo.html_url} target="_blank" rel="noopener noreferrer"
                    className="flex items-start justify-between gap-2 group">
                    <div className="flex-1 min-w-0">
                      <p className="mono text-xs font-medium truncate group-hover:underline"
                        style={{ color: "var(--accent)" }}>{repo.name}</p>
                      {repo.description && (
                        <p className="mono text-xs truncate mt-0.5" style={{ color: "var(--muted)" }}>
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-1">
                        {repo.language && (
                          <span className="mono text-xs" style={{ color: "var(--muted)" }}>{repo.language}</span>
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