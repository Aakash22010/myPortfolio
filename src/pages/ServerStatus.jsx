import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SECTIONS = ["projects", "skills", "experience", "freelance"];

function StatusDot({ ok }) {
  return (
    <span className="relative flex items-center justify-center w-2.5 h-2.5 shrink-0">
      {ok && (
        <span
          className="absolute inline-flex h-full w-full rounded-full animate-ping"
          style={{ background: "#4ade80", opacity: 0.6 }}
        />
      )}
      <span
        className="relative inline-flex rounded-full w-2.5 h-2.5"
        style={{ background: ok ? "#4ade80" : "#f87171" }}
      />
    </span>
  );
}

function formatUptime(seconds) {
  if (!seconds) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
}

export default function ServerStatus() {
  const [health, setHealth]           = useState(null);
  const [counts, setCounts]           = useState({});
  const [loading, setLoading]         = useState(true);
  const [lastChecked, setLastChecked] = useState(null);
  const [checking, setChecking]       = useState(false);

  async function fetchAll() {
    setChecking(true);
    try {
      const hRes  = await fetch(`${API}/health`);
      const hData = await hRes.json();
      setHealth({ ok: hRes.ok, ...hData });

      const results = {};
      await Promise.all(
        SECTIONS.map(async (s) => {
          try {
            const r = await fetch(`${API}/api/${s}`);
            const d = await r.json();
            results[s] = { ok: r.ok, count: Array.isArray(d) ? d.length : "—" };
          } catch {
            results[s] = { ok: false, count: "—" };
          }
        })
      );
      setCounts(results);
      setLastChecked(new Date());
    } catch {
      setHealth({ ok: false });
    } finally {
      setLoading(false);
      setChecking(false);
    }
  }

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 60000);
    return () => clearInterval(interval);
  }, []);

  const cardStyle = {
    background: "var(--card)",
    backdropFilter: "blur(16px)",
    border: "1px solid var(--border)",
    borderRadius: "0.75rem",
    padding: "1rem 1.25rem",
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-12 sm:py-16" style={{ background: "var(--bg)" }}>
      <div className="max-w-3xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <p className="mono text-xs mb-2" style={{ color: "var(--muted)" }}>// system</p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold">Server Status</h1>

            <div className="flex items-center gap-3 flex-wrap">
              {lastChecked && (
                <span className="mono text-xs" style={{ color: "var(--muted)" }}>
                  {lastChecked.toLocaleTimeString()}
                </span>
              )}
              <button
                onClick={fetchAll}
                disabled={checking}
                className="mono text-xs px-4 py-2 rounded-lg transition flex items-center gap-2"
                style={{
                  background: "var(--glow)",
                  color: "var(--accent)",
                  border: "1px solid var(--border)",
                  opacity: checking ? 0.6 : 1,
                }}
              >
                {checking ? "Checking..." : "↻ Refresh"}
              </button>
            </div>
          </div>

          <div
            className="mt-4 h-px"
            style={{ background: "linear-gradient(90deg, transparent, var(--accent), transparent)", opacity: 0.4 }}
          />
        </motion.div>

        {loading ? (
          <div className="mono text-sm" style={{ color: "var(--muted)" }}>Pinging server...</div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >

            {/* MAIN HEALTH CARD */}
            <div
              style={{
                ...cardStyle,
                border: `1px solid ${health?.ok ? "rgba(74,222,128,0.3)" : "rgba(248,113,113,0.3)"}`,
              }}
            >
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div className="flex items-center gap-3">
                  <StatusDot ok={health?.ok} />
                  <span className="font-semibold text-sm sm:text-base">
                    {health?.ok ? "Server is Online" : "Server is Down"}
                  </span>
                </div>
                <span
                  className="mono text-xs px-3 py-1 rounded-full"
                  style={{
                    background: health?.ok ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                    color: health?.ok ? "#4ade80" : "#f87171",
                  }}
                >
                  {health?.ok ? "operational" : "down"}
                </span>
              </div>

              {/* 1 col on tiny screens, 3 on sm+ */}
              <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[
                  { label: "endpoint", value: `${API}/health` },
                  { label: "status",   value: health?.ok ? "200 OK" : "unreachable" },
                  { label: "uptime",   value: formatUptime(health?.uptime) },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="mono text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</p>
                    <p className="mono text-xs font-medium truncate" style={{ color: "var(--text)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* API ROUTES */}
            <div style={cardStyle}>
              <p className="mono text-xs mb-4" style={{ color: "var(--muted)" }}>api routes</p>
              <div className="space-y-3">
                {SECTIONS.map((section) => {
                  const s = counts[section];
                  return (
                    <div
                      key={section}
                      className="flex items-center justify-between py-2 gap-2 flex-wrap"
                      style={{ borderBottom: "1px solid var(--border)" }}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <StatusDot ok={s?.ok} />
                        <span className="mono text-xs truncate" style={{ color: "var(--text)" }}>
                          /api/{section}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                        <span className="mono text-xs" style={{ color: "var(--accent)" }}>
                          {s?.count} items
                        </span>
                        <span
                          className="mono text-xs px-2 py-0.5 rounded"
                          style={{
                            background: s?.ok ? "rgba(74,222,128,0.1)" : "rgba(248,113,113,0.1)",
                            color: s?.ok ? "#4ade80" : "#f87171",
                          }}
                        >
                          {s?.ok ? "200" : "error"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* ENVIRONMENT */}
            <div style={cardStyle}>
              <p className="mono text-xs mb-4" style={{ color: "var(--muted)" }}>environment</p>
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: "api url",      value: API },
                  { label: "mode",         value: import.meta.env.MODE },
                  { label: "frontend",     value: window.location.origin },
                  { label: "auto-refresh", value: "every 60s" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="mono text-xs mb-1" style={{ color: "var(--muted)" }}>{label}</p>
                    <p className="mono text-xs font-medium truncate" style={{ color: "var(--text)" }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* NAV */}
            <div className="flex flex-col xs:flex-row gap-3 pt-2">
              <a
                href="/"
                className="mono text-xs px-4 py-2 rounded-lg transition glass text-center"
                style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
              >
                ← Back to Portfolio
              </a>
              <a
                href="/admin"
                className="mono text-xs px-4 py-2 rounded-lg transition text-center"
                style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
              >
                Admin Panel →
              </a>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
}