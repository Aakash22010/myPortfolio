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

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: "left",
        position: "fixed",
        top: 0, left: 0, right: 0,
        height: "2px",
        zIndex: 100,
        background: "linear-gradient(90deg, var(--accent2), var(--accent))",
      }}
    />
  );
}

function Portfolio() {
  return (
    <>
      <Preloader />
      <Background3D />
      <ScrollProgress />
      <div className="min-h-screen" style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Freelance />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/"           element={<Portfolio />} />
          <Route path="/admin"      element={<AdminLogin />} />
          <Route path="/admin/dash" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}