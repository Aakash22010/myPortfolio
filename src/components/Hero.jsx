import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";

const ROLES = ["Full-Stack Developer", "React Developer", "Node.js Developer", "Open to Opportunities"];

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
    <span style={{ color: "var(--accent)" }}>
      {displayed}<span className="animate-pulse">|</span>
    </span>
  );
}

function Terminal() {
  const lines = [
    { text: "const developer = {", color: "var(--text)" },
    { text: '  name: "Aakash Dahiya",', color: "var(--accent)" },
    { text: '  role: "Full-Stack Dev",', color: "var(--accent)" },
    { text: '  stack: ["React", "Node", "MongoDB"],', color: "var(--accent2)" },
    { text: '  status: "open_to_work ✓",', color: "#4ade80" },
    { text: '  location: "Sonipat, India",', color: "var(--muted)" },
    { text: "}", color: "var(--text)" },
  ];

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
      className="glass rounded-lg overflow-hidden w-full max-w-md">
      <div className="flex items-center gap-2 px-4 py-3" style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}>
        <div className="w-3 h-3 rounded-full bg-red-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500 opacity-80" />
        <div className="w-3 h-3 rounded-full bg-green-500 opacity-80" />
        <span className="mono text-xs ml-2" style={{ color: "var(--muted)" }}>developer.js</span>
      </div>
      <div className="px-5 py-4 space-y-1">
        {lines.map((line, i) => (
          <motion.p key={i} className="mono text-xs sm:text-sm leading-relaxed" style={{ color: line.color }}
            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1 + i * 0.1, duration: 0.3 }}>
            <span style={{ color: "var(--muted)", userSelect: "none" }} className="mr-4 text-xs">{i + 1}</span>
            {line.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

function RingDot({ angle, radius, delay, color }) {
  const rad = (angle * Math.PI) / 180;
  const x = Math.cos(rad) * radius;
  const y = Math.sin(rad) * radius;
  return (
    <motion.div className="absolute" style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)`, transform: "translate(-50%, -50%)" }}>
      <motion.div className="absolute inset-0 rounded-full" style={{ background: color }}
        animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay, ease: "easeOut" }} />
      <div className="w-3 h-3 rounded-full relative" style={{ background: color, boxShadow: `0 0 8px 2px ${color}` }} />
    </motion.div>
  );
}

function ProfilePhoto() {
  return (
    <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80">
      <motion.div className="absolute inset-0 rounded-full"
        style={{ border: "1.5px dashed var(--border-hard)", opacity: 0.6 }}
        animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: "linear" }} />
      <motion.div className="absolute rounded-full"
        style={{ inset: "12px", padding: "3px", background: "conic-gradient(from 0deg, var(--accent), var(--border-hard), transparent, var(--accent))", borderRadius: "9999px" }}
        animate={{ rotate: -360 }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
        <div className="w-full h-full rounded-full" style={{ background: "var(--bg)" }} />
      </motion.div>
      <div className="absolute rounded-full blur-3xl opacity-20" style={{ inset: "20px", background: "var(--accent)" }} />
      <motion.div className="absolute rounded-full overflow-hidden"
        style={{ inset: "18px", border: "3px solid var(--surface)" }}
        animate={{ y: [0, -7, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <img src="/profile.png" alt="Aakash Dahiya" className="w-full h-full object-cover" />
      </motion.div>
      <RingDot angle={-45} radius={130} delay={0}   color="var(--accent)" />
      <RingDot angle={100} radius={130} delay={0.7} color="var(--accent2)" />
      <RingDot angle={210} radius={130} delay={1.4} color="var(--accent)" />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-28">
      <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-6xl w-full">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 mb-12">
          <div className="flex-1 text-center md:text-left">
            <motion.p variants={fadeUp} className="section-label mb-3">— available for hire</motion.p>
            <motion.h1 variants={fadeUp} className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4">
              Aakash<br /><span style={{ color: "var(--accent)" }}>Dahiya</span>
            </motion.h1>
            <motion.div variants={fadeUp} className="text-xl sm:text-2xl font-medium mb-6 mono" style={{ minHeight: "2rem" }}>
              <TypedText />
            </motion.div>
            <motion.p variants={fadeUp} className="text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed mb-8" style={{ color: "var(--muted)" }}>
              CS student building real, production-ready web apps with React, Node.js, and MongoDB. President of Codex — the coding club of GIET.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
              <a href="#projects" className="px-6 py-3 rounded-md text-sm font-medium transition"
                style={{ background: "var(--accent)", color: "#fff" }}
                onMouseEnter={e => e.target.style.opacity = 0.85}
                onMouseLeave={e => e.target.style.opacity = 1}>
                View Projects →
              </a>
              <a href="/Aakash_Dahiya_Resume.pdf" download
                className="px-6 py-3 rounded-md text-sm font-medium mono transition glass"
                style={{ color: "var(--accent)" }}>
                resume.pdf ↓
              </a>
            </motion.div>
          </div>
          <motion.div variants={fadeUp} className="flex-shrink-0">
            <ProfilePhoto />
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          <Terminal />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-row md:flex-col gap-4 flex-wrap">
            {[{ num: "2+", label: "Internships" }, { num: "6+", label: "Projects" }, { num: "1", label: "Coding Club" }].map(({ num, label }) => (
              <div key={label} className="glass rounded-lg px-6 py-4 text-center min-w-[100px]">
                <div className="text-2xl font-bold mono" style={{ color: "var(--accent)" }}>{num}</div>
                <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.6 }}
            className="glass rounded-lg p-4 flex flex-wrap gap-2 max-w-xs">
            <p className="mono text-xs w-full mb-1" style={{ color: "var(--muted)" }}>// stack</p>
            {["React", "Next.js", "Node.js", "Express", "MongoDB", "TypeScript", "Tailwind", "Firebase"].map((tech) => (
              <span key={tech} className="mono text-xs px-2.5 py-1 rounded"
                style={{ background: "var(--glow)", border: "1px solid var(--border)", color: "var(--accent)" }}>
                {tech}
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}