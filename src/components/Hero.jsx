import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";

const ROLES = [
  "Full-Stack Developer",
  "React Developer",
  "Node.js Developer",
  "Open to Opportunities",
];

function TypedText() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const current = ROLES[roleIndex];

    if (typing) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 1800);
        return () => clearTimeout(t);
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35);
        return () => clearTimeout(t);
      } else {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
  }, [displayed, typing, roleIndex]);

  return (
    <span className="text-[var(--accent)]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-12"
      >
        {/* LEFT — TEXT */}
        <div className="flex-1 text-center md:text-left">
          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base opacity-60 mb-2 tracking-widest uppercase"
          >
            Hey, I'm
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4"
          >
            Aakash Dahiya
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="text-lg sm:text-xl md:text-2xl font-medium h-8 mb-4"
          >
            <TypedText />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="opacity-70 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed mb-8"
          >
            CS student building real, production-ready web apps with React,
            Node.js, and MongoDB. Currently leading Codex — the coding club of GIET.
          </motion.p>

          {/* TECH STACK PILLS */}
          <motion.div
            variants={fadeUp}
            className="flex gap-3 flex-wrap justify-center md:justify-start mb-8"
          >
            {["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map((tech) => (
              <span
                key={tech}
                className="text-xs px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] opacity-80"
              >
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
          >
            
              <a href="#projects"
              className="px-6 py-3 rounded bg-[var(--accent)] text-white text-sm sm:text-base transition hover:opacity-90"
            >
              View Projects
            </a>
            
              <a
              href="/Aakash_Dahiya_Resume.pdf"
              download
              className="px-6 py-3 rounded border border-[var(--border)] text-sm sm:text-base transition hover:bg-[var(--card)]"
            >
              Download Resume
            </a>
          </motion.div>
        </div>

        {/* RIGHT — PHOTO */}
        <motion.div variants={fadeUp} className="flex-shrink-0">
          <div className="relative w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72">
            {/* GLOW */}
            <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 blur-2xl scale-110" />
            {/* RING */}
            <div className="absolute inset-0 rounded-full border-2 border-[var(--accent)] opacity-40" />
            {/* PHOTO — replace /logo.jpeg with /profile.jpg once you add your photo */}
            <img
              src="/profile.png"
              alt="Aakash Dahiya"
              className="relative w-full h-full rounded-full object-cover border-4 border-[var(--card)]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}