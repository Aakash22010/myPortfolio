import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import Loader from "./HeartbeatLoader";

const typeBadge = {
  internship: { label: "Internship", color: "bg-blue-500/20 text-blue-400" },
  leadership: { label: "Leadership", color: "bg-purple-500/20 text-purple-400" },
};

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getExperience()
      .then(setExperiences)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="experience" className="py-24 px-6">
      <motion.div className="max-w-5xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-12">
          <p className="section-label mb-2">// where I've worked</p>
          <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <HeartbeatLoader />
        ) : (
          <div className="relative">
            <div
              className="absolute left-0 top-0 bottom-0 w-px hidden md:block"
              style={{ background: "linear-gradient(to bottom, transparent, var(--border-hard), transparent)" }}
            />
            <div className="space-y-6 md:pl-10">
              {experiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="glass rounded-xl p-6 relative group"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="absolute -left-[2.85rem] top-7 w-3 h-3 rounded-full hidden md:block"
                    style={{ background: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-base font-semibold">{exp.role}</h3>
                        {exp.type && typeBadge[exp.type] && (
                          <span className={`mono text-xs px-2 py-0.5 rounded ${typeBadge[exp.type].color}`}>
                            {typeBadge[exp.type].label}
                          </span>
                        )}
                      </div>
                      <p className="mono text-sm" style={{ color: "var(--accent)" }}>{exp.company}</p>
                    </div>
                    <span className="mono text-xs shrink-0" style={{ color: "var(--muted)" }}>{exp.duration}</span>
                  </div>
                  <ul className="space-y-1.5">
                    {(exp.points || []).map((point, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "var(--muted)" }}>
                        <span className="mono shrink-0 mt-0.5" style={{ color: "var(--accent)" }}>›</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </section>
  );
}