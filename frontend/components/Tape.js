"use client";
import { useEffect, useRef, useState } from "react";

// A flat conveyor belt tilted in perspective: the left end is far and narrow, so businesses seem to come up
// from behind, grow as they approach and stop at the station on the right (toward the website demo).
// A small spring drives the motion; speed adds a mild lean + blur.
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
      setM({ w: small ? 168 : 240, px: r.width * (small ? 0.6 : 0.62), ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!m.ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
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
        const u = p - j; // u < 0: still to come (far left, behind)   u > 0: already passed (right)
        const x = m.px + u * m.w;
        const lift = 30 * clamp(1 - Math.abs(u)); // the tile at the station rises slightly
        el.style.transform = `translate3d(${x - m.w / 2}px, -50%, ${8 + lift}px) skewX(${lean}deg)`;
        const fadeIn = clamp((u + 3.4) / 1.9); // emerges from the dark
        const fadeOut = clamp((1.9 - u) / 1.0); // leaves toward the demo
        el.style.opacity = (fadeIn * fadeOut).toFixed(3);
        const bright = u < 0 ? clamp(1 + u * 0.2, 0.3, 1) : clamp(1 - u * 0.35, 0.5, 1);
        el.style.filter = `brightness(${bright.toFixed(3)}) blur(${blur.toFixed(2)}px)`;
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
  for (let j = Math.max(0, pos - 2); j <= pos + 5; j++) js.push(j);

  return (
    <div className="belt" ref={wrap} style={{ "--w": `${m.w}px` }} aria-label="Businesses we build websites for">
      <div className="belt-3d">
        <div className="belt-band" ref={band} aria-hidden="true" />
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
      <div className="belt-fog" aria-hidden="true" />
    </div>
  );
}
