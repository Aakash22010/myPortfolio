import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const skills = [
  "React",
  "Vite",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "MongoDB",
  "JWT",
  "Git & GitHub",
];

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
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-6">
          Skills
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <motion.div
              key={skill}
              variants={fadeUp}
              className="p-4 text-center rounded border border-[var(--border)] bg-[var(--card)]"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
