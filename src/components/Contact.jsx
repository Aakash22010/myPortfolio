// app/contact/page.jsx (or wherever your contact section lives)
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import AnimatedEmailButton from "../components/AnimatedEmailButton"; // adjust path

const links = [
  { label: "GitHub", handle: "@Aakash22010", href: "https://github.com/Aakash22010" },
  { label: "LinkedIn", handle: "aakashdahiya167", href: "https://www.linkedin.com/in/aakashdahiya167/" },
  { label: "Email", handle: "aakashdahiya167@gmail.com", href: "mailto:aakashdahiya167@gmail.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-10">
          <p className="section-label mb-2">// let's talk</p>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="text-base leading-relaxed mb-10"
          style={{ color: "var(--muted)" }}
        >
          Open to internships, collaborations, freelance work, and interesting
          problems. My inbox is always open.
        </motion.p>

        <motion.div variants={fadeUp} className="space-y-3 mb-10">
          {links.map(({ label, handle, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass flex items-center justify-between px-6 py-4 rounded-xl group transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--border-hard)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              <div className="flex items-center gap-4">
                <span
                  className="mono text-xs w-16"
                  style={{ color: "var(--muted)" }}
                >
                  {label}
                </span>
                <span className="text-sm font-medium">{handle}</span>
              </div>
              <span className="mono text-sm" style={{ color: "var(--accent)" }}>
                ↗
              </span>
            </a>
          ))}
        </motion.div>

        {/* Replace old email link with animated button */}
        <motion.div variants={fadeUp}>
          <AnimatedEmailButton href="mailto:aakashdahiya167@gmail.com" />
        </motion.div>
      </motion.div>
    </section>
  );
}