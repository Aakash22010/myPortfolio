import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

// ── Browser window wrapper ────────────────────────────────────────────────────
function BrowserWindow({ src, alt, loaded, onLoad, onError }) {
  return (
    <div className="rounded-xl overflow-hidden flex-shrink-0"
      style={{ border: "1px solid var(--border-hard)" }}>
      {/* Titlebar */}
      <div className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "var(--surface)", borderBottom: "1px solid var(--border)" }}>
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-400 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <div className="flex-1 mx-3">
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
          onLoad={onLoad} onError={onError}
          className="w-full h-full object-cover"
          style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
          loading="lazy" decoding="async"
        />
      </div>
    </div>
  );
}

// ── Showcase card (featured) ──────────────────────────────────────────────────
function ShowcaseCard({ project, index }) {
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const isEven = index % 2 === 0;
  const hasImage = !!project.image_url && !imgError;

  return (
    <motion.div variants={fadeUp}>
      <div className={`flex flex-col ${hasImage ? "md:flex-row" : ""} ${isEven ? "" : "md:flex-row-reverse"} items-center gap-0`}>

        {/* Browser window — 60% width */}
        {hasImage && (
          <div className="w-full md:w-[60%] shrink-0 relative z-0">
            <BrowserWindow
              src={project.image_url} alt={project.title}
              loaded={loaded}
              onLoad={() => setLoaded(true)}
              onError={() => setImgError(true)}
            />
          </div>
        )}

        {/* Text card — overlaps browser window */}
        <div
          className={`w-full ${hasImage ? "md:w-[48%]" : ""} relative z-10
            ${hasImage ? (isEven ? "md:-translate-x-10" : "md:translate-x-10") : ""}
          `}
        >
          <div className="glass rounded-xl p-6 sm:p-8 h-full"
            style={{ border: "1px solid var(--border-hard)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>

            <span className="mono text-xs px-2 py-0.5 rounded mb-4 inline-block"
              style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
              Featured Project
            </span>

            <h3 className="text-xl sm:text-2xl font-bold mb-3">{project.title}</h3>

            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((t) => (
                <span key={t} className="mono text-xs px-2.5 py-1 rounded"
                  style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
                  {t}
                </span>
              ))}
            </div>

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
          </div>
        </div>

      </div>
    </motion.div>
  );
}

// ── Regular project card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const hasImage = !!project.image_url && !imgError;

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="glass rounded-xl flex flex-col justify-between group relative overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }} />

        {hasImage && (
          <button onClick={() => setPreviewOpen(true)}
            className="relative w-full overflow-hidden rounded-t-xl focus:outline-none"
            style={{ aspectRatio: "16/9" }} aria-label={`Preview ${project.title}`}>
            {!loaded && (
              <div className="absolute inset-0 animate-pulse"
                style={{ background: "linear-gradient(90deg, var(--surface) 25%, var(--glow) 50%, var(--surface) 75%)" }} />
            )}
            <img src={project.image_url} alt={project.title}
              onLoad={() => setLoaded(true)} onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
              loading="lazy" decoding="async" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,0,0,0.35)" }}>
              <span className="mono text-xs text-white px-3 py-1.5 rounded-full"
                style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}>
                ⤢ preview
              </span>
            </div>
          </button>
        )}

        <div className="relative p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <span className="mono text-xs" style={{ color: "var(--muted)" }}>
              {String(index).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              {project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer"
                  className="text-xs mono" style={{ color: "var(--muted)" }}>gh ↗</a>
              )}
              {project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noopener noreferrer"
                  className="text-xs mono" style={{ color: "var(--muted)" }}>live ↗</a>
              )}
            </div>
          </div>

          <h3 className="text-base sm:text-lg font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {project.tech.map((t) => (
              <span key={t} className="mono text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border-hard)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={project.image_url} alt={project.title}
                className="w-full object-cover" style={{ maxHeight: "80vh" }} />
              <div className="px-5 py-3 flex items-center justify-between"
                style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}>
                <div>
                  <p className="font-semibold text-sm">{project.title}</p>
                  <div className="flex gap-2 mt-1 flex-wrap">
                    {project.tech.slice(0, 4).map((t) => (
                      <span key={t} className="mono text-xs" style={{ color: "var(--accent)" }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-3 shrink-0">
                  {project.github !== "#" && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="mono text-xs px-3 py-1.5 rounded-lg glass"
                      style={{ color: "var(--text)", border: "1px solid var(--border)" }}>GitHub →</a>
                  )}
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="mono text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: "var(--accent)", color: "#fff" }}>Live →</a>
                  )}
                  <button onClick={() => setPreviewOpen(false)}
                    className="mono text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}>✕</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading,  setLoading]  = useState(true);
  const [error,    setError]    = useState(false);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-10 sm:mb-16">
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
          <>
            {/* Featured — showcase layout */}
            <div className="space-y-16 sm:space-y-24 mb-16 sm:mb-24">
              {featured.map((p, i) => (
                <ShowcaseCard key={p.id} project={p} index={i} />
              ))}
            </div>

            {/* Rest — grid */}
            {rest.length > 0 && (
              <>
                <motion.p variants={fadeUp} className="mono text-xs mb-6" style={{ color: "var(--muted)" }}>
                  // other projects
                </motion.p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {rest.map((p, i) => (
                    <ProjectCard key={p.id} project={p} index={i + 1} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}