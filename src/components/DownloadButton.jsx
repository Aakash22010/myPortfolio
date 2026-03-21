import { useState, useRef } from "react";

export default function DownloadButton({ href, label = "resume.pdf", className = "", compact = false }) {
  const [state, setState] = useState("idle"); // idle | downloading | complete
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  function handleClick() {
    if (state !== "idle") return;
    setState("downloading");
    setProgress(0);

    let p = 0;
    intervalRef.current = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(intervalRef.current);
        setState("complete");
        setTimeout(() => {
          setState("idle");
          setProgress(0);
        }, 2500);
      }
    }, 80);
  }

  const isDownloading = state === "downloading";
  const isComplete    = state === "complete";

  // compact = navbar pill; non-compact = hero / mobile CTA button
  const base = compact
    ? "relative flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs mono overflow-hidden transition-all duration-300"
    : "group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm mono overflow-hidden transition-all duration-300 glass";

  return (
    <a
      href={href}
      download
      onClick={handleClick}
      className={`${base} ${className}`}
      style={{
        color: isComplete ? "#fff" : "var(--accent)",
        border: compact ? "1px solid var(--border)" : "1px solid var(--border-hard)",
        cursor: state !== "idle" ? "default" : "pointer",
        // Ensure label is centered when className adds justify-center
        justifyContent: className.includes("justify-center") ? "center" : undefined,
      }}
    >
      {/* PROGRESS FILL */}
      <span
        className="absolute inset-0 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          background: "var(--accent)",
          opacity: isDownloading || isComplete ? 1 : 0,
          zIndex: 0,
        }}
      />

      {/* IDLE */}
      {state === "idle" && (
        <svg
          className={`shrink-0 relative z-10 transition-transform duration-300 ${!compact ? "group-hover:translate-y-0.5" : ""}`}
          style={{ width: compact ? "12px" : "14px", height: compact ? "12px" : "14px" }}
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M12 15V3" />
          <path d="M7 10l5 5 5-5" />
          <path d="M20 21H4" />
        </svg>
      )}

      {/* DOWNLOADING */}
      {isDownloading && (
        <svg
          className="shrink-0 relative z-10 animate-bounce"
          style={{ width: compact ? "12px" : "14px", height: compact ? "12px" : "14px", color: "#fff" }}
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="7 13 12 18 17 13" />
          <line x1="12" y1="18" x2="12" y2="6" />
        </svg>
      )}

      {/* COMPLETE */}
      {isComplete && (
        <svg
          className="shrink-0 relative z-10"
          style={{ width: compact ? "12px" : "14px", height: compact ? "12px" : "14px", color: "#fff" }}
          viewBox="0 0 24 24" fill="none"
          stroke="currentColor" strokeWidth="2.5"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}

      {/* LABEL */}
      <span
        className="relative z-10 transition-colors duration-200"
        style={{ color: isDownloading || isComplete ? "#fff" : "var(--accent)" }}
      >
        {isComplete ? "Downloaded!" : label}
      </span>
    </a>
  );
}