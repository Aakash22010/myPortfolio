import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../animations";
import { useState } from "react";
import HeartbeatLoader from "./HeartbeatLoader";

const FORMSPREE_ID = "mpqynwqj";

const links = [
  { label: "GitHub",   handle: "@Aakash22010",             href: "https://github.com/Aakash22010" },
  { label: "LinkedIn", handle: "aakashdahiya167",           href: "https://www.linkedin.com/in/aakashdahiya167/" },
  { label: "Email",    handle: "aakashdahiya167@gmail.com", href: "mailto:aakashdahiya167@gmail.com" },
];

function SendButton({ loading }) {
  return (
    <>
      <style>{`
        .send-btn {
          font-size: 15px;
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
          font-family: 'JetBrains Mono', monospace;
          width: 100%;
          justify-content: center;
        }
        @media (min-width: 480px) {
          .send-btn { width: auto; }
        }
        .send-btn:disabled { opacity: 0.7; cursor: not-allowed; }
        .send-btn:active:not(:disabled) { transform: scale(0.95); }
        .send-btn span {
          display: block;
          margin-left: 0.4em;
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
        <span>{loading ? "Sending..." : "Send me an email"}</span>
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
    padding: "0.75rem 1rem",
    fontSize: "0.875rem",
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 0.2s",
    // Prevent zoom on iOS when font-size < 16px
    WebkitTextSizeAdjust: "100%",
  };

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6">
      <motion.div
        className="max-w-3xl mx-auto"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
          <p className="section-label mb-2">// let's talk</p>
          <h2 className="text-3xl md:text-4xl font-bold">Get In Touch</h2>
          <div className="glow-line mt-4 max-w-xs" />
        </motion.div>

        <motion.p variants={fadeUp} className="text-sm sm:text-base leading-relaxed mb-8 sm:mb-10" style={{ color: "var(--muted)" }}>
          Open to internships, collaborations, freelance work, and interesting problems.
          Fill out the form and I'll get back to you as soon as I can.
        </motion.p>

        {/* SOCIAL LINKS */}
        <motion.div variants={fadeUp} className="space-y-2 sm:space-y-3 mb-8 sm:mb-10">
          {links.map(({ label, handle, href }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="glass flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 rounded-xl group transition"
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--border-hard)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <span className="mono text-xs shrink-0 w-14 sm:w-16" style={{ color: "var(--muted)" }}>
                  {label}
                </span>
                <span className="text-xs sm:text-sm font-medium truncate">{handle}</span>
              </div>
              <span className="mono text-sm shrink-0 ml-2" style={{ color: "var(--accent)" }}>↗</span>
            </a>
          ))}
        </motion.div>

        {/* FORM / SUCCESS */}
        <motion.div variants={fadeUp}>
          {status === "success" ? (
            <div
              className="glass rounded-2xl p-6 sm:p-8 text-center"
              style={{ border: "1px solid rgba(74,222,128,0.3)" }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: "rgba(74,222,128,0.15)" }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">Message sent!</h3>
              <p className="text-sm mb-6" style={{ color: "var(--muted)" }}>
                Thanks for reaching out. I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mono text-xs px-4 py-2 rounded-lg transition"
                style={{ background: "var(--glow)", color: "var(--accent)", border: "1px solid var(--border)" }}
              >
                Send another →
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-5 sm:p-8 space-y-4 sm:space-y-5"
              style={{ border: "1px solid var(--border)" }}
            >
              {/* Name + Email: stacked on mobile, side-by-side on sm+ */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mono text-xs block mb-1.5" style={{ color: "var(--muted)" }}>name *</label>
                  <input
                    type="text" name="name" required value={form.name}
                    onChange={handleChange} placeholder="Your name"
                    style={{ ...inputStyle, fontSize: "16px" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
                <div>
                  <label className="mono text-xs block mb-1.5" style={{ color: "var(--muted)" }}>email *</label>
                  <input
                    type="email" name="email" required value={form.email}
                    onChange={handleChange} placeholder="your@email.com"
                    style={{ ...inputStyle, fontSize: "16px" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>
              </div>

              <div>
                <label className="mono text-xs block mb-1.5" style={{ color: "var(--muted)" }}>message *</label>
                <textarea
                  name="message" required rows={5} value={form.message}
                  onChange={handleChange} placeholder="What's on your mind?"
                  style={{ ...inputStyle, resize: "none", fontSize: "16px" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>

              {status === "error" && (
                <p className="mono text-xs text-red-400">{errorMsg}</p>
              )}

              {status === "loading" && <HeartbeatLoader size={0.6} />}

              {status !== "loading" && <SendButton loading={false} />}
            </form>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}