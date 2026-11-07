"use client";
import { useEffect, useRef, useState } from "react";

// A curved, segmented conveyor belt. Businesses emerge from the dark at the far left and sweep to the
// right, toward the website demo. A small spring drives the motion; speed adds a mild lean + blur.
const STEP_DEG = 22; // curvature: angle between neighbouring tiles

export default function Tape({ pos, item }) {
  const wrap = useRef(null);
  const list = useRef(null);
  const posRef = useRef(pos);
  const [m, setM] = useState({ w: 240, px: 360, ready: false });
  posRef.current = pos;

  useEffect(() => {
    const el = wrap.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const small = r.width < 460;
      setM({ w: small ? 168 : 236, px: r.width * (small ? 0.62 : 0.6), ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!m.ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rad = (STEP_DEG * Math.PI) / 180;
    const R = (m.w * 1.04) / (2 * Math.sin(rad / 2)); // radius so neighbours touch
    let p = posRef.current;
    let v = 0;
    let last = performance.now();
    let raf = 0;
    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));

    const apply = () => {
      const kids = list.current?.children;
      if (!kids) return;
      const lean = clamp(v * -2.2, -7, 7); // mild velocity lean
      const blur = Math.min(2.2, Math.abs(v) * 0.45);
      for (const el of kids) {
        const j = Number(el.dataset.j);
        const u = p - j; // u < 0: still to come (left, far)   u > 0: already passed (right)
        const phi = u * rad;
        const x = m.px + R * Math.sin(phi);
        const z = -R + R * Math.cos(phi);
        el.style.transform = `translate3d(${x - m.w / 2}px, -50%, ${z}px) rotateY(${(phi * 180) / Math.PI}deg) skewX(${lean}deg)`;
        const fadeIn = clamp((u + 3.1) / 1.7); // emerges from the dark
        const fadeOut = clamp((1.9 - u) / 1.0); // leaves toward the demo
        el.style.opacity = (fadeIn * fadeOut).toFixed(3);
        const bright = u < 0 ? clamp(1 + u * 0.24, 0.28, 1) : clamp(1 - u * 0.35, 0.5, 1);
        el.style.filter = `brightness(${bright.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
        el.style.zIndex = String(100 - Math.round(Math.abs(u) * 10));
      }
    };

    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const target = posRef.current;
      if (reduce) {
        p = target;
        v = 0;
      } else {
        const k = 120; // snappy, slightly underdamped: a quick settle with a hint of overshoot
        const c = 2 * Math.sqrt(k) * 0.78;
        v += (k * (target - p) - c * v) * dt;
        p += v * dt;
        if (Math.abs(target - p) < 0.0008 && Math.abs(v) < 0.004) {
          p = target;
          v = 0;
        }
      }
      apply();
      raf = requestAnimationFrame(tick);
    };
    apply();
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [m]);

  const js = [];
  for (let j = Math.max(0, pos - 2); j <= pos + 4; j++) js.push(j);

  return (
    <div className="belt" ref={wrap} style={{ "--w": `${m.w}px`, perspectiveOrigin: `${m.px}px 50%` }} aria-label="Businesses we build websites for">
      <div className="belt-list" ref={list}>
        {js.map((j) => {
          const it = item(j);
          return (
            <div key={j} data-j={j} className={`t-item ${j === pos ? "on" : ""}`} style={{ width: m.w - 14 }}>
              <span className="no">{it.no}</span>
              <b className="cat">{it.cat}</b>
              <small>{it.sub}</small>
            </div>
          );
        })}
      </div>
    </div>
  );
}
