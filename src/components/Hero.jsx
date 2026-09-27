import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import DownloadButton from "./DownloadButton";

const ROLES = [
  "Full-Stack Developer",
  "Data Analyst @ Bookchor",
  "Next.js Developer",
  "PostgreSQL · Docker",
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
    <span style={{ color: "var(--accent)" }}>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

function ProfilePhoto() {
  return (
    <div className="relative flex items-center justify-center flex-shrink-0"
      style={{ width: "clamp(220px, 40vw, 340px)", height: "clamp(220px, 40vw, 340px)" }}>

      {/* Ambient glow layers */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{ inset: "10%", background: "var(--accent)", opacity: 0.25 }}
      />
      <div
        className="absolute rounded-full blur-2xl"
        style={{ inset: "-5%", background: "var(--accent2)", opacity: 0.1 }}
      />

      {/* Photo */}
      <motion.div
        className="relative rounded-full overflow-hidden"
        style={{
          width: "clamp(200px, 38vw, 320px)",
          height: "clamp(200px, 38vw, 320px)",
          border: "2px solid var(--border-hard)",
          boxShadow: "0 0 40px -10px var(--accent)",
        }}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
      >
        <img
          src="/profile.png"
          alt="Aakash Dahiya"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 py-24 sm:py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full flex flex-col-reverse md:flex-row items-center justify-between gap-10 md:gap-16"
      >
        {/* LEFT — Text */}
        <div className="flex-1 text-center md:text-left">
          <motion.p variants={fadeUp} className="section-label mb-4">
            — data analyst @ bookchor
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="font-bold leading-[1.05] tracking-tight mb-4"
            style={{ fontSize: "clamp(3rem, 10vw, 6rem)" }}
          >
            Aakash<br />
            <span style={{ color: "var(--accent)" }}>Dahiya</span>
          </motion.h1>

          <motion.div
            variants={fadeUp}
            className="font-medium mb-5 mono"
            style={{ fontSize: "clamp(1rem, 3vw, 1.4rem)", minHeight: "2rem" }}
          >
            <TypedText />
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="text-sm sm:text-base max-w-md mx-auto md:mx-0 leading-relaxed mb-8"
            style={{ color: "var(--muted)" }}
          >
            Full-stack developer building production tools with React, Next.js,
            Node.js and PostgreSQL — shipped with Docker on Linux servers.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center md:justify-start items-center"
          >
            <a
              href="#projects"
              className="group relative flex items-center gap-2 px-5 py-2.5 overflow-hidden border-2 rounded-full text-sm font-semibold transition-all duration-300 w-full xs:w-auto justify-center"
              style={{ borderColor: "var(--accent)", color: "var(--accent)", background: "transparent" }}
            >
              <span
                className="absolute w-full transition-all duration-700 group-hover:w-full -left-full group-hover:left-0 rounded-full -z-10 aspect-square group-hover:scale-150 group-hover:duration-700"
                style={{ background: "var(--accent)" }}
              />
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                View Projects
              </span>
              <svg
                className="relative z-10 w-7 h-7 p-1.5 rounded-full border transition-all duration-300 rotate-45 group-hover:rotate-90 group-hover:border-transparent group-hover:bg-white"
                style={{ borderColor: "var(--accent)" }}
                viewBox="0 0 16 19"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  style={{ fill: "var(--accent)" }}
                  d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
                />
              </svg>
            </a>

            <DownloadButton href="/Aakash_Dahiya_Resume.pdf" className="w-full xs:w-auto justify-center" />
          </motion.div>
        </div>

        {/* RIGHT — Photo */}
        <motion.div variants={fadeUp}>
          <ProfilePhoto />
        </motion.div>
      </motion.div>
    </section>
  );
}