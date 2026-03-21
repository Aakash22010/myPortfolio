import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import GitHubStats from "./GitHubStats";

const stats = [
  { num: "2+", label: "Internships completed" },
  { num: "6+", label: "Projects shipped" },
  { num: "1yr+", label: "Leading Codex club" },
  { num: "∞", label: "Lines of code" },
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <motion.div className="max-w-5xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-10">
          <p className="section-label mb-2">// who I am</p>
          <h2 className="text-3xl md:text-4xl font-bold">About Me</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10">
          <motion.div variants={fadeUp} className="md:col-span-3 space-y-4 text-sm sm:text-base leading-relaxed" style={{ color: "var(--muted)" }}>
            <p>I'm a Computer Science student and full-stack developer focused on building <span style={{ color: "var(--text)" }}>real, production-ready applications</span> — not just tutorial projects. My stack centers around React, Node.js, Express, and MongoDB, with hands-on experience in Firebase, Cloudinary, JWT auth, and deploying on Vercel and Render.</p>
            <p>I've interned at <span style={{ color: "var(--accent)" }}>NullClass</span> and <span style={{ color: "var(--accent)" }}>Myitronline</span>, working on full-stack platforms end-to-end — designing REST APIs, building responsive UIs, and integrating third-party services.</p>
            <p>Outside of work, I lead <span style={{ color: "var(--accent2)" }}>Codex</span> — the coding club of GIET — organizing workshops, hackathons, and peer mentoring sessions.</p>
            <p>Currently open to internships, collaborations, and freelance opportunities where I can contribute and keep growing.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="md:col-span-2 grid grid-cols-2 gap-4 content-start">
            {stats.map(({ num, label }) => (
              <div key={label} className="glass rounded-xl p-5 text-center">
                <div className="mono text-2xl font-bold mb-1" style={{ color: "var(--accent)" }}>{num}</div>
                <div className="text-xs leading-snug" style={{ color: "var(--muted)" }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
        <GitHubStats />
      </motion.div>
    </section>
  );
}