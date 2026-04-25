import { useScroll, useSpring, motion } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Freelance from "./components/Freelance";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Background3D from "./components/Background3D";
import Preloader from "./components/Preloader";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { ThemeProvider } from "./hooks/ThemeContext";
import NotFound from "./pages/NotFound";
import CustomCursor from "./components/CustomCursor";
import ServerStatus from "./pages/ServerStatus";
import { Analytics } from "@vercel/analytics/react";
import ServerError from "./pages/ServerError";

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        // Must be above the canvas (z:0) and below the navbar (z:50)
        zIndex: 40,
        background: "linear-gradient(90deg, var(--accent2), var(--accent))",
      }}
    />
  );
}

function Portfolio() {
  return (
    <>
      <Preloader />
      {/* Canvas sits at z-index 0 — purely decorative background */}
      <Background3D />
      <ScrollProgress />
      {/*
        Content wrapper:
        - position: relative + z-index: 1 ensures ALL content renders
          above the canvas on every device, including mobile.
        - overflow-x: hidden stops any child from causing horizontal scroll.
        - min-w-0 prevents flex children from busting out of bounds.
      */}
      <div
        className="min-h-screen"
        style={{
          position: "relative",
          zIndex: 1,
          overflowX: "hidden",
        }}
      >
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Freelance />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dash" element={<AdminDashboard />} />
          <Route path="/status" element={<ServerStatus />} />
          <Route path="/error" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </ThemeProvider>
  );
}