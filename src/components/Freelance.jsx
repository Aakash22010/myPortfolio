import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

export default function Freelance() {
  return (
    <section id="freelance" className="py-20 px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* TITLE */}
        <motion.h2
          variants={fadeUp}
          className="text-2xl md:text-3xl font-bold mb-6"
        >
          Freelancing
        </motion.h2>

        {/* INTRO */}
        <motion.p
          variants={fadeUp}
          className="max-w-2xl opacity-80 leading-relaxed mb-10"
        >
          I’m open to freelance opportunities where I can help individuals,
          startups, and small businesses build fast, modern, and scalable web
          applications.
        </motion.p>

        {/* SERVICES */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              title: "Frontend Development",
              desc: "Modern, responsive UIs using React, Tailwind CSS, and Vite.",
            },
            {
              title: "Full-Stack Applications",
              desc: "End-to-end web apps with React, Node.js, Express, and MongoDB.",
            },
            {
              title: "Authentication & APIs",
              desc: "Secure REST APIs, JWT authentication, and backend integration.",
            },
          ].map((service) => (
            <motion.div
              key={service.title}
              variants={fadeUp}
              className="p-6 rounded border border-[var(--border)] bg-[var(--card)]"
            >
              <h3 className="font-semibold text-lg">{service.title}</h3>
              <p className="mt-2 text-sm opacity-80">{service.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4"
        >
          <a
            href="mailto:aakashdahiya167@gmail.com"
            className="px-6 py-3 rounded bg-[var(--accent)] text-white text-center"
          >
            Hire Me
          </a>

          <a
            href="#projects"
            className="px-6 py-3 rounded border border-[var(--border)] text-center"
          >
            View Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
