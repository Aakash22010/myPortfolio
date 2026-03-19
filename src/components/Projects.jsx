import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const projects = [
  { title: "Skill Sanchaar", desc: "Full-stack educational platform with authentication, payments, and admin workflows. Built end-to-end with role-based access control.", tech: ["React", "Node.js", "MongoDB", "JWT"], github: "#", live: "#", featured: true },
  { title: "Paradise Hotel", desc: "Hotel booking website with JWT authentication and modern responsive UI.", tech: ["React", "Node.js", "MongoDB", "JWT"], github: "https://github.com/Aakash22010/Paradise_hotel", live: "https://paradise-hotel-peach.vercel.app/" },
  { title: "InternArea", desc: "Internshala-inspired platform for browsing internships with clean UI and routing.", tech: ["React", "Tailwind CSS"], github: "https://github.com/Aakash22010/internarea.git", live: "https://internarea29320.netlify.app/" },
  { title: "Weather Forecast App", desc: "Real-time weather forecasting web app using external APIs with responsive UI.", tech: ["JavaScript", "Weather API", "HTML", "CSS"], github: "#", live: "https://aakash1402--1ca1713626cd11f09439569c3dd06744.web.val.run" },
  { title: "Vyper – Snake Game", desc: "Modern snake game with smooth controls, game logic, and responsive design.", tech: ["JavaScript", "Canvas API", "CSS"], github: "#", live: "http://vyper.surge.sh/" },
  { title: "WorkflowAI", desc: "AI-driven workflow automation system built as a group project.", tech: ["React", "Node.js", "OpenAI API"], github: "#", live: "#" },
];

function FeaturedCard({ project }) {
  return (
    <motion.div variants={fadeUp} className="glass rounded-xl p-8 md:p-10 relative overflow-hidden group"
      style={{ border: "1px solid var(--border-hard)" }} whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "var(--glow)", transform: "translate(30%, -30%)" }} />
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 relative">
        <div className="flex-1">
          <span className="mono text-xs px-2 py-0.5 rounded mb-3 inline-block" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>Featured Project</span>
          <h3 className="text-2xl md:text-3xl font-bold mb-3">{project.title}</h3>
          <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--muted)", maxWidth: "520px" }}>{project.desc}</p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="mono text-xs px-2.5 py-1 rounded" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>{t}</span>
            ))}
          </div>
        </div>
        <div className="flex md:flex-col gap-3 flex-shrink-0">
          {project.github !== "#" && <a href={project.github} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md text-sm glass mono" style={{ color: "var(--text)", border: "1px solid var(--border)" }}>GitHub →</a>}
          {project.live !== "#" && <a href={project.live} target="_blank" rel="noopener noreferrer" className="px-5 py-2 rounded-md text-sm font-medium" style={{ background: "var(--accent)", color: "#fff" }}>Live Demo →</a>}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  return (
    <motion.div variants={fadeUp} className="glass rounded-xl p-6 flex flex-col justify-between group relative overflow-hidden"
      whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }} />
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span className="mono text-xs" style={{ color: "var(--muted)" }}>{String(index).padStart(2, "0")}</span>
          <div className="flex gap-3">
            {project.github !== "#" && <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>gh ↗</a>}
            {project.live !== "#" && <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-xs mono" style={{ color: "var(--muted)" }}>live ↗</a>}
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2 group-hover:text-[var(--accent)] transition-colors">{project.title}</h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{project.desc}</p>
      </div>
      <div className="relative flex flex-wrap gap-1.5 mt-5">
        {project.tech.map((t) => <span key={t} className="mono text-xs px-2 py-0.5 rounded" style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>{t}</span>)}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-12">
          <p className="section-label mb-2">// things I've built</p>
          <h2 className="text-3xl md:text-4xl font-bold">Projects</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>
        <div className="mb-8 space-y-6">{featured.map((p) => <FeaturedCard key={p.title} project={p} />)}</div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">{rest.map((p, i) => <ProjectCard key={p.title} project={p} index={i + 2} />)}</div>
      </motion.div>
    </section>
  );
}