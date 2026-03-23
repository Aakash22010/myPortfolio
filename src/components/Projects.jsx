import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

// ── Thumbnail with shimmer placeholder ───────────────────────────────────────
function ProjectImage({ src, alt }) {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  if (!src || error) return null;

  return (
    <div className="relative w-full overflow-hidden rounded-t-xl" style={{ aspectRatio: "16/9" }}>
      {/* Shimmer shown until image loads */}
      {!loaded && (
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(90deg, var(--surface) 25%, var(--glow) 50%, var(--surface) 75%)", backgroundSize: "200% 100%" }}
        />
      )}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
        loading="lazy"
        decoding="async"
      />
      {/* Subtle gradient overlay at bottom so text reads cleanly */}
      {loaded && (
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to top, var(--card), transparent)" }}
        />
      )}
    </div>
  );
}

// ── Featured card ─────────────────────────────────────────────────────────────
function FeaturedCard({ project }) {
  const hasImage = !!project.image_url;

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-xl relative overflow-hidden group"
      style={{ border: "1px solid var(--border-hard)" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow blob on hover */}
      <div
        className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "var(--glow)", transform: "translate(30%, -30%)" }}
      />

      {/* Screenshot */}
      {hasImage && <ProjectImage src={project.image_url} alt={project.title} />}

      {/* Content */}
      <div className={`relative flex flex-col gap-5 sm:gap-6 p-6 sm:p-8 ${hasImage ? "pt-5" : "md:p-10"}`}>
        <div className="flex-1">
          <span
            className="mono text-xs px-2 py-0.5 rounded mb-3 inline-block"
            style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
          >
            Featured Project
          </span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)" }}>
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="mono text-xs px-2.5 py-1 rounded"
                style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-row gap-3 flex-wrap">
          {project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-md text-sm glass mono flex-1 sm:flex-none text-center"
              style={{ color: "var(--text)", border: "1px solid var(--border)" }}
            >
              GitHub →
            </a>
          )}
          {project.live !== "#" && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-md text-sm font-medium flex-1 sm:flex-none text-center"
              style={{ background: "var(--accent)", color: "#fff" }}
            >
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Regular project card ──────────────────────────────────────────────────────
function ProjectCard({ project, index }) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const hasImage = !!project.image_url;

  return (
    <>
      <motion.div
        variants={fadeUp}
        className="glass rounded-xl flex flex-col justify-between group relative overflow-hidden"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Glow on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
          style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }}
        />

        {/* Thumbnail — clicking opens lightbox */}
        {hasImage && (
          <button
            onClick={() => setPreviewOpen(true)}
            className="relative w-full overflow-hidden rounded-t-xl focus:outline-none"
            style={{ aspectRatio: "16/9" }}
            aria-label={`Preview ${project.title}`}
          >
            <ProjectImage src={project.image_url} alt={project.title} />
            {/* "click to expand" hint */}
            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: "rgba(0,0,0,0.35)" }}
            >
              <span className="mono text-xs text-white px-3 py-1.5 rounded-full" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)" }}>
                ⤢ preview
              </span>
            </div>
          </button>
        )}

        {/* Text content */}
        <div className="relative p-5 sm:p-6 flex flex-col flex-1">
          <div className="flex items-start justify-between mb-3">
            <span className="mono text-xs" style={{ color: "var(--muted)" }}>
              {String(index).padStart(2, "0")}
            </span>
            <div className="flex gap-3">
              {project.github !== "#" && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>
                  gh ↗
                </a>
              )}
              {project.live !== "#" && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>
                  live ↗
                </a>
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
              <span
                key={t}
                className="mono text-xs px-2 py-0.5 rounded"
                style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
              >
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setPreviewOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1,    opacity: 1 }}
              exit={{    scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border-hard)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full object-cover"
                style={{ maxHeight: "80vh" }}
              />
              {/* Caption bar */}
              <div
                className="px-5 py-3 flex items-center justify-between"
                style={{ background: "var(--card)", borderTop: "1px solid var(--border)" }}
              >
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
                      style={{ color: "var(--text)", border: "1px solid var(--border)" }}>
                      GitHub →
                    </a>
                  )}
                  {project.live !== "#" && (
                    <a href={project.live} target="_blank" rel="noopener noreferrer"
                      className="mono text-xs px-3 py-1.5 rounded-lg"
                      style={{ background: "var(--accent)", color: "#fff" }}>
                      Live →
                    </a>
                  )}
                  <button
                    onClick={() => setPreviewOpen(false)}
                    className="mono text-xs px-3 py-1.5 rounded-lg"
                    style={{ background: "var(--surface)", color: "var(--muted)", border: "1px solid var(--border)" }}
                  >
                    ✕
                  </button>
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

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <p className="section-label mb-2">// things I've built</p>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <HeartbeatLoader />
        ) : (
          <>
            <div className="mb-6 sm:mb-8 space-y-5 sm:space-y-6">
              {featured.map((p) => (
                <FeaturedCard key={p.id} project={p} />
              ))}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {rest.map((p, i) => (
                <ProjectCard key={p.id} project={p} index={i + 2} />
              ))}
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}