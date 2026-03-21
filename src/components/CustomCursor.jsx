import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let ringX  = mouseX;
    let ringY  = mouseY;
    let rafId;
    let isHovering = false;

    function animate() {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      dot.style.transform  = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(animate);
    }

    function onMove(e) { mouseX = e.clientX; mouseY = e.clientY; }

    function onEnter() {
      isHovering = true;
      ring.style.width   = "48px";
      ring.style.height  = "48px";
      ring.style.opacity = "0.5";
      dot.style.opacity  = "0";
    }
    function onLeave() {
      isHovering = false;
      ring.style.width   = "32px";
      ring.style.height  = "32px";
      ring.style.opacity = "0.6";
      dot.style.opacity  = "1";
    }
    function onDown() {
      ring.style.width  = isHovering ? "36px" : "20px";
      ring.style.height = isHovering ? "36px" : "20px";
    }
    function onUp() {
      ring.style.width  = isHovering ? "48px" : "32px";
      ring.style.height = isHovering ? "48px" : "32px";
    }

    const hoverEls = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, label[for]"
    );
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    dot.style.opacity  = "1";
    ring.style.opacity = "0.6";
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      hoverEls.forEach(el => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  if (typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      <style>{`
        body { cursor: none; }
        a, button, [role="button"], input, textarea, select { cursor: none; }

        .cursor-dot {
          position: fixed;
          top: 0; left: 0;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--accent);
          pointer-events: none;
          z-index: 99999;
          opacity: 0;
          transition: opacity 0.2s;
          will-change: transform;
          box-shadow: 0 0 6px var(--accent);
        }

        .cursor-ring {
          position: fixed;
          top: 0; left: 0;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1.5px solid var(--accent);
          pointer-events: none;
          z-index: 99998;
          opacity: 0;
          transition: width 0.25s ease, height 0.25s ease, opacity 0.2s;
          will-change: transform;
        }
      `}</style>

      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}