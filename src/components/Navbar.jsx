import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import DownloadButton from "./DownloadButton";

const NAV_SECTIONS = ["about", "skills", "experience", "projects", "freelance", "contact"];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  // Close menu on resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <a href="#" className="mono font-medium text-sm sm:text-base flex items-center gap-1.5">
            <span style={{ color: "var(--accent)" }}>{"<"}</span>
            <span>aakash</span>
            <span style={{ color: "var(--accent2)" }}>.dev</span>
            <span style={{ color: "var(--accent)" }}>{"/>"}</span>
          </a>

          {/* Desktop nav */}
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

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="mono text-lg w-9 h-9 flex items-center justify-center rounded-lg"
              style={{ background: "var(--glow)", border: "1px solid var(--border)" }}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            style={{
              background: "var(--card)",
              backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)",
              maxHeight: "calc(100vh - 60px)",
              overflowY: "auto",
            }}
          >
            <div className="flex flex-col px-6 py-6 gap-1">
              {NAV_SECTIONS.map((id) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="capitalize text-base py-3 px-2 rounded-lg transition-colors"
                  style={{
                    color: active === id ? "var(--accent)" : "var(--text)",
                    background: active === id ? "var(--glow)" : "transparent",
                    borderLeft: active === id ? "2px solid var(--accent)" : "2px solid transparent",
                    paddingLeft: "12px",
                  }}
                >
                  {active === id ? `> ${id}` : id}
                </a>
              ))}
              <div className="pt-4 mt-2" style={{ borderTop: "1px solid var(--border)" }}>
                <DownloadButton href="/Aakash_Dahiya_Resume.pdf" className="w-full justify-center" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}