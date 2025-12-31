import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const projects = [
  {
    title: "Skill Sanchaar",
    desc: "Full-stack educational platform with authentication, payments, and admin workflows.",
    tech: "React, Node.js, MongoDB, JWT",
    github: "#",
    live: "#",
  },
  {
    title: "Paradise Hotel",
    desc: "Hotel booking website with JWT authentication and modern responsive UI.",
    tech: "React, Node.js, MongoDB, JWT",
    github: "https://github.com/Aakash22010/Paradise_hotel",
    live: "https://paradise-hotel-peach.vercel.app/",
  },
  {
    title: "InternArea",
    desc: "Internshala-inspired platform for browsing internships with clean UI and routing.",
    tech: "React, Tailwind CSS",
    github: "https://github.com/Aakash22010/internarea.git",
    live: "https://internarea29320.netlify.app/",
  },
  {
    title: "Weather Forecast App",
    desc: "Real-time weather forecasting web app using external APIs with responsive UI.",
    tech: "JavaScript, Weather API, HTML, CSS",
    github: "#",
    live: "https://aakash1402--1ca1713626cd11f09439569c3dd06744.web.val.run",
  },
  {
    title: "Vyper – Modern Snake Game",
    desc: "Modern snake game with smooth controls, game logic, and responsive design.",
    tech: "JavaScript, HTML, CSS",
    github: "#",
    live: "http://vyper.surge.sh/",
  },
  {
    title: "Interactive Web Tool",
    desc: "Lightweight interactive web app showcasing frontend logic and UI behavior.",
    tech: "HTML, CSS, JavaScript",
    github: "#",
    live: "https://aakash1402-clearolivekoi.web.val.run/",
  },
  {
    title: "WorkflowAI",
    desc: "AI-driven workflow automation system (group project).",
    tech: "AI + Web Technologies",
    github: "#",
    live: "#",
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
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold mb-10"
        >
          Projects
        </motion.h2>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.map((p) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              className="p-6 rounded border border-[var(--border)] bg-[var(--card)] flex flex-col justify-between"
            >
              {/* PROJECT INFO */}
              <div>
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <p className="opacity-80 mt-2 text-sm">{p.desc}</p>
                <p className="text-xs opacity-60 mt-2">{p.tech}</p>
              </div>

              {/* LINKS */}
              <div className="mt-5 flex gap-4 text-sm">
                {p.github !== "#" && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    GitHub →
                  </a>
                )}

                {p.live !== "#" && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    Live Demo →
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
