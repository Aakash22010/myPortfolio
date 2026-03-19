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

function RingDot({ angle, radius, delay, color }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;

  return (
    <motion.div
      className="absolute"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* pulse ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ background: color }}
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }}
      />
      {/* solid dot */}
      <div
        className="w-3 h-3 rounded-full relative"
        style={{ background: color, boxShadow: `0 0 8px 2px ${color}` }}
      />
    </motion.div>
  );
}

function ProfilePhoto() {
  return (
    <div className="relative flex items-center justify-center w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">

      {/* OUTER SLOW ROTATING DASHED RING */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ border: "2px dashed var(--border)", opacity: 0.5 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      {/* INNER FAST ROTATING GRADIENT RING */}
      <motion.div
        className="absolute rounded-full"
        style={{
          inset: "12px",
          padding: "3px",
          background: "conic-gradient(from 0deg, var(--accent), var(--border), transparent, var(--accent))",
          borderRadius: "9999px",
        }}
        animate={{ rotate: -360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-full h-full rounded-full" style={{ background: "var(--bg)" }} />
      </motion.div>

      {/* GLOW */}
      <div
        className="absolute rounded-full blur-3xl opacity-25"
        style={{ inset: "20px", background: "var(--accent)" }}
      />

      {/* FLOATING PHOTO */}
      <motion.div
        className="absolute rounded-full overflow-hidden border-4 border-[var(--card)]"
        style={{ inset: "18px" }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src="/profile.png" alt="Aakash Dahiya" className="w-full h-full object-cover" />
      </motion.div>

      {/* GLOWING DOTS */}
      <RingDot angle={-45}  radius={148} delay={0}   color="#0fa4af" />
      <RingDot angle={90}   radius={148} delay={0.7} color="#964734" />
      <RingDot angle={200}  radius={148} delay={1.4} color="#0fa4af" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-5xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-16"
      >
        <div className="flex-1 text-center md:text-left">
          <motion.p variants={fadeUp} className="text-sm sm:text-base opacity-60 mb-2 tracking-widest uppercase">Hey, I'm</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight mb-4">Aakash Dahiya</motion.h1>
          <motion.div variants={fadeUp} className="text-lg sm:text-xl md:text-2xl font-medium mb-6" style={{ minHeight: "2rem" }}>
            <TypedText />
          </motion.div>
          <motion.p variants={fadeUp} className="opacity-70 text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed mb-8">
            CS student building real, production-ready web apps with React, Node.js, and MongoDB. Currently leading Codex — the coding club of GIET.
          </motion.p>
          <motion.div variants={fadeUp} className="flex gap-3 flex-wrap justify-center md:justify-start mb-8">
            {["React", "Next.js", "Node.js", "MongoDB", "TypeScript", "Tailwind"].map((tech) => (
              <span key={tech} className="text-xs px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--card)] opacity-80">{tech}</span>
            ))}
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#projects" className="px-6 py-3 rounded bg-[var(--accent)] text-white text-sm sm:text-base transition hover:opacity-90">View Projects</a>
            <a href="/Aakash_Dahiya_Resume.pdf" download className="px-6 py-3 rounded border border-[var(--border)] text-sm sm:text-base transition hover:bg-[var(--card)]">Download Resume</a>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="flex-shrink-0">
          <ProfilePhoto />
        </motion.div>
      </motion.div>
    </section>
  );
}