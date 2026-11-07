"use client";
import { useEffect, useRef, useState } from "react";

// One continuous, gently curved conveyor belt. The belt surface is built from thin slices that all follow
// the same arc, so it reads as a single connected 3D surface; the business tiles ride on it.
// Tiles emerge from the dark at the far left and sweep right toward the website demo.
const STEP_DEG = 11; // curvature: arc angle per tile width (small = gentle)
const SLICE = 12; // px width of one belt slice
const SLICES = 96;

export default function Tape({ pos, item }) {
  const wrap = useRef(null);
  const list = useRef(null);
  const band = useRef(null);
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
    const R = m.w / rad; // arc radius: one tile width = STEP_DEG degrees
    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
    const fade = (u) => clamp((u + 3.1) / 1.7) * clamp((1.9 - u) / 1.0); // dark far left, gone past the station
    const shade = (u) => (u < 0 ? clamp(1 + u * 0.24, 0.28, 1) : clamp(1 - u * 0.35, 0.5, 1));

    // static belt: slices laid along the arc, from the far left to just past the station
    const slices = band.current?.children;
    const startArc = -3.0 * m.w;
    if (slices) {
      for (let k = 0; k < slices.length; k++) {
        const s = startArc + k * SLICE; // arc coordinate relative to the station
        const phi = s / R;
        const u = s / m.w;
        const el = slices[k];
        el.style.setProperty("--a", `${s}px`);
        el.style.transform = `translate3d(${m.px + R * Math.sin(phi) - SLICE / 2}px, 0, ${-R + R * Math.cos(phi)}px) rotateY(${(phi * 180) / Math.PI}deg)`;
        el.style.opacity = fade(u).toFixed(3);
        el.style.filter = `brightness(${shade(u).toFixed(3)})`;
      }
    }

    let p = posRef.current;
    let v = 0;
    let last = performance.now();
    let raf = 0;
    const apply = () => {
      band.current?.style.setProperty("--shift", `${(p * m.w).toFixed(2)}px`); // treads travel with the tiles
      const kids = list.current?.children;
      if (!kids) return;
      const lean = clamp(v * -2.2, -7, 7); // mild velocity lean
      const blur = Math.min(2.2, Math.abs(v) * 0.45);
      for (const el of kids) {
        const j = Number(el.dataset.j);
        const u = p - j; // u < 0: still to come (left, far)   u > 0: already passed (right)
        const phi = u * rad;
        const x = m.px + R * Math.sin(phi);
        const z = -R + R * Math.cos(phi) + 8 + 26 * clamp(1 - Math.abs(u)); // sits on the belt; lifts at the station
        el.style.transform = `translate3d(${x - m.w / 2}px, -50%, ${z}px) rotateY(${(phi * 180) / Math.PI}deg) skewX(${lean}deg)`;
        el.style.opacity = fade(u).toFixed(3);
        el.style.filter = `brightness(${shade(u).toFixed(3)}) blur(${blur.toFixed(2)}px)`;
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
        const k = 120; // snappy, slightly underdamped
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
      <div className="belt-3d">
        <div className="belt-band" ref={band} aria-hidden="true">
          {Array.from({ length: SLICES }, (_, k) => (
            <i key={k} className="bs" style={{ width: SLICE + 1 }} />
          ))}
        </div>
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
    </div>
  );
}
