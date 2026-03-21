import { motion } from "framer-motion";

const socials = [
  {
    name: "GitHub",
    href: "https://github.com/Aakash22010",
    icon: <path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.7-.7 2.1-1.1.1-.7.4-1.1.7-1.4-2.6-.3-5.4-1.3-5.4-5.8 0-1.3.5-2.4 1.1-3.3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 .1a10.5 10.5 0 015.5 0c2.1-.4 3-.1 3-.1.6 1.5.2 2.6.1 2.9.7.9 1.1 2 1.1 3.3 0 4.5-2.8 5.5-5.4 5.8.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z" />,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aakashdahiya167/",
    icon: <path d="M4.98 3.5a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM3 9h4v12H3zM9 9h3.8v1.6h.1c.5-.9 1.8-1.9 3.6-1.9 3.9 0 4.6 2.6 4.6 5.9V21h-4v-5.2c0-1.2 0-2.7-1.7-2.7s-2 1.3-2 2.6V21H9z" />,
  },
  {
    name: "Instagram",
    href: "http://instagram.com/_aakashdahiya_/",
    icon: <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-.9a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2z" />,
  },
  {
    name: "Email",
    href: "mailto:aakashdahiya167@gmail.com",
    icon: <path d="M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z" />,
  },
];

const STACK = ["React", "Vite", "Tailwind", "Framer Motion", "Express", "Supabase"];

function BackToTop() {
  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="mono text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition"
      style={{ color: "var(--muted)", border: "1px solid var(--border)", background: "var(--card)" }}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 300 }}
      aria-label="Back to top"
    >
      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 4l-8 8h5v8h6v-8h5z" />
      </svg>
      back to top
    </motion.button>
  );
}

export default function Footer() {
  return (
    <footer className="mt-8 px-6 py-10" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="max-w-5xl mx-auto">

        {/* TOP ROW */}
        <div className="flex items-center justify-between flex-wrap gap-6 mb-8">
          <div className="flex gap-6">
            {socials.map((social) => (
              <motion.a key={social.name} href={social.href}
                target="_blank" rel="noopener noreferrer"
                className="relative group"
                style={{ color: "var(--muted)" }}
                whileHover={{ scale: 1.2, y: -4, color: "var(--accent)" }}
                transition={{ type: "spring", stiffness: 300 }}
                aria-label={social.name}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  {social.icon}
                </svg>
              </motion.a>
            ))}
          </div>
          <BackToTop />
        </div>

        {/* DIVIDER */}
        <div className="mb-6 h-px"
          style={{ background: "linear-gradient(90deg, transparent, var(--border), transparent)" }} />

        {/* BOTTOM ROW */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-start">
            <span className="mono text-xs" style={{ color: "var(--muted)" }}>built with</span>
            {STACK.map((tech, i) => (
              <span key={tech} className="flex items-center gap-2">
                <span className="mono text-xs px-2 py-0.5 rounded"
                  style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}>
                  {tech}
                </span>
                {i < STACK.length - 1 && <span style={{ color: "var(--border)" }}>·</span>}
              </span>
            ))}
          </div>
          <p className="mono text-xs" style={{ color: "var(--muted)" }}>
            © {new Date().getFullYear()} Aakash Dahiya
          </p>
        </div>

      </div>
    </footer>
  );
}