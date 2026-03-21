import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import HeartbeatLoader from "./HeartbeatLoader";

export default function Freelance() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getFreelance()
      .then(setServices)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="freelance" className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <p className="section-label mb-2">// open for work</p>
          <h2 className="text-3xl md:text-4xl font-bold">Freelancing</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-sm sm:text-base leading-relaxed mb-10 sm:mb-12 max-w-2xl"
          style={{ color: "var(--muted)" }}
        >
          Open to freelance projects where I can help individuals, startups, and
          small businesses build fast, modern, and scalable web applications.
        </motion.p>

        {loading ? (
          <HeartbeatLoader />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-10 sm:mb-12">
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={fadeUp}
                className="glass rounded-xl p-5 sm:p-6 group relative overflow-hidden"
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
                  style={{ background: "radial-gradient(circle at top right, var(--glow), transparent 60%)" }}
                />
                <span className="mono text-xs mb-4 block" style={{ color: "var(--muted)" }}>
                  {service.tag}
                </span>
                <h3 className="font-semibold text-base mb-2">{service.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{service.desc}</p>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3">
          <a
            href="mailto:aakashdahiya167@gmail.com"
            className="px-6 py-3 rounded-xl text-sm font-medium mono text-center transition"
            style={{ background: "var(--accent)", color: "#fff" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Hire Me →
          </a>
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl text-sm font-medium mono text-center glass transition"
            style={{ color: "var(--accent)" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hard)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            View Work
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}