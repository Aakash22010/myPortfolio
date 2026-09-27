import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

const typeBadge = {
  "full-time": { label: "Full-time",  color: "bg-green-500/20 text-green-400" },
  internship: { label: "Internship", color: "bg-blue-500/20 text-blue-400" },
  leadership: { label: "Leadership", color: "bg-purple-500/20 text-purple-400" },
};

function TypeBadge({ type }) {
  if (!type || !typeBadge[type]) return null;
  return (
    <span className={`mono text-xs px-2 py-0.5 rounded ${typeBadge[type].color}`}>
      {typeBadge[type].label}
    </span>
  );
}

function Points({ points, size = "text-sm" }) {
  return (
    <ul className="space-y-2.5">
      {(points || []).map((point, i) => (
        <li key={i} className={`flex items-start gap-2 ${size}`} style={{ color: "var(--muted)" }}>
          <span className="mono shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>›</span>
          {point}
        </li>
      ))}
    </ul>
  );
}

// ── Showcase card (current role) ──────────────────────────────────────────────
function ShowcaseCard({ exp }) {
  return (
    <motion.div variants={fadeUp}>
      <div className="glass rounded-xl p-6 sm:p-8 relative overflow-hidden"
        style={{ border: "1px solid var(--border-hard)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)" }}>
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none"
          style={{ background: "var(--glow)", transform: "translate(30%, -30%)" }} />

        <div className="relative">
          <span className="mono text-xs px-2 py-0.5 rounded mb-4 inline-block"
            style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
            Current Role
          </span>

          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h3 className="text-xl sm:text-2xl font-bold">{exp.role}</h3>
            <TypeBadge type={exp.type} />
          </div>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-6">
            <span className="mono text-sm" style={{ color: "var(--accent)" }}>{exp.company}</span>
            <span className="mono text-xs" style={{ color: "var(--muted)" }}>{exp.duration}</span>
          </div>

          <Points points={exp.points} />
        </div>
      </div>
    </motion.div>
  );
}

// ── Regular experience card ───────────────────────────────────────────────────
function ExperienceCard({ exp, index }) {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-xl flex flex-col group relative overflow-hidden"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }} />

      <div className="relative p-5 sm:p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>
            {String(index).padStart(2, "0")}
          </span>
          <TypeBadge type={exp.type} />
        </div>

        <h3 className="text-base sm:text-lg font-semibold mb-1 group-hover:text-[var(--accent)] transition-colors">
          {exp.role}
        </h3>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-4">
          <span className="mono text-sm" style={{ color: "var(--accent)" }}>{exp.company}</span>
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>{exp.duration}</span>
        </div>

        <Points points={exp.points} />
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);

  useEffect(() => {
    api.getExperience()
      .then(setExperiences)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const isCurrent = (e) => /present/i.test(e.duration);
  const current = experiences.filter(isCurrent);
  const past    = experiences.filter((e) => !isCurrent(e));

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-10 sm:mb-16">
          <p className="section-label mb-2">// where I've worked</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <HeartbeatLoader />
        ) : error ? (
          <p className="mono text-sm text-center py-12" style={{ color: "var(--muted)" }}>
            Failed to load experience. Please try again later.
          </p>
        ) : (
          <>
            {current.length > 0 && (
              <div className="space-y-6 mb-12 sm:mb-16">
                {current.map((e) => <ShowcaseCard key={e.id} exp={e} />)}
              </div>
            )}

            {past.length > 0 && (
              <>
                <motion.p variants={fadeUp} className="mono text-xs mb-6" style={{ color: "var(--muted)" }}>
                  // previously
                </motion.p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
                  {past.map((e, i) => <ExperienceCard key={e.id} exp={e} index={i + 1} />)}
                </div>
              </>
            )}
          </>
        )}
      </motion.div>
    </section>
  );
}
