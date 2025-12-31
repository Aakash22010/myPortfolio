import { motion } from "framer-motion";
import { fadeUp } from "../animations";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      className="py-20 px-6 text-center border-t border-[var(--border)]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-4">Get In Touch</h2>
      <p className="opacity-80 mb-6 text-sm md:text-base">
         Open to internships, collaborations, and opportunities.
      </p>
      <a
        href="mailto:aakashdahiya167@gmail.com"
        className="px-6 py-3 bg-[var(--accent)] text-white rounded"
      >
        Email Me
      </a>
    </motion.section>
  );
}
