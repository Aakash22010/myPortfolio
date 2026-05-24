import { useState, useEffect } from "react";
import { api } from "../lib/api";
import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import GitHubStats from "./GitHubStats";
import HeartbeatLoader from "./HeartbeatLoader";

const STACK = [
  "React", "Next.js", "TypeScript", "Node.js",
  "Express", "MongoDB", "Tailwind CSS", "Supabase",
  "Firebase", "Vercel", "Git", "Render",
];

// ── Story Card ────────────────────────────────────────────────────────────────
function StoryCard() {
  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-6 sm:p-8 flex flex-col justify-between h-full group relative overflow-hidden"
      style={{ border: "1px solid var(--border-hard)" }}
    >
      {/* Subtle hover glow */}
      <div
        className="absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: "var(--glow)", transform: "translate(30%, -30%)" }}
      />

      <div className="relative">
        <span
          className="mono text-xs px-2 py-0.5 rounded mb-5 inline-block"
          style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          // who I am
        </span>

        <h3 className="text-xl sm:text-2xl font-bold mb-4 leading-snug">
          CS student who ships{" "}
          <span style={{ color: "var(--accent)" }}>real products</span>,<br />
          not just tutorials.
        </h3>

        <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--muted)" }}>
          Final-year CS student and full-stack developer. My stack centres on React,
          Node.js, and MongoDB — shipped to Vercel and Render. I've interned at{" "}
          <span style={{ color: "var(--text)" }}>NullClass</span> and{" "}
          <span style={{ color: "var(--text)" }}>Myitronline</span>, working
          end-to-end on production platforms — REST APIs, responsive UIs,
          third-party integrations.
        </p>

        <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
          Outside code, I lead{" "}
          <span style={{ color: "var(--accent2)" }}>Codex</span> — GIET's coding
          club — organising workshops, hackathons, and peer mentoring sessions.
        </p>
      </div>

      {/* Stat pills */}
      <div className="relative flex gap-3 mt-6 flex-wrap">
        {[
          { num: "2+",   label: "Internships" },
          { num: "6+",   label: "Projects" },
          { num: "1yr+", label: "Codex lead" },
        ].map(({ num, label }) => (
          <div
            key={label}
            className="rounded-xl px-4 py-2.5 text-center"
            style={{ background: "var(--glow)", border: "1px solid var(--border)" }}
          >
            <div className="mono text-base sm:text-lg font-bold" style={{ color: "var(--accent)" }}>
              {num}
            </div>
            <div className="mono text-xs" style={{ color: "var(--muted)" }}>
              {label}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// ── Radar Card ────────────────────────────────────────────────────────────────
function RadarCard() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit", minute: "2-digit", second: "2-digit",
        hour12: false,
      }));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 relative overflow-hidden"
      style={{ border: "1px solid var(--border-hard)", minHeight: "220px" }}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-[0.06]" style={{
        backgroundImage: "linear-gradient(var(--accent) 1px, transparent 1px), linear-gradient(90deg, var(--accent) 1px, transparent 1px)",
        backgroundSize: "22px 22px",
      }} />

      {/* Radar rings */}
      {[88, 60, 34].map((size, i) => (
        <motion.div
          key={size}
          className="absolute rounded-full"
          style={{ width: `${size}px`, height: `${size}px`, border: "1px solid var(--accent)" }}
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
        />
      ))}

      {/* Radar sweep */}
      <motion.div
        className="absolute"
        style={{
          width: "44px", height: "2px",
          background: "linear-gradient(to right, transparent, var(--accent))",
          transformOrigin: "left center",
          top: "50%", left: "50%",
          marginTop: "-1px",
        }}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />

      {/* Info */}
      <div className="relative z-10 text-center space-y-1.5">
        <p className="mono text-xs font-bold" style={{ color: "var(--text)" }}>
          Sonipat, Haryana
        </p>
        <p className="mono text-xs" style={{ color: "var(--muted)" }}>
          28.9288° N · 77.0177° E
        </p>
        <p className="mono text-xs tabular-nums" style={{ color: "var(--accent2)" }}>
          {time} IST
        </p>
        <span
          className="mono text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1.5 mt-1"
          style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
        >
          <motion.span
            className="w-1.5 h-1.5 rounded-full inline-block"
            style={{ background: "#4ade80" }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Open to remote
        </span>
      </div>
    </motion.div>
  );
}

// ── Workspace Card ────────────────────────────────────────────────────────────
function WorkspaceCard() {
  const lines = [
  { prompt: true,  text: "neofetch",               color: "var(--accent)"  },
  { prompt: false, text: "OS    Ubuntu Server 24", color: "var(--text)"    },
  { prompt: false, text: "ED    VS Code",           color: "var(--text)"    },
  { prompt: false, text: "SH    zsh + oh-my-zsh",  color: "var(--text)"    },
  { prompt: false, text: "PKG   npm / pnpm",        color: "var(--text)"    },
  { prompt: false, text: "RUN   Docker Compose",    color: "var(--accent2)" },
  { prompt: false, text: "HOST  Cloudflare Tunnel", color: "var(--accent2)" },
  { prompt: false, text: "SVC   Nextcloud · Jellyfin", color: "var(--accent2)" },
  { prompt: false, text: "NET   WireGuard · AdGuard",  color: "var(--accent2)" },
  { prompt: true,  text: "_",                       color: "var(--muted)"  },
];

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl overflow-hidden h-full"
      style={{ border: "1px solid var(--border-hard)" }}
    >
      {/* Terminal titlebar */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ borderBottom: "1px solid var(--border)", background: "var(--surface)" }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-500 opacity-75" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500 opacity-75" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500 opacity-75" />
        <span className="mono text-xs ml-2" style={{ color: "var(--muted)" }}>
          workspace.sh
        </span>
      </div>

      <div className="px-4 py-5 space-y-2">
        {lines.map((line, i) => (
          <motion.p
            key={line.text}
            className="mono text-xs"
            style={{ color: line.color }}
            initial={{ opacity: 0, x: -6 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 + i * 0.07, duration: 0.25 }}
          >
            {line.prompt && (
              <span style={{ color: "var(--accent2)" }}>❯ </span>
            )}
            {!line.prompt && (
              <span style={{ color: "var(--border-hard)", userSelect: "none" }}>  </span>
            )}
            {line.text}
          </motion.p>
        ))}
      </div>
    </motion.div>
  );
}

// ── Stack Card ────────────────────────────────────────────────────────────────
function MarqueeRow({ items, direction = "left", speed = 28 }) {
  const doubled = [...items, ...items];
  return (
    <div style={{
      overflow: "hidden",
      maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
      WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
    }}>
      <motion.div
        className="flex gap-3"
        style={{ width: "max-content" }}
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((tech, i) => (
          <span
            key={i}
            className="mono text-xs sm:text-sm px-3 py-1.5 rounded-lg whitespace-nowrap cursor-default"
            style={{
              background: "var(--glow)",
              color: "var(--accent)",
              border: "1px solid var(--border)",
            }}
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function StackCard() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getSkills()
      .then(setSkills)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const row1 = skills.filter((_, i) => i % 2 === 0).map(s => s.name);
  const row2 = skills.filter((_, i) => i % 2 !== 0).map(s => s.name);

  return (
    <motion.div
      variants={fadeUp}
      className="glass rounded-2xl p-6 sm:p-8 h-full relative overflow-hidden"
      style={{ border: "1px solid var(--border-hard)" }}
    >
      <p className="mono text-xs mb-6" style={{ color: "var(--muted)" }}>
        // stack I ship with
      </p>

      {loading ? (
        <HeartbeatLoader />
      ) : error ? (
        <p className="mono text-xs" style={{ color: "var(--muted)" }}>
          Failed to load stack.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          <MarqueeRow items={row1} direction="left"  speed={30} />
          <MarqueeRow items={row2} direction="right" speed={25} />
        </div>
      )}
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function BentoAbout() {
  return (
    <section id="about" className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-5xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
          <p className="section-label mb-2">// who I am & what I use</p>
          <h2 className="text-3xl md:text-4xl font-bold">About</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        {/* BENTO GRID */}
        <div className="grid lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Row 1: Story (2 cols) + Radar (1 col) */}
          <div className="lg:col-span-2">
            <StoryCard />
          </div>
          <WorkspaceCard />

          {/* Row 2: Workspace (1 col) + Stack (2 cols) */}
          <RadarCard />
          <div className="lg:col-span-2">
            <StackCard />
          </div>
        </div>

        {/* GitHub activity below the bento */}
        <GitHubStats />
      </motion.div>
    </section>
  );
}