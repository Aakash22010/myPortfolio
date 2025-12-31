import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

/* ---------- FRONTEND ---------- */
const frontendSkills = [
  {
    name: "React",
    level: "Intermediate",
    details:
      "Hooks, Context API, component architecture, state flow, performance optimization",
  },
  {
    name: "Tailwind CSS",
    level: "Advanced",
    details:
      "Responsive layouts, dark/light mode, utility-first styling",
  },
];

/* ---------- BACKEND ---------- */
const backendSkills = [
  {
    name: "REST APIs",
    level: "Advanced",
    details:
      "Designing RESTful endpoints, CRUD operations, request/response handling",
  },
  {
    name: "Authentication & Authorization",
    level: "Advanced",
    details:
      "JWT-based auth, protected routes, role-based access control",
  },
  {
    name: "Node.js & Express",
    level: "Intermediate",
    details:
      "Server-side logic, routing, middleware, MVC structure",
  },
  {
    name: "MongoDB",
    level: "Intermediate",
    details:
      "Schema design, CRUD operations, data modeling",
  },
];

/* ---------- TOOLS ---------- */
const toolsSkills = [
  {
    name: "Git & GitHub",
    level: "Advanced",
    details:
      "Version control, branching, collaboration, pull requests",
  },
];

/* ---------- LEVEL BADGE ---------- */
const LevelBadge = ({ level }) => {
  const styles = {
    Beginner: "bg-yellow-500/15 text-yellow-600",
    Intermediate: "bg-blue-500/15 text-blue-600",
    Advanced: "bg-green-500/15 text-green-600",
  };

  return (
    <span
      className={`text-xs px-2 py-0.5 rounded ${styles[level]}`}
    >
      {level}
    </span>
  );
};

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* SECTION TITLE */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold mb-10"
        >
          Skills
        </motion.h2>

        {/* FRONTEND */}
        <motion.h3
          variants={fadeUp}
          className="text-xl font-semibold mb-5"
        >
          Frontend Development
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {frontendSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="p-5 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{skill.name}</h4>
                <LevelBadge level={skill.level} />
              </div>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">
                {skill.details}
              </p>
            </motion.div>
          ))}
        </div>

        {/* BACKEND */}
        <motion.h3
          variants={fadeUp}
          className="text-xl font-semibold mb-5"
        >
          Backend Development
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {backendSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="p-5 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{skill.name}</h4>
                <LevelBadge level={skill.level} />
              </div>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">
                {skill.details}
              </p>
            </motion.div>
          ))}
        </div>

        {/* TOOLS */}
        <motion.h3
          variants={fadeUp}
          className="text-xl font-semibold mb-5"
        >
          Tools & Workflow
        </motion.h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsSkills.map((skill) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="p-5 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{skill.name}</h4>
                <LevelBadge level={skill.level} />
              </div>
              <p className="mt-2 text-sm opacity-80 leading-relaxed">
                {skill.details}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
