import { useEffect, useRef, useState } from "react";
import { sampleImage, PHOTO, PHOTO_ASPECT } from "./sampleImage";

const COLS = 64;

// Same shape for the revealed photo: full circle (width-sized, touching the bottom)
// plus everything above the circle's centre
const CY = `${(1 - 0.5 / PHOTO_ASPECT) * 100}%`;
const CIRCLE_BOTTOM_MASK = {
  maskImage: `radial-gradient(circle closest-side at 50% ${CY}, #000 99.5%, transparent 100%), linear-gradient(#000, #000)`,
  maskSize: `100% 100%, 100% ${CY}`,
  maskPosition: "center, top",
  maskRepeat: "no-repeat",
  WebkitMaskImage: `radial-gradient(circle closest-side at 50% ${CY}, #000 99.5%, transparent 100%), linear-gradient(#000, #000)`,
  WebkitMaskSize: `100% 100%, 100% ${CY}`,
  WebkitMaskPosition: "center, top",
  WebkitMaskRepeat: "no-repeat",
};
const ROWS = Math.round(COLS * PHOTO_ASPECT);

export default function DotsPhoto() {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const [reveal, setReveal] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    const ctx = canvas.getContext("2d");
    let dots = [];
    let raf = 0, visible = true, frame = 0, accent = "#f59e0b", repel = 90;
    const pointer = { x: -9999, y: -9999 };

    function layout(grid) {
      const dpr = window.devicePixelRatio || 1;
      const w = wrap.clientWidth, h = w * PHOTO_ASPECT;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = `${w}px`; canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cell = w / COLS;
      repel = w * 0.18; // scatter radius scales with the portrait
      // Circle spans the full width and touches the bottom edge. Below its centre only
      // dots inside the circle are kept (rounded bottom); above it the head breaks out.
      const R = w / 2, cx = w / 2, cy = h - R;
      dots = [];
      grid.forEach((raw, i) => {
        let v = raw;
        if (v === null) return;
        v = Math.pow(v, 1.5); // push midtones down so features read
        if (v < 0.04) return;
        const hx = (i % COLS + 0.5) * cell, hy = (Math.floor(i / COLS) + 0.5) * cell;
        if (hy > cy && Math.hypot(hx - cx, hy - cy) > R - cell * 0.4) return;
        // start scattered so the portrait assembles on load
        dots.push({ hx, hy, x: hx + (Math.random() - 0.5) * w, y: hy + (Math.random() - 0.5) * h, vx: 0, vy: 0, r: cell * 0.5 * (0.25 + 0.75 * v) });
      });
    }

    function tick() {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (frame++ % 30 === 0) accent = getComputedStyle(wrap).getPropertyValue("--accent").trim() || accent;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = accent;
      for (const d of dots) {
        const dx = d.x - pointer.x, dy = d.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < repel && dist > 0.01) {
          const f = (1 - dist / repel) * 2.6;
          d.vx += (dx / dist) * f; d.vy += (dy / dist) * f;
        }
        d.vx = (d.vx + (d.hx - d.x) * 0.06) * 0.82;
        d.vy = (d.vy + (d.hy - d.y) * 0.06) * 0.82;
        d.x += d.vx; d.y += d.vy;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let grid = null;
    sampleImage(PHOTO, COLS, ROWS).then((g) => { grid = g; layout(g); tick(); });

    const ro = new ResizeObserver(() => grid && layout(grid));
    ro.observe(wrap);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(wrap);

    const move = (e) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left; pointer.y = e.clientY - r.top;
    };
    const leave = () => { pointer.x = pointer.y = -9999; };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("pointerdown", move);
    canvas.addEventListener("pointerleave", leave);
    canvas.addEventListener("pointerup", (e) => e.pointerType !== "mouse" && leave());

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerdown", move);
      canvas.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    // As large as fits in the hero: full height under the navbar on desktop (capped so the
    // name column keeps room), edge to edge on phones
    <div
      ref={wrapRef}
      className="relative w-screen md:w-[min(52vw,calc((100svh-124px)/1.154),820px)]"
      style={{ aspectRatio: `1 / ${PHOTO_ASPECT}`, touchAction: "pan-y" }}
      onClick={() => setReveal((r) => !r)}
    >
      <img
        src={PHOTO} alt="Aakash Dahiya"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: reveal ? 1 : 0, ...CIRCLE_BOTTOM_MASK }}
      />
      <canvas ref={canvasRef} className="relative transition-opacity duration-700" style={{ opacity: reveal ? 0 : 1 }} />
    </div>
  );
}
