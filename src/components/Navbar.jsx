import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DownloadButton from "./DownloadButton";

const NAV_SECTIONS = ["about", "skills", "experience", "freelance", "projects", "contact"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  useEffect(() => {
    const observers = [];
    NAV_SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 w-full z-50">
      <motion.div
        animate={{ paddingTop: scrolled ? "0.6rem" : "1.1rem", paddingBottom: scrolled ? "0.6rem" : "1.1rem" }}
        style={{
          background: scrolled ? "var(--card)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          <a href="#" className="mono font-medium text-base flex items-center gap-1.5">
            <span style={{ color: "var(--accent)" }}>{"<"}</span>
            <span>aakash</span>
            <span style={{ color: "var(--accent2)" }}>.dev</span>
            <span style={{ color: "var(--accent)" }}>{"/>"}</span>
          </a>

          <div className="hidden md:flex gap-1 items-center">
            {NAV_SECTIONS.map((id) => (
              <a key={id} href={`#${id}`}
                className="relative px-3 py-1.5 text-sm capitalize transition-all duration-200 rounded"
                style={{ color: active === id ? "var(--accent)" : "var(--text)", opacity: active === id ? 1 : 0.6 }}
              >
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded"
                    style={{ background: "var(--glow)", border: "1px solid var(--border)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{id}</span>
              </a>
            ))}
            <DownloadButton href="/Aakash_Dahiya_Resume.pdf" compact className="ml-3" />
            <div className="ml-3"><ThemeToggle /></div>
          </div>

          <button type="button" aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mono text-lg">
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div key="mobile-menu"
            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{ background: "var(--card)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)" }}
          >
            <div className="flex flex-col px-6 py-6 gap-4">
              {NAV_SECTIONS.map((id) => (
                <a key={id} href={`#${id}`} onClick={() => setOpen(false)}
                  className="capitalize text-sm py-1"
                  style={{ color: active === id ? "var(--accent)" : "var(--text)" }}>
                  {active === id ? `> ${id}` : id}
                </a>
              ))}
              <DownloadButton href="/Aakash_Dahiya_Resume.pdf" compact className="ml-3" />
              <div className="flex items-center justify-between pt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <span className="mono text-xs" style={{ color: "var(--muted)" }}>theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}