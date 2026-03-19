import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const frontendSkills = [
  { name: "React", level: "Intermediate", details: "Hooks, Context API, component architecture, state flow, performance optimization" },
  { name: "Next.js", level: "Intermediate", details: "Pages router, SSR/SSG, API routes, dynamic routing, Vercel deployment" },
  { name: "TypeScript", level: "Intermediate", details: "Type safety, interfaces, generics, strict mode, used across full-stack projects" },
  { name: "Tailwind CSS", level: "Advanced", details: "Responsive layouts, dark/light mode, utility-first styling, v4 CSS variables" },
  { name: "Framer Motion", level: "Intermediate", details: "Page animations, scroll-triggered effects, stagger containers, spring physics" },
  { name: "HTML & CSS", level: "Advanced", details: "Semantic markup, flexbox, grid, responsive design, accessibility basics" },
];

const backendSkills = [
  { name: "Node.js & Express", level: "Intermediate", details: "Server-side logic, routing, middleware, MVC structure, REST API design" },
  { name: "MongoDB", level: "Intermediate", details: "Schema design, CRUD operations, data modeling, Mongoose ODM" },
  { name: "Authentication & Authorization", level: "Advanced", details: "JWT-based auth, Firebase Auth, OTP flows, protected routes, role-based access" },
  { name: "Firebase", level: "Intermediate", details: "Firebase Auth, Firestore, integration with custom Express backends" },
  { name: "REST APIs", level: "Advanced", details: "Designing RESTful endpoints, CRUD operations, request/response handling, error management" },
  { name: "Cloudinary", level: "Intermediate", details: "Media uploads, direct client-side upload with unsigned presets, URL management" },
];

const toolsSkills = [
  { name: "Git & GitHub", level: "Advanced", details: "Version control, branching, collaboration, pull requests, CI/CD via Vercel" },
  { name: "Vite", level: "Intermediate", details: "Fast dev server, optimized production builds, plugin ecosystem" },
  { name: "Vercel & Render", level: "Intermediate", details: "Frontend deployment on Vercel, backend hosting on Render free tier" },
];

const LevelBadge = ({ level }) => {
  const styles = {
    Beginner: "bg-yellow-500/20 text-yellow-400",
    Intermediate: "bg-blue-500/20 text-blue-400",
    Advanced: "bg-green-500/20 text-green-400",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded shrink-0 ${styles[level]}`}>
      {level}
    </span>
  );
};

function SkillGroup({ title, skills }) {
  return (
    <>
      <motion.h3 variants={fadeUp} className="text-xl font-semibold mb-5">{title}</motion.h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 auto-rows-fr">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            variants={fadeUp}
            className="p-5 rounded border border-[var(--border)] bg-[var(--card)] flex flex-col"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="font-semibold">{skill.name}</h4>
              <LevelBadge level={skill.level} />
            </div>
            <p className="text-sm opacity-80 leading-relaxed">{skill.details}</p>
          </motion.div>
        ))}
      </div>
    </>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-6">
      <motion.div className="max-w-5xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.h2 variants={fadeUp} className="text-2xl md:text-3xl font-bold mb-10">Skills</motion.h2>
        <SkillGroup title="Frontend Development" skills={frontendSkills} />
        <SkillGroup title="Backend Development" skills={backendSkills} />
        <SkillGroup title="Tools & Workflow" skills={toolsSkills} />
      </motion.div>
    </section>
  );
}