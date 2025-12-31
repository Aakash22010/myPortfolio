import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center text-center px-4">
      <motion.div variants={fadeUp} initial="hidden" animate="visible">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
          Full-Stack Web Developer
        </h1>
        <p className="mt-4 max-w-xl mx-auto opacity-80 text-sm sm:text-base">
          React • Node.js • MongoDB <br />
          Building scalable web applications
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#projects"
            className="px-6 py-3 bg-[var(--accent)] text-white rounded"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="px-6 py-3 border border-[var(--border)] rounded"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
}
