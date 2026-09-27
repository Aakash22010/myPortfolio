import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useState } from "react";
import HeartbeatLoader from "./HeartbeatLoader";

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;

const links = [
  { label: "GitHub",     handle: "@Aakash22010",             href: "https://github.com/Aakash22010" },
  { label: "LinkedIn",   handle: "aakashdahiya167",          href: "https://www.linkedin.com/in/aakashdahiya167/" },
  { label: "Email",      handle: "aakashdahiya167@gmail.com",href: "mailto:aakashdahiya167@gmail.com" },
];

function SendButton({ loading }) {
  return (
    <>
      <style>{`
        .send-btn {
          font-size: 15px;
          background: var(--accent);
          color: #fff;
          padding: 0.8em 1.5em;
          display: inline-flex;
          align-items: center;
          border: none;
          border-radius: 12px;
          overflow: hidden;
          transition: all 0.2s;
          cursor: pointer;
          font-family: 'JetBrains Mono', monospace;
          width: 100%;
          justify-content: center;
          font-weight: 600;
        }
        .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .send-btn:active:not(:disabled) { transform: scale(0.98); }
        .send-btn span {
          display: block;
          margin-left: 0.5em;
          transition: transform 0.3s ease-in-out, opacity 0.2s ease-in-out;
        }
        .send-btn svg {
          display: block;
          transform-origin: center center;
          transition: transform 0.3s ease-in-out;
          flex-shrink: 0;
        }
        .send-btn:not(:disabled):hover .send-svg-wrapper {
          animation: send-fly 0.6s ease-in-out infinite alternate;
        }
        .send-btn:not(:disabled):hover svg {
          transform: translateX(1.1em) rotate(45deg) scale(1.1);
        }
        .send-btn:not(:disabled):hover span {
          transform: translateX(8em);
          opacity: 0;
        }
        @keyframes send-fly {
          from { transform: translateY(0.1em); }
          to   { transform: translateY(-0.1em); }
        }
      `}</style>

      <button type="submit" disabled={loading} className="send-btn">
        <div className="send-svg-wrapper">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
            <path fill="none" d="M0 0h24v24H0z" />
            <path
              fill="currentColor"
              d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
            />
          </svg>
        </div>
        <span>{loading ? "Sending..." : "Send Message"}</span>
      </button>
    </>
  );
}

export default function Contact() {
  const [form, setForm]         = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        const data = await res.json();
        setErrorMsg(data?.errors?.[0]?.message || "Something went wrong.");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    }
  }

  const inputStyle = {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    color: "var(--text)",
    width: "100%",
    borderRadius: "0.75rem",
    padding: "0.85rem 1rem",
    fontSize: "16px",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.2s ease-in-out",
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
      <motion.div
        className="max-w-6xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* LEFT — Text & Socials */}
          <div className="flex flex-col">
            <motion.div variants={fadeUp} className="mb-8">
              <p className="section-label mb-4">// what's next</p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight tracking-tight mb-6">
                Let's build <br />
                <span style={{ color: "var(--accent)" }}>something together.</span>
              </h2>
              <div className="glow-line mt-4 max-w-xs" />
            </motion.div>

            <motion.p variants={fadeUp} className="text-base sm:text-lg leading-relaxed mb-10 max-w-md" style={{ color: "var(--muted)" }}>
              Always happy to talk about full-stack roles, interesting projects or collaborations.
              Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </motion.p>

            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4 mt-auto">
              {links.map(({ label, handle, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className={`glass flex flex-col justify-center px-5 py-4 rounded-xl group transition-all duration-300 hover:-translate-y-1 min-w-0 ${label === "Email" ? "col-span-2" : ""}`}
                  style={{ border: "1px solid var(--border)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="mono text-xs" style={{ color: "var(--muted)" }}>{label}</span>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--accent)" }}>↗</span>
                  </div>
                  <span className="text-sm font-medium truncate group-hover:text-[var(--accent)] transition-colors">
                    {handle}
                  </span>
                </a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — Form */}
          <motion.div variants={fadeUp} className="relative w-full">
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-20 pointer-events-none translate-x-4 translate-y-4"
              style={{ background: "var(--accent)" }} />

            {status === "success" ? (
              <div
                className="glass rounded-2xl p-8 sm:p-12 text-center relative z-10 flex flex-col items-center justify-center min-h-[400px]"
                style={{ border: "1px solid rgba(74,222,128,0.3)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6"
                  style={{ background: "rgba(74,222,128,0.15)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                    stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Message Sent!</h3>
                <p className="text-base mb-8 max-w-xs mx-auto" style={{ color: "var(--muted)" }}>
                  Thanks for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="mono text-sm px-6 py-3 rounded-xl transition-colors hover:bg-[var(--glow)]"
                  style={{ color: "var(--text)", border: "1px solid var(--border)" }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="glass rounded-2xl p-6 sm:p-8 space-y-6 relative z-10 shadow-2xl"
                style={{ border: "1px solid var(--border-hard)", backdropFilter: "blur(20px)" }}
              >
                <div className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="mono text-xs font-semibold block mb-2" style={{ color: "var(--muted)" }}>// your name</label>
                      <input
                        type="text" name="name" required value={form.name}
                        onChange={handleChange} placeholder="John Doe"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 1px var(--accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                    <div>
                      <label className="mono text-xs font-semibold block mb-2" style={{ color: "var(--muted)" }}>// your email</label>
                      <input
                        type="email" name="email" required value={form.email}
                        onChange={handleChange} placeholder="john@example.com"
                        style={inputStyle}
                        onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 1px var(--accent)"; }}
                        onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mono text-xs font-semibold block mb-2" style={{ color: "var(--muted)" }}>// message</label>
                    <textarea
                      name="message" required rows={5} value={form.message}
                      onChange={handleChange} placeholder="What do you want to build?"
                      style={{ ...inputStyle, resize: "none" }}
                      onFocus={(e) => { e.target.style.borderColor = "var(--accent)"; e.target.style.boxShadow = "0 0 0 1px var(--accent)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "var(--border)"; e.target.style.boxShadow = "none"; }}
                    />
                  </div>
                </div>

                {status === "error" && (
                  <p className="mono text-xs text-red-400 p-3 rounded bg-red-500/10 border border-red-500/20">{errorMsg}</p>
                )}

                {status === "loading" ? (
                  <div className="flex justify-center py-2"><HeartbeatLoader size={0.6} /></div>
                ) : (
                  <SendButton loading={false} />
                )}
              </form>
            )}
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}