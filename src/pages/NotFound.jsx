import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function GlitchText({ text }) {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <style>{`
        .glitch-wrap { position: relative; display: inline-block; }
        .glitch-wrap::before, .glitch-wrap::after {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          opacity: 0;
        }
        .glitch-wrap.active::before {
          opacity: 0.8;
          color: var(--accent);
          clip-path: polygon(0 20%, 100% 20%, 100% 40%, 0 40%);
          transform: translate(-3px, 2px);
        }
        .glitch-wrap.active::after {
          opacity: 0.8;
          color: var(--accent2);
          clip-path: polygon(0 60%, 100% 60%, 100% 80%, 0 80%);
          transform: translate(3px, -2px);
        }
      `}</style>
      <span className={`glitch-wrap${glitch ? " active" : ""}`} data-text={text}>
        {text}
      </span>
    </>
  );
}

const terminal = [
  { text: "$ cd /page-you-wanted",                color: "var(--muted)" },
  { text: "bash: cd: No such file or directory",  color: "#f87171" },
  { text: "$ ls ../",                             color: "var(--muted)" },
  { text: "home  about  skills  projects  contact", color: "var(--accent)" },
  { text: "$ # looks like you're lost",           color: "var(--muted)" },
];

export default function NotFound() {
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
      {/* 404 */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-7 sm:mb-8 w-full"
      >
        <p className="section-label mb-4">// error</p>
        <h1
          className="font-bold leading-none tracking-tight"
          style={{ fontSize: "clamp(5rem, 22vw, 12rem)", color: "var(--accent)", opacity: 0.15 }}
        >
          404
        </h1>
        <div
          className="font-bold -mt-6 sm:-mt-8 relative z-10"
          style={{ fontSize: "clamp(1.25rem, 5vw, 2.25rem)", color: "var(--text)" }}
        >
          <GlitchText text="Page not found" />
        </div>
        <p className="mt-3 sm:mt-4 text-sm mono" style={{ color: "var(--muted)" }}>
          The page you're looking for doesn't exist or was moved.
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
          style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
        >
          <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
          <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
          <span className="mono text-xs ml-2" style={{ color: "var(--muted)" }}>terminal</span>
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
            <span className="mono text-xs animate-pulse" style={{ color: "var(--accent)" }}>|</span>
          )}
        </div>
      </motion.div>

      {/* ACTIONS */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex flex-col sm:flex-row gap-3 items-center w-full max-w-xs sm:max-w-none sm:w-auto"
      >
        <Link
          to="/"
          className="group relative flex items-center justify-center gap-2 px-6 py-3 overflow-hidden border-2 rounded-full text-sm font-semibold transition-all duration-300 w-full sm:w-auto"
          style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }}
        >
          <span
            className="absolute w-full transition-all duration-700 group-hover:w-full -left-full group-hover:left-0 rounded-full -z-10 aspect-square group-hover:scale-150 group-hover:duration-700"
            style={{ background: "var(--accent)" }}
          />
          <span className="relative z-10 group-hover:text-white transition-colors duration-300">
            ← Go Home
          </span>
        </Link>

        <Link
          to="/#projects"
          className="mono text-sm px-6 py-3 rounded-full glass transition text-center w-full sm:w-auto"
          style={{ color: "var(--muted)", border: "1px solid var(--border)" }}
          onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hard)")}
          onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
        >
          View Projects
        </Link>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="mono text-xs mt-10 sm:mt-12"
        style={{ color: "var(--muted)" }}
      >
        aakash.dev / 404
      </motion.p>
    </div>
  );
}