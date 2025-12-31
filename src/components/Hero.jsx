import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 text-center">
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="max-w-2xl"
      >
        {/* HEADING */}
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight">
          Full-Stack Web Developer
        </h1>

        {/* SUBTEXT */}
        <p className="mt-4 opacity-80 text-sm sm:text-base">
          React • Node.js • MongoDB <br />
          Building scalable, real-world web applications
        </p>

        {/* CTA BUTTONS */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
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
        </div>
      </motion.div>
    </section>
  );
}
