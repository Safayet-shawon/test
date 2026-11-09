"use client";
import { useEffect, useRef, useState } from "react";

// A conveyor belt tilted in perspective: the far end is narrow and dark, so businesses seem to come up from
// behind, grow as they approach and stop at the station (toward the website demo).
//   laptop / tablet: horizontal belt, far end on the LEFT, items travel left -> right
//   phone (<= 700px): a flat vertical reel with three rows (previous, current, next), text centred
// A small spring drives the motion; speed adds a mild lean + blur.
export default function Tape({ pos, item }) {
  const wrap = useRef(null);
  const list = useRef(null);
  const band = useRef(null);
  const posRef = useRef(pos);
  const wake = useRef(() => {});
  const [m, setM] = useState({ w: 240, px: 360, th: 80, v: false, ready: false });
  posRef.current = pos;

  useEffect(() => {
    const el = wrap.current;
    const measure = () => {
      // layout size, not the on-screen box: a 3D tilt on phones would otherwise shrink the height
      const r = { width: el.offsetWidth, height: el.offsetHeight };
      const v = window.innerWidth <= 700;
      if (v) {
        // three rows: previous, current (centred), next
        const pitch = r.height / 3;
        setM({ v, w: pitch, th: Math.min(56, pitch * 0.82), px: r.height / 2, ready: true });
      } else {
        const small = r.width < 460;
        setM({ v, w: small ? 168 : 240, th: 0, px: r.width * (small ? 0.6 : 0.62), ready: true });
      }
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
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
      const lean = clamp(v * -2.2, -7, 7); // mild velocity lean (horizontal only)
      const blur = Math.min(2.2, Math.abs(v) * 0.45);
      for (const el of kids) {
        const j = Number(el.dataset.j);
        const u = p - j; // u < 0: still to come (far)   u > 0: already passed
        if (m.v) {
          // phone: a flat reel. The next business waits below, the current one sits in the middle,
          // the previous one moves up and out.
          const a = Math.abs(u);
          const y = m.px - u * m.w - m.th / 2;
          el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0) scale(${(1 - 0.1 * clamp(a)).toFixed(3)})`;
          el.style.opacity = (a <= 1 ? 1 - 0.5 * a : 0.5 * clamp((1.6 - a) / 0.6)).toFixed(3);
          el.style.filter = "none";
          continue;
        }
        const pos1 = m.px + u * m.w;
        const lift = 30 * clamp(1 - Math.abs(u)); // the tile at the station rises slightly
        el.style.transform = m.v
          ? `translate3d(0, ${(pos1 - m.th / 2).toFixed(2)}px, ${8 + lift}px)`
          : `translate3d(${(pos1 - m.w / 2).toFixed(2)}px, -50%, ${8 + lift}px) skewX(${lean}deg)`;
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
      raf = 0;
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
      // stop once settled; a new position wakes it up again (see the effect below)
      if (p !== posRef.current || v !== 0) raf = requestAnimationFrame(tick);
    };
    wake.current = () => {
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    apply();
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      wake.current = () => {};
    };
  }, [m]);

  useEffect(() => {
    wake.current();
  }, [pos]);

  const js = [];
  for (let j = pos - 2; j <= pos + 5; j++) js.push(j);

  return (
    <div
      className="belt"
      ref={wrap}
      data-v={m.v ? "1" : undefined}
      style={{ "--w": `${m.w}px`, "--th": `${m.th}px` }}
      aria-label="Businesses we build websites for"
    >
      <div className="belt-3d">
        <div className="belt-band" ref={band} aria-hidden="true" />
        <div className="belt-list" ref={list}>
          {js.map((j) => {
            const it = item(j);
            return (
              <div key={j} data-j={j} className={`t-item ${j === pos ? "on" : ""}`} style={m.v ? undefined : { width: m.w - 14 }}>
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
