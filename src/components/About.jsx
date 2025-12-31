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
      <p className="leading-relaxed opacity-80">
        I’m a Computer Science student and full-stack web developer with
        experience in React, Node.js, MongoDB, and Tailwind CSS.
        <br /><br />
        President of Codex – The Coding Club of GIET.
      </p>
    </motion.section>
  );
}
