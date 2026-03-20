import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

const LevelBadge = ({ level }) => {
  const styles = {
    Beginner:     "bg-yellow-500/20 text-yellow-400",
    Intermediate: "bg-blue-500/20 text-blue-400",
    Advanced:     "bg-green-500/20 text-green-400",
  };
  return (
    <span className={`mono text-xs px-2 py-0.5 rounded shrink-0 ${styles[level]}`}>
      {level}
    </span>
  );
};

function SkillGroup({ title, skills }) {
  if (!skills.length) return null;
  return (
    <>
      <motion.h3 variants={fadeUp} className="text-lg font-semibold mb-5 mono" style={{ color: "var(--muted)" }}>
        {title}
      </motion.h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12 auto-rows-fr">
        {skills.map((skill) => (
          <motion.div
            key={skill.id}
            variants={fadeUp}
            className="glass rounded-xl p-5 flex flex-col group relative overflow-hidden"
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
              style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }}
            />
            <div className="relative flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold text-sm">{skill.name}</h4>
              <LevelBadge level={skill.level} />
            </div>
            <p className="relative text-xs leading-relaxed" style={{ color: "var(--muted)" }}>
              {skill.details}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function Skills() {
  const [allSkills, setAllSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSkills()
      .then(setAllSkills)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const frontend = allSkills.filter(s => s.category === "frontend");
  const backend  = allSkills.filter(s => s.category === "backend");
  const tools    = allSkills.filter(s => s.category === "tools");

  return (
    <section id="skills" className="py-24 px-6">
      <motion.div className="max-w-5xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-12">
          <p className="section-label mb-2">// what I know</p>
          <h2 className="text-3xl md:text-4xl font-bold">Skills</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {loading ? (
          <div className="mono text-sm" style={{ color: "var(--muted)" }}>Loading skills...</div>
        ) : (
          <>
            <SkillGroup title="// frontend"         skills={frontend} />
            <SkillGroup title="// backend"          skills={backend} />
            <SkillGroup title="// tools & workflow" skills={tools} />
          </>
        )}
      </motion.div>
    </section>
  );
}