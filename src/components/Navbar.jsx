import { motion, AnimatePresence, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import useTheme from "../hooks/useTheme";
import ThemeToggle from "./ThemeToggle";


export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setScrolled(latest > 40);
    });
  }, [scrollY]);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full z-50"
    >
      {/* NAVBAR BAR */}
      <motion.div
        animate={{
          paddingTop: scrolled ? "0.75rem" : "1.25rem",
          paddingBottom: scrolled ? "0.75rem" : "1.25rem",
          backgroundColor: scrolled ? "var(--card)" : "transparent",
          boxShadow: scrolled
            ? "0 10px 30px rgba(0,0,0,0.15)"
            : "none",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="border-b border-[var(--border)]"
      >
        <div className="max-w-6xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <span className="text-xl font-bold">Aakash.dev</span>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <NavLinks />
            <ThemeToggle />
          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden text-2xl"
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </motion.div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="md:hidden overflow-hidden border-b border-[var(--border)] bg-[var(--card)]"
          >
            <div className="flex flex-col px-6 py-6 gap-5">
              <NavLinks onClick={() => setMenuOpen(false)} />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* 🔹 NAV LINKS */
function NavLinks({ onClick }) {
  return (
    <>
      <a href="#about" onClick={onClick} className="hover:opacity-80">
        About
      </a>
      <a href="#skills" onClick={onClick} className="hover:opacity-80">
        Skills
      </a>
      <a href="#projects" onClick={onClick} className="hover:opacity-80">
        Projects
      </a>
      <a href="#contact" onClick={onClick} className="hover:opacity-80">
        Contact
      </a>
    </>
  );
}