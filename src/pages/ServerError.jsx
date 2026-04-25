import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const terminal = [
  { text: "$ ping api.aakash.dev", color: "var(--muted)" },
  { text: "Request timeout for icmp_seq 0", color: "#f87171" },
  { text: "Request timeout for icmp_seq 1", color: "#f87171" },
  { text: "$ # server is not responding", color: "var(--muted)" },
  { text: "$ # try again in a few minutes", color: "var(--accent)" },
];

export default function ServerError() {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    terminal.forEach((line, i) => {
      setTimeout(() => setLines((prev) => [...prev, line]), i * 400);
    });
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20"
      style={{ background: "var(--bg)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-7 sm:mb-8 w-full"
      >
        <p className="section-label mb-4">// server error</p>
        <h1
          className="font-bold leading-none tracking-tight"
          style={{
            fontSize: "clamp(5rem, 22vw, 12rem)",
            color: "var(--accent)",
            opacity: 0.15,
          }}
        >
          503
        </h1>
        <div
          className="font-bold -mt-6 sm:-mt-8 relative z-10"
          style={{
            fontSize: "clamp(1.25rem, 5vw, 2.25rem)",
            color: "var(--text)",
          }}
        >
          Server Unreachable
        </div>
        <p
          className="mt-3 sm:mt-4 text-sm mono"
          style={{ color: "var(--muted)" }}
        >
          The backend is currently down or taking too long to respond.
        </p>
      </motion.div>

      {/* TERMINAL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="glass rounded-xl overflow-hidden w-full max-w-sm sm:max-w-md mb-8 sm:mb-10"
      >
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "var(--surface)",
          }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          <span className="mono text-xs ml-2" style={{ color: "var(--muted)" }}>
            terminal
          </span>
        </div>
        <div className="px-4 sm:px-5 py-4 space-y-2 min-h-[120px] sm:min-h-[140px]">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="mono text-xs sm:text-sm leading-relaxed"
              style={{ color: line.color }}
            >
              {line.text}
            </motion.p>
          ))}
          {lines.length < terminal.length && (
            <span
              className="mono text-xs animate-pulse"
              style={{ color: "var(--accent)" }}
            >
              |
            </span>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs sm:max-w-none sm:w-auto"
      >
        <button
          onClick={() => window.location.reload()}
          className="group relative flex items-center justify-center gap-2 px-6 py-3 overflow-hidden border-2 rounded-full text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
          style={{
            borderColor: "var(--accent)",
            color: "var(--accent)",
            background: "transparent",
          }}
        >
          ↻ Retry
        </button>
        <Link
          to="/"
          className="mono text-sm px-6 py-3 rounded-full glass transition text-center w-full sm:w-auto"
          style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
        >
          ← Go Home
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mono text-xs mt-10 sm:mt-12"
        style={{ color: "var(--muted)" }}
      >
        aakash.dev / 503
      </motion.p>
    </div>
  );
}