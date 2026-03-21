import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import AdminSection from "./AdminSection";
import HeartbeatLoader from "../../components/HeartbeatLoader";

const TABS = ["projects", "skills", "experience", "freelance"];

export default function AdminDashboard() {
  const [tab, setTab] = useState("projects");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("portfolio_admin_token");
    navigate("/admin");
  }

  async function loadAll() {
    setLoading(true);
    try {
      const [projects, skills, experience, freelance] = await Promise.all([
        api.getAllProjects(),
        api.getAllSkills(),
        api.getAllExperience(),
        api.getAllFreelance(),
      ]);
      setData({ projects, skills, experience, freelance });
    } catch (err) {
      if (err.message.includes("Invalid") || err.message.includes("token")) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("portfolio_admin_token");
    if (!token) { navigate("/admin"); return; }
    loadAll();
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)" }}>

      {/* HEADER */}
      <div
        className="sticky top-0 z-50 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3"
        style={{ background: "var(--card)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}
      >
        <h1 className="mono font-medium text-sm sm:text-base">
          <span style={{ color: "var(--accent)" }}>{"<"}</span>
          admin
          <span style={{ color: "var(--accent2)" }}>.panel</span>
          <span style={{ color: "var(--accent)" }}>{"/>"}</span>
        </h1>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="/"
            className="mono text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition"
            style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
          >
            ← <span className="hidden sm:inline">View </span>Site
          </a>
          <button
            onClick={logout}
            className="mono text-xs px-2.5 sm:px-3 py-1.5 rounded-lg transition"
            style={{ color: "var(--accent2)", border: "1px solid var(--border)" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* TABS — horizontally scrollable on mobile */}
      <div className="px-4 sm:px-6 pt-5 sm:pt-6 overflow-x-auto">
        <div className="flex gap-2 min-w-max">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className="mono text-xs px-3 sm:px-4 py-2 rounded-lg capitalize transition whitespace-nowrap"
              style={{
                background: tab === t ? "var(--accent)" : "var(--card)",
                color: tab === t ? "#fff" : "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              {t}
              {data[t] && (
                <span className="ml-2 opacity-60">({data[t].length})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-4 sm:px-6 py-5 sm:py-6 max-w-5xl">
        {loading ? (
          <HeartbeatLoader size={0.7} />
        ) : (
          <AdminSection section={tab} items={data[tab] || []} onRefresh={loadAll} />
        )}
      </div>
    </div>
  );
}