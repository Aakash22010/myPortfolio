import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (v) => setScrolled(v > 40));
  }, [scrollY]);

  return (
    <nav className="fixed top-0 w-full z-50 pointer-events-auto">
      {/* NAV BAR */}
      <motion.div
        animate={{
          paddingTop: scrolled ? "0.75rem" : "1.25rem",
          paddingBottom: scrolled ? "0.75rem" : "1.25rem",
          backgroundColor: scrolled ? "var(--card)" : "transparent",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.15)"
            : "none",
        }}
        transition={{ duration: 0.3 }}
       
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <a href="#" className="font-bold text-lg">Aakash.dev</a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex gap-6 items-center">
            <Links />
            <ThemeToggle />
          </div>

          {/* MOBILE BUTTON */}
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-2xl z-50 pointer-events-auto touch-manipulation"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[var(--card)] border-b border-[var(--border)]"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              <Links onClick={() => setOpen(false)} />

              <div className="flex items-center justify-between">
                <span className="text-sm opacity-70">Theme</span>
                <ThemeToggle />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

/* NAV LINKS */
function Links({ onClick }) {
  return (
    <>
      {["about", "skills", "experience", "freelance", "projects", "contact"].map((id) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={onClick}
          className="capitalize text-base hover:opacity-80 touch-manipulation"
        >
          {id}
        </a>
      ))}

      <a
        href="/Aakash_Dahiya_Resume.pdf"
        download
        onClick={onClick}
        className="text-base hover:opacity-80 touch-manipulation"
      >
        Resume
      </a>
    </>
  );
}
