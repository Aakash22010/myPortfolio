import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const experiences = [
  {
    role: "Full-Stack Web Developer Intern",
    company: "NullClass",
    duration: "July 2024 – August 2024",
    points: [
      "Built InternArea, a full-stack Internshala-inspired platform from scratch",
      "Developed frontend using React, focusing on component structure and state management",
      "Implemented backend APIs using Node.js and Express",
      "Integrated MongoDB for data storage and user management",
      "Worked with authentication flows and real-world application structure",
    ],
  },
  {
    role: "Frontend Web Developer Intern",
    company: "Myitronline",
    duration: "July 2025 – August 2025",
    points: [
      "Developed responsive UI components using React and Tailwind CSS",
      "Integrated frontend components with backend APIs",
      "Improved website responsiveness and overall user experience",
    ],
  },
  {
    role: "President",
    company: "Codex – The Coding Club of GIET",
    duration: "2025 – Present",
    points: [
      "Leading technical initiatives and mentoring junior developers",
      "Organized coding events, workshops, and hackathons",
      "Coordinated with faculty and students to strengthen the coding community",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold mb-10"
        >
          Experience
        </motion.h2>

        <div className="space-y-8">
          {experiences.map((exp) => (
            <motion.div
              key={`${exp.company}-${exp.role}`}
              variants={fadeUp}
              className="p-6 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="opacity-80 text-sm">{exp.company}</p>
                </div>
                <span className="text-xs opacity-60 mt-2 sm:mt-0">
                  {exp.duration}
                </span>
              </div>

              <ul className="mt-4 space-y-2 text-sm opacity-80 list-disc list-inside">
                {exp.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
