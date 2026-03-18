import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function About() {
  return (
    <motion.section
      id="about"
      className="py-20 px-6 max-w-5xl mx-auto"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <h2 className="text-3xl font-bold mb-6">About Me</h2>
      <div className="space-y-4 leading-relaxed opacity-80 max-w-3xl">
        <p>
          I'm a Computer Science student and full-stack web developer focused
          on building real, production-ready applications — not just tutorial
          projects. My stack centers around React, Node.js, Express, MongoDB,
          and Tailwind CSS, with hands-on experience in Firebase, Cloudinary,
          JWT auth, and deploying on Vercel and Render.
        </p>
        <p>
          I've interned at NullClass and Myitronline, where I worked on
          full-stack platforms end-to-end — from designing REST APIs to
          building responsive UIs and integrating third-party services.
        </p>
        <p>
          Outside of work, I lead Codex — the coding club of GIET — where I
          organize workshops, hackathons, and peer mentoring sessions to build
          a stronger developer community on campus.
        </p>
        <p>
          Currently open to internships, collaborations, and freelance
          opportunities where I can contribute and keep growing.
        </p>
      </div>
    </motion.section>
  );
}