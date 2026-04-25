import { useEffect, useRef } from "react";

function getCSSVar(v) {
  return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
}
function hexToRgb(hex) {
  const h = hex.replace("#", "");
  if (h.length !== 6) return [15, 164, 175];
  return [parseInt(h.slice(0,2),16), parseInt(h.slice(2,4),16), parseInt(h.slice(4,6),16)];
}
function accentAlpha(accentRaw, a) {
  const [r,g,b] = hexToRgb(accentRaw);
  return `rgba(${r},${g},${b},${a})`;
}

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    let ripples = [];
    let rafId;
    let autoTimer;

    function addRipple(x, y) {
      ripples.push({ x, y, r: 0, maxR: Math.max(W, H) * 0.6, alpha: 0.5, speed: 2.5 });
    }

    // auto ripples at random positions
    function autoRipple() {
      addRipple(Math.random() * W, Math.random() * H);
      autoTimer = setTimeout(autoRipple, 1800 + Math.random() * 2000);
    }
    autoRipple();

    function onClick(e) { addRipple(e.clientX, e.clientY); }
    function onTouch(e) { addRipple(e.touches[0].clientX, e.touches[0].clientY); }

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
    }

    window.addEventListener("resize", resize);
    window.addEventListener("click", onClick);
    window.addEventListener("touchstart", onTouch, { passive: true });

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const accent = getCSSVar("--accent") || "#0fa4af";

      ripples = ripples.filter(rp => rp.alpha > 0.01);

      ripples.forEach(rp => {
        rp.r += rp.speed;
        rp.alpha *= 0.975;

        // draw 3 concentric rings per ripple for depth
        for (let i = 0; i < 3; i++) {
          const offset = i * 18;
          const r = rp.r - offset;
          if (r < 0) continue;
          const alpha = rp.alpha * (1 - i * 0.3);
          ctx.beginPath();
          ctx.arc(rp.x, rp.y, r, 0, Math.PI * 2);
          ctx.strokeStyle = accentAlpha(accent, alpha * 0.4);
          ctx.lineWidth = 1 - i * 0.25;
          ctx.stroke();
        }
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(autoTimer);
      window.removeEventListener("resize", resize);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%", height: "100%",
        pointerEvents: "none",
        zIndex: 0,
        opacity: 0.75,
      }}
    />
  );
}
