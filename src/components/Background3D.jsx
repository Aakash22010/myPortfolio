import { useEffect, useRef } from "react";

function mat4Mul(a, b) {
  const r = new Float32Array(16);
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++)
      for (let k = 0; k < 4; k++)
        r[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
  return r;
}
function rotX(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return new Float32Array([1,0,0,0, 0,c,-s,0, 0,s,c,0, 0,0,0,1]);
}
function rotY(a) {
  const c = Math.cos(a), s = Math.sin(a);
  return new Float32Array([c,0,s,0, 0,1,0,0, -s,0,c,0, 0,0,0,1]);
}
function applyMat(m, [x, y, z]) {
  return [
    m[0]*x + m[1]*y + m[2]*z,
    m[4]*x + m[5]*y + m[6]*z,
    m[8]*x + m[9]*y + m[10]*z,
  ];
}
function project(x, y, z, fov, cx, cy) {
  const d = fov / (fov + z);
  return [cx + x * d, cy + y * d, d];
}

function buildIcosahedron(r) {
  const t = (1 + Math.sqrt(5)) / 2;
  const verts = [
    [-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],
    [0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],
    [t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1],
  ].map(([x,y,z]) => {
    const len = Math.sqrt(x*x+y*y+z*z);
    return [x/len*r, y/len*r, z/len*r];
  });
  const faces = [
    [0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],
    [1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],
    [3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],
    [4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1],
  ];
  const edgeSet = new Set();
  const edges = [];
  faces.forEach(([a,b,c]) => {
    [[a,b],[b,c],[a,c]].forEach(([u,v]) => {
      const key = Math.min(u,v)+"_"+Math.max(u,v);
      if (!edgeSet.has(key)) { edgeSet.add(key); edges.push([u,v]); }
    });
  });
  return { verts, edges, faces };
}

function buildInnerLines(verts, faces, r) {
  const lines = [];
  faces.forEach(([a,b,c]) => {
    const mid = (va, vb) => {
      const m = [(va[0]+vb[0])/2,(va[1]+vb[1])/2,(va[2]+vb[2])/2];
      const len = Math.sqrt(m[0]**2+m[1]**2+m[2]**2);
      return [m[0]/len*r*0.6, m[1]/len*r*0.6, m[2]/len*r*0.6];
    };
    lines.push(
      [mid(verts[a],verts[b]), mid(verts[b],verts[c])],
      [mid(verts[b],verts[c]), mid(verts[a],verts[c])],
      [mid(verts[a],verts[b]), mid(verts[a],verts[c])],
    );
  });
  return lines;
}

function accentAlpha(accentRaw, a) {
  const hex = accentRaw.replace("#", "");
  if (hex.length === 6) {
    const r = parseInt(hex.slice(0,2),16);
    const g = parseInt(hex.slice(2,4),16);
    const b = parseInt(hex.slice(4,6),16);
    return `rgba(${r},${g},${b},${a})`;
  }
  return accentRaw;
}

// Fixed radius — same on every device
const RADIUS = 220;

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    let targetTiltX = 0, targetTiltY = 0;
    let tiltX = 0, tiltY = 0;
    let autoAngle = 0;
    let rafId;

    const geo        = buildIcosahedron(RADIUS);
    const innerLines = buildInnerLines(geo.verts, geo.faces, RADIUS);

    canvas.width  = W;
    canvas.height = H;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
    }

    function onMouse(e) {
      targetTiltY =  ((e.clientX / W) - 0.5) * 0.9;
      targetTiltX = -((e.clientY / H) - 0.5) * 0.9;
    }
    function onTouch(e) {
      const t = e.touches[0];
      targetTiltY =  ((t.clientX / W) - 0.5) * 0.9;
      targetTiltX = -((t.clientY / H) - 0.5) * 0.9;
    }

    window.addEventListener("resize",    resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });

    function isDark() {
      return document.documentElement.getAttribute("data-theme") === "dark";
    }
    function getCSSVar(v) {
      return getComputedStyle(document.documentElement).getPropertyValue(v).trim();
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);

      tiltX += (targetTiltX - tiltX) * 0.05;
      tiltY += (targetTiltY - tiltY) * 0.05;
      autoAngle += 0.003;

      const mat = mat4Mul(rotY(autoAngle + tiltY), rotX(tiltX));
      // Always dead center, every device
      const cx  = W * 0.5;
      const cy  = H * 0.5;
      const fov = W * 0.9;

      const accentRaw = getCSSVar("--accent") || "#0fa4af";
      const dark = isDark();

      const vigR = RADIUS * 3;
      const vig  = ctx.createRadialGradient(cx, cy, 0, cx, cy, vigR);
      if (dark) {
        vig.addColorStop(0,    "rgba(4,13,14,0.82)");
        vig.addColorStop(0.45, "rgba(4,13,14,0.40)");
        vig.addColorStop(1,    "rgba(4,13,14,0.0)");
      } else {
        vig.addColorStop(0,    "rgba(214,238,242,0.88)");
        vig.addColorStop(0.45, "rgba(214,238,242,0.42)");
        vig.addColorStop(1,    "rgba(214,238,242,0.0)");
      }
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      const projected = geo.verts.map(v => {
        const [rx,ry,rz] = applyMat(mat, v);
        return project(rx, ry, rz, fov, cx, cy);
      });
      const projInner = innerLines.map(([a,b]) => [
        project(...applyMat(mat, a), fov, cx, cy),
        project(...applyMat(mat, b), fov, cx, cy),
      ]);

      ctx.lineWidth = 0.4;
      projInner.forEach(([pa, pb]) => {
        const depth = (pa[2] + pb[2]) / 2;
        ctx.strokeStyle = accentAlpha(accentRaw, depth * 0.1);
        ctx.beginPath(); ctx.moveTo(pa[0], pa[1]); ctx.lineTo(pb[0], pb[1]); ctx.stroke();
      });

      geo.edges.forEach(([i, j]) => {
        const [px1,py1,d1] = projected[i];
        const [px2,py2,d2] = projected[j];
        const depth = (d1 + d2) / 2;
        ctx.lineWidth = 0.6 + depth * 1.0;
        ctx.strokeStyle = accentAlpha(accentRaw, 0.12 + depth * 0.45);
        ctx.beginPath(); ctx.moveTo(px1, py1); ctx.lineTo(px2, py2); ctx.stroke();
      });

      projected.forEach(([px, py, d]) => {
        const r     = 1.5 + d * 2.5;
        const alpha = 0.18 + d * 0.5;
        const grad  = ctx.createRadialGradient(px,py,0,px,py,r*3);
        grad.addColorStop(0, accentAlpha(accentRaw, alpha * 0.45));
        grad.addColorStop(1, accentAlpha(accentRaw, 0));
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(px, py, r*3, 0, Math.PI*2); ctx.fill();
        ctx.fillStyle = accentAlpha(accentRaw, alpha);
        ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI*2); ctx.fill();
      });

      rafId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
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