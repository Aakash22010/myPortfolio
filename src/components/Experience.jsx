import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

const typeBadge = {
  "full-time": { label: "Full-time",  color: "bg-green-500/20 text-green-400" },
  internship: { label: "Internship", color: "bg-blue-500/20 text-blue-400" },
  leadership: { label: "Leadership", color: "bg-purple-500/20 text-purple-400" },
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(false);
  const [active, setActive]           = useState(0);

  useEffect(() => {
    api.getExperience()
      .then(setExperiences)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const exp = experiences[active];

  return (
    <section id="experience" className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
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
          <motion.div
            variants={fadeUp}
            className="glass rounded-2xl overflow-hidden"
            style={{ border: "1px solid var(--border-hard)" }}
          >
            <div className="flex flex-col md:flex-row">

              {/* Tab list */}
              <div
                role="tablist"
                aria-label="Experience"
                className="flex md:flex-col overflow-x-auto md:overflow-visible shrink-0 scrollbar-hide"
              >
                {experiences.map((e, i) => (
                  <button
                    key={e.id}
                    role="tab"
                    aria-selected={active === i}
                    onClick={() => setActive(i)}
                    className="relative text-left px-5 py-4 mono text-sm transition-colors duration-200 shrink-0 whitespace-nowrap md:whitespace-normal md:w-48"
                    style={{
                      color: active === i ? "var(--accent)" : "var(--muted)",
                      background: active === i ? "var(--glow)" : "transparent",
                      borderRight: "1px solid var(--border)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {active === i && (
                      <motion.div
                        layoutId="tab-bar-desktop"
                        className="absolute hidden md:block left-0 top-0 bottom-0 w-0.5"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                    {active === i && (
                      <motion.div
                        layoutId="tab-bar-mobile"
                        className="absolute md:hidden bottom-0 left-0 right-0 h-0.5"
                        style={{ background: "var(--accent)" }}
                      />
                    )}
                    {e.company}
                  </button>
                ))}
              </div>

              {/* Content area */}
              <div role="tabpanel" className="flex-1 p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  {exp && (
                    <motion.div
                      key={exp.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{exp.role}</h3>
                        {exp.type && typeBadge[exp.type] && (
                          <span className={`mono text-xs px-2 py-0.5 rounded ${typeBadge[exp.type].color}`}>
                            {typeBadge[exp.type].label}
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="mono text-sm" style={{ color: "var(--accent)" }}>
                          {exp.company}
                        </span>
                        <span className="mono text-xs" style={{ color: "var(--muted)" }}>
                          {exp.duration}
                        </span>
                      </div>

                      <ul className="space-y-2.5">
                        {(exp.points || []).map((point, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -6 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.06, duration: 0.2 }}
                            className="flex items-start gap-2 text-sm"
                            style={{ color: "var(--muted)" }}
                          >
                            <span className="mono shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>›</span>
                            {point}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}