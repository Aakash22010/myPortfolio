import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

function FeaturedCard({ project }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-xl p-8 md:p-10 relative overflow-hidden group"
      style={{ border: "1px solid var(--border-hard)" }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "var(--glow)", transform: "translate(30%, -30%)" }}
      />
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative">
        <div className="flex-1">
          <span className="mono text-xs px-2 py-0.5 rounded mb-3 inline-block" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
            Featured Project
          </span>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)", maxWidth: "520px" }}>{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="mono text-xs px-2.5 py-1 rounded" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="flex md:flex-col gap-3 flex-shrink-0">
          {project.github !== "#" && (
            <a href={project.github} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-md text-sm glass mono"
              style={{ color: "var(--text)", border: "1px solid var(--border)" }}>
              GitHub →
            </a>
          )}
          {project.live !== "#" && (
            <a href={project.live} target="_blank" rel="noopener noreferrer"
              className="px-5 py-2 rounded-md text-sm font-medium"
              style={{ background: "var(--accent)", color: "#fff" }}>
              Live Demo →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-xl p-6 flex flex-col justify-between group relative overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }}
      />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>{String(index).padStart(2, "0")}</span>
          <div className="flex gap-3">
            {project.github !== "#" && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>gh ↗</a>
            )}
            {project.live !== "#" && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>live ↗</a>
            )}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{project.description}</p>
      </div>
      <div className="relative flex flex-wrap gap-1.5 mt-5">
        {project.tech.map((t) => (
          <span key={t} className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>{t}</span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getProjects()
      .then(setProjects)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-12">
          <p className="section-label mb-2">// things I've built</p>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <HeartbeatLoader />
        ) : (
          <>
            <div className="mb-8 space-y-6">
              {featured.map(p => <FeaturedCard key={p.id} project={p} />)}
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {rest.map((p, i) => <ProjectCard key={p.id} project={p} index={i + 2} />)}
            </div>
          </>
        )}
      </motion.div>
    </section>
  );
}