"use client";
import { useEffect, useRef, useState } from "react";

// Pendulum in simple harmonic motion: theta(t) = theta0 * cos(w t).
// Every turning point (end of each swing) reveals one of our projects.
const WORK = [
  { n: "EcomMS", s: "Microservice e-commerce", img: "/projects/microservice.webp" },
  { n: "tomadachis.com", s: "A complete pet ecosystem", img: "/projects/tomadachis.webp" },
  { n: "Architect Shakil", s: "A portfolio in motion", img: "/projects/architect.webp" },
  { n: "Single Dot Studio", s: "Interiors, estimated instantly", img: "/projects/singledot.webp" },
];
const PERIOD = 2.3; // seconds for one full swing there and back
const THETA0 = (30 * Math.PI) / 180;

export default function Intro() {
  const canvas = useRef(null);
  const root = useRef(null);
  const [n, setN] = useState(-1); // index of the latest turning point
  const [gone, setGone] = useState(false);
  const finish = useRef(() => {});

  useEffect(() => {
    const html = document.documentElement;
    const done = () => {
      html.classList.remove("intro-lock");
      try {
        sessionStorage.setItem("prixon-intro", "1");
      } catch {}
      window.dispatchEvent(new Event("prixon:intro-done"));
    };
    if (html.classList.contains("intro-skip") || !html.classList.contains("intro-lock")) {
      done();
      setGone(true);
      return;
    }

    const cv = canvas.current;
    const ctx = cv.getContext("2d");
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      exiting = false,
      lastN = -1;
    const trail = [];
    const ripples = [];
    const t0 = performance.now();
    const omega = (2 * Math.PI) / PERIOD;

    const size = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * dpr;
      cv.height = h * dpr;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
    };
    size();
    window.addEventListener("resize", size);
    const onKey = (e) => (e.key === "Escape" || e.key === "Enter" || e.key === " ") && exit();
    window.addEventListener("keydown", onKey);

    const exit = () => {
      if (exiting) return;
      exiting = true;
      root.current?.classList.add("exit");
      setTimeout(() => {
        done();
        setGone(true);
      }, 950);
    };
    finish.current = exit;

    const frame = (now) => {
      const t = (now - t0) / 1000;
      const phase = omega * t;
      const theta = THETA0 * Math.cos(phase);
      const k = Math.floor(phase / Math.PI + 1e-6); // turning-point counter
      if (k !== lastN) {
        lastN = k;
        setN(k);
        if (k >= WORK.length) setTimeout(exit, 450);
      }
      const px = w / 2;
      const py = h * 0.11;
      const L = Math.min(h * 0.54, w * 0.62);
      const bx = px + L * Math.sin(theta);
      const by = py + L * Math.cos(theta);
      if (k !== frame.k && k >= 0 && k < WORK.length) {
        frame.k = k;
        ripples.push({ x: bx, y: by, born: now });
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // faint guide arc
      ctx.strokeStyle = "rgba(255,255,255,0.07)";
      ctx.setLineDash([2, 8]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px, py, L, Math.PI / 2 - THETA0, Math.PI / 2 + THETA0);
      ctx.stroke();
      ctx.setLineDash([]);

      // purple trail
      trail.push({ x: bx, y: by });
      if (trail.length > 34) trail.shift();
      for (let i = 1; i < trail.length; i++) {
        const a = i / trail.length;
        ctx.strokeStyle = `rgba(166,74,201,${a * 0.55})`;
        ctx.lineWidth = 1 + a * 5;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
      }

      // ripple at every turning point
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const p = (now - r.born) / 900;
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(210,123,255,${0.7 * (1 - p)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(r.x, r.y, 10 + p * 70, 0, Math.PI * 2);
        ctx.stroke();
      }

      // ceiling bar, white string, pivot
      ctx.fillStyle = "#fff";
      ctx.fillRect(px - 46, py - 5, 92, 2);
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(px, py - 3);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(px, py - 3, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // small purple ball with glow
      const g = ctx.createRadialGradient(bx - 2.5, by - 2.5, 1, bx, by, 9);
      g.addColorStop(0, "#e2b3ff");
      g.addColorStop(0.45, "#a64ac9");
      g.addColorStop(1, "#5a21a3");
      ctx.shadowColor = "rgba(166,74,201,0.95)";
      ctx.shadowBlur = 26;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(frame);
    };
    frame.k = -1;
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  if (gone) return null;

  const cur = Math.min(Math.max(n, 0), WORK.length - 1);
  const slot = (parity) => {
    // latest turning point with this parity (even = right, odd = left)
    let idx = n - (((n % 2) + 2) % 2 === parity ? 0 : 1);
    return idx >= 0 && idx < WORK.length ? idx : -1;
  };
  const right = slot(0);
  const left = slot(1);

  return (
    <div className="pend" ref={root} onClick={() => finish.current()} role="presentation">
      <canvas ref={canvas} aria-hidden="true" />
      <p className="i-brand">
        prixon<i />
      </p>
      <p className="i-kick">Selected work</p>

      {[
        ["l", left],
        ["r", right],
      ].map(([side, idx]) =>
        idx >= 0 ? (
          <figure
            key={`${side}${idx}`}
            className={`ic ic-${side} ${idx === n ? "now" : "old"}`}
            style={{ backgroundImage: `url(${WORK[idx].img})` }}
          >
            <figcaption>
              <b>{String(idx + 1).padStart(2, "0")}</b> {WORK[idx].n}
            </figcaption>
          </figure>
        ) : null,
      )}

      {n >= 0 && n < WORK.length && (
        <h2 className="i-cap" key={n}>
          <span className="t">
            {WORK[cur].n.split("").map((c, i) => (
              <span key={i} className="l" style={{ "--l": i }}>
                {c === " " ? " " : c}
              </span>
            ))}
          </span>
          <em>{WORK[cur].s}</em>
        </h2>
      )}

      <p className="i-count">
        <span>{String(cur + 1).padStart(2, "0")}</span>/{String(WORK.length).padStart(2, "0")}
      </p>
      <button type="button" className="i-skip" onClick={(e) => (e.stopPropagation(), finish.current())}>
        Skip intro
      </button>
    </div>
  );
}
