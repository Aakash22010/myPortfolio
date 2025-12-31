import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const projects = [
  {
    title: "Skill Sanchaar",
    desc: "Full-stack educational platform with authentication and admin workflows.",
    tech: "React, Node, MongoDB",
    link: "#",
  },
  {
    title: "Paradise Hotel",
    desc: "Hotel booking website with JWT authentication.",
    tech: "React, Node, MongoDB",
    link: "https://github.com/Aakash22010/Paradise_hotel",
  },
  {
    title: "WorkflowAI",
    desc: "AI-driven workflow automation (group project).",
    tech: "AI + Web",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-6 max-w-6xl mx-auto">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 variants={fadeUp} className="text-3xl font-bold mb-10">
          Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="p-6 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <h3 className="text-xl font-semibold">{p.title}</h3>
              <p className="opacity-80 mt-2">{p.desc}</p>
              <p className="text-sm opacity-60 mt-2">{p.tech}</p>

              <a href={p.link} className="inline-block mt-4 underline">
                View Project →
              </a>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
