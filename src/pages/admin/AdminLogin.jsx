import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await api.login(username, password);
      localStorage.setItem("portfolio_admin_token", token);
      navigate("/admin/dash");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    // 16px prevents iOS zoom on focus
    fontSize: "16px",
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "var(--bg)" }}
    >
      <div
        className="glass rounded-2xl p-6 sm:p-8 w-full max-w-sm"
        style={{ border: "1px solid var(--border-hard)" }}
      >
        <div className="text-center mb-7 sm:mb-8">
          <p className="mono text-xs mb-2" style={{ color: "var(--muted)" }}>// restricted access</p>
          <h1 className="text-xl sm:text-2xl font-bold">
            <span style={{ color: "var(--accent)" }}>{"<"}</span>
            admin
            <span style={{ color: "var(--accent2)" }}>.panel</span>
            <span style={{ color: "var(--accent)" }}>{"/>"}</span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mono text-xs block mb-1.5" style={{ color: "var(--muted)" }}>
              username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg mono outline-none transition"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              autoComplete="username"
            />
          </div>

          <div>
            <label className="mono text-xs block mb-1.5" style={{ color: "var(--muted)" }}>
              password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg mono outline-none transition"
              style={inputStyle}
              onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              autoComplete="current-password"
            />
          </div>

          {error && (
            <p className="mono text-xs text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg text-sm font-medium mono transition"
            style={{
              background: loading ? "var(--muted)" : "var(--accent)",
              color: "#fff",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Authenticating..." : "Login →"}
          </button>
        </form>

        <p className="mono text-xs text-center mt-6" style={{ color: "var(--muted)" }}>
          <a href="/" style={{ color: "var(--accent)" }}>← Back to portfolio</a>
        </p>
      </div>
    </div>
  );
}