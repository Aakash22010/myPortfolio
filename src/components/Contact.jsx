import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";

const links = [
  { label: "GitHub", handle: "@Aakash22010", href: "https://github.com/Aakash22010" },
  { label: "LinkedIn", handle: "aakashdahiya167", href: "https://www.linkedin.com/in/aakashdahiya167/" },
  { label: "Email", handle: "aakashdahiya167@gmail.com", href: "mailto:aakashdahiya167@gmail.com" },
];

function SendButton({ href }) {
  return (
    <>
      <style>{`
        .send-btn {
          font-size: 16px;
          background: var(--accent);
          color: #fff;
          padding: 0.7em 1.2em 0.7em 1em;
          display: inline-flex;
          align-items: center;
          border: none;
          border-radius: 14px;
          overflow: hidden;
          transition: all 0.2s;
          cursor: pointer;
          text-decoration: none;
          font-family: 'JetBrains Mono', monospace;
        }
        .send-btn:active {
          transform: scale(0.95);
        }
        .send-btn span {
          display: block;
          margin-left: 0.4em;
          transition: all 0.3s ease-in-out;
        }
        .send-btn svg {
          display: block;
          transform-origin: center center;
          transition: transform 0.3s ease-in-out;
          flex-shrink: 0;
        }
        .send-btn:hover .send-svg-wrapper {
          animation: send-fly 0.6s ease-in-out infinite alternate;
        }
        .send-btn:hover svg {
          transform: translateX(1.1em) rotate(45deg) scale(1.1);
        }
        .send-btn:hover span {
          transform: translateX(4.5em);
        }
        @keyframes send-fly {
          from { transform: translateY(0.1em); }
          to   { transform: translateY(-0.1em); }
        }
      `}</style>

      <a href={href} className="send-btn">
        <div className="send-svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
        <span>Send me an email</span>
      </a>
    </>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6">
      <motion.div className="max-w-3xl mx-auto" variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        <motion.div variants={fadeUp} className="mb-10">
          <p className="section-label mb-2">// let's talk</p>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-base leading-relaxed mb-10" style={{ color: "var(--muted)" }}>
          Open to internships, collaborations, freelance work, and interesting problems. My inbox is always open.
        </motion.p>

        <motion.div variants={fadeUp} className="space-y-3 mb-10">
          {links.map(({ label, handle, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass flex items-center justify-between px-6 py-4 rounded-xl group transition"
              onMouseEnter={e => e.currentTarget.style.borderColor = "var(--border-hard)"}
              onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}
            >
              <div className="flex items-center gap-4">
                <span className="mono text-xs w-16" style={{ color: "var(--muted)" }}>{label}</span>
                <span className="text-sm font-medium">{handle}</span>
              </div>
              <span className="mono text-sm" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
        </motion.div>

        <motion.div variants={fadeUp}>
          <SendButton href="mailto:aakashdahiya167@gmail.com" />
        </motion.div>
      </motion.div>
    </section>
  );
}