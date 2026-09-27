import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

// "Skurra – Managed Software Service" → ["Skurra", "Managed Software Service"]
function splitTitle(title) {
  const [name, ...rest] = title.split(/\s+[–—-]\s+/);
  return [name, rest.join(" – ")];
}

// ── Browser window wrapper ────────────────────────────────────────────────────
function BrowserWindow({ src, alt, onError }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="rounded-xl overflow-hidden mb-6"
      style={{ border: "1px solid var(--border-hard)" }}>
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <div className="flex-1 mx-3 min-w-0">
          <div className="mono text-xs px-3 py-0.5 rounded text-center truncate"
            style={{ background: "var(--bg)", color: "var(--muted)", border: "1px solid var(--border)" }}>
            {alt}
          </div>
        </div>
      </div>
      {/* Screenshot */}
      <div className="relative" style={{ aspectRatio: "16/9" }}>
        {!loaded && (
          <div className="absolute inset-0 animate-pulse"
            style={{ background: "linear-gradient(90deg, var(--surface) 25%, var(--glow) 50%, var(--surface) 75%)" }} />
        )}
        <img
          src={src} alt={alt}
          onLoad={() => setLoaded(true)} onError={onError}
          className="w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          loading="lazy" decoding="async"
        />
      </div>
    </div>
  );
}

// ── Tab panel ─────────────────────────────────────────────────────────────────
function ProjectPanel({ project }) {
  const [imgError, setImgError] = useState(false);
  const [name, subtitle] = splitTitle(project.title);
  const hasImage = !!project.image_url && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2 }}
    >
      {hasImage && (
        <BrowserWindow src={project.image_url} alt={project.title} onError={() => setImgError(true)} />
      )}

      <div className="flex flex-wrap items-center gap-2 mb-1">
        <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
        {project.featured && (
          <span className="mono text-xs px-2 py-0.5 rounded"
            style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
            Featured
          </span>
        )}
      </div>
      {subtitle && (
        <p className="mono text-sm mb-5" style={{ color: "var(--accent)" }}>{subtitle}</p>
      )}

      <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t, i) => (
          <motion.span
            key={t}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04, duration: 0.2 }}
            className="mono text-xs px-2.5 py-1 rounded"
            style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            {t}
          </motion.span>
        ))}
      </div>

      {(project.github !== "#" || project.live !== "#") && (
        <div className="flex gap-3 flex-wrap">
          {project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-md text-sm glass mono"
              style={{ color: "var(--text)", border: "1px solid var(--border)" }}>
              GitHub →
            </a>
          )}
          {project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="px-4 py-2 rounded-md text-sm font-medium"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Live Demo →
            </a>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);
  const [active,   setActive]   = useState(0);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const project = projects[active];

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <p className="section-label mb-2">// things I've built</p>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <HeartbeatLoader />
        ) : error ? (
          <p className="mono text-sm text-center py-12" style={{ color: "var(--muted)" }}>
            Failed to load projects. Please try again later.
          </p>
        ) : (
          <motion.div
            variants={fadeUp}
            className="glass rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-hard)" }}
          >
            <div className="flex flex-col md:flex-row">

              {/* Tab list — 2-col grid on phones so every project is visible, column on desktop */}
              <div
                role="tablist"
                aria-label="Projects"
                className="grid grid-cols-2 md:flex md:flex-col shrink-0"
              >
                {projects.map((p, i) => (
                  <button
                    key={p.id}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className="relative text-left px-4 sm:px-5 py-3.5 md:py-4 mono text-sm transition-colors duration-200 md:w-52 min-w-0"
                    style={{
                      color: active === i ? "var(--accent)" : "var(--muted)",
                      background: active === i ? "var(--glow)" : "transparent",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {active === i && (
                      <motion.div
                        layoutId="project-tab-bar"
                        className="absolute left-0 top-0 bottom-0 w-0.5"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                    <span className="block truncate">{splitTitle(p.title)[0]}</span>
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div role="tabpanel" className="flex-1 min-w-0 p-5 sm:p-8">
                <AnimatePresence mode="wait">
                  {project && <ProjectPanel key={project.id} project={project} />}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
