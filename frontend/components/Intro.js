"use client";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./Icons";

// Pendulum in simple harmonic motion: theta(t) = theta0 * cos(w t).
// Every turning point (end of each swing) presents one of our projects.
const WORK = [
  {
    n: "EcomMS",
    s: "Microservice e-commerce",
    tags: "SaaS · Storefront + admin",
    img: "/projects/microservice.webp",
    link: null,
  },
  {
    n: "tomadachis.com",
    s: "A complete pet ecosystem",
    tags: "Website · Shop, vet care, adopt",
    img: "/projects/tomadachis.webp",
    bg: "#fff6f8", // the screenshot is wide: fill below it with the site's own page colour
    link: "https://tomadachis.com",
  },
  {
    n: "Architect Shakil",
    s: "A portfolio in motion",
    tags: "Portfolio · Next.js + NestJS",
    img: "/projects/architect.webp",
    link: null,
  },
  {
    n: "Single Dot Studio",
    s: "Interiors, estimated instantly",
    tags: "Website · Calculator + admin",
    img: "/projects/singledot.webp",
    link: "https://singledotstudio.com",
  },
];
const PERIOD = 2.4; // seconds for one full swing there and back
const THETA0 = (26 * Math.PI) / 180;

export default function Intro() {
  const canvas = useRef(null);
  const root = useRef(null);
  const paused = useRef(false);
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
      lastN = -1,
      t = 0,
      last = performance.now();
    const trail = [];
    const ripples = [];
    const dust = Array.from({ length: 46 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.4 + Math.random() * 1.3,
      v: 0.012 + Math.random() * 0.03,
      a: 0.06 + Math.random() * 0.16,
    }));
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

    const exit = () => {
      if (exiting) return;
      exiting = true;
      root.current?.classList.add("exit");
      setTimeout(() => {
        done();
        setGone(true);
      }, 1000);
    };
    finish.current = exit;
    const onKey = (e) => (e.key === "Escape" || e.key === "Enter" || e.key === " ") && exit();
    window.addEventListener("keydown", onKey);

    const frame = (now) => {
      if (!paused.current) t += (now - last) / 1000; // hovering a card pauses the pendulum
      last = now;
      const phase = omega * t;
      const theta = THETA0 * Math.cos(phase);
      const k = Math.floor(phase / Math.PI + 1e-6); // turning-point counter
      if (k !== lastN) {
        lastN = k;
        setN(k);
        if (k >= WORK.length) setTimeout(exit, 500);
      }
      const px = w / 2;
      const py = h * 0.12;
      const L = Math.min(h * 0.52, w * 0.6);
      const bx = px + L * Math.sin(theta);
      const by = py + L * Math.cos(theta);
      const floorY = py + L + Math.max(40, h * 0.055);
      if (k !== frame.k && k >= 0 && k < WORK.length) {
        frame.k = k;
        ripples.push({ x: bx, y: by, born: now });
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      // overhead lamp: soft violet light falling from the pivot
      const lamp = ctx.createRadialGradient(px, py - 40, 0, px, py - 40, h * 0.95);
      lamp.addColorStop(0, "rgba(139,72,255,0.20)");
      lamp.addColorStop(0.45, "rgba(120,50,200,0.07)");
      lamp.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = lamp;
      ctx.fillRect(0, 0, w, h);

      // drifting dust in the light
      for (const d of dust) {
        d.y -= d.v * 0.016;
        if (d.y < -0.02) d.y = 1.02;
        const dx = d.x * w + Math.sin((now / 1800) + d.x * 9) * 6;
        const near = 1 - Math.min(1, Math.abs(dx - px) / (w * 0.5));
        ctx.fillStyle = `rgba(230,200,255,${d.a * (0.35 + near * 0.65)})`;
        ctx.beginPath();
        ctx.arc(dx, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // floor line + the ball's pool of light
      const fl = ctx.createLinearGradient(w * 0.12, 0, w * 0.88, 0);
      fl.addColorStop(0, "rgba(255,255,255,0)");
      fl.addColorStop(0.5, "rgba(255,255,255,0.22)");
      fl.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = fl;
      ctx.fillRect(w * 0.12, floorY, w * 0.76, 1);
      ctx.save();
      ctx.translate(bx, floorY);
      ctx.scale(1, 0.1);
      const pool = ctx.createRadialGradient(0, 0, 0, 0, 0, 120);
      pool.addColorStop(0, "rgba(190,110,255,0.55)");
      pool.addColorStop(1, "rgba(190,110,255,0)");
      ctx.fillStyle = pool;
      ctx.beginPath();
      ctx.arc(0, 0, 120, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // guide arc
      ctx.strokeStyle = "rgba(255,255,255,0.08)";
      ctx.setLineDash([2, 9]);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(px, py, L, Math.PI / 2 - THETA0, Math.PI / 2 + THETA0);
      ctx.stroke();
      ctx.setLineDash([]);

      // violet trail
      trail.push({ x: bx, y: by });
      if (trail.length > 40) trail.shift();
      ctx.lineCap = "round";
      for (let i = 1; i < trail.length; i++) {
        const a = i / trail.length;
        ctx.strokeStyle = `rgba(176,96,255,${a * 0.6})`;
        ctx.lineWidth = 0.8 + a * 5;
        ctx.beginPath();
        ctx.moveTo(trail[i - 1].x, trail[i - 1].y);
        ctx.lineTo(trail[i].x, trail[i].y);
        ctx.stroke();
      }

      // ripples at each turning point
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        const p = (now - r.born) / 1100;
        if (p >= 1) {
          ripples.splice(i, 1);
          continue;
        }
        for (const off of [0, 0.18]) {
          const q = Math.max(0, p - off);
          ctx.strokeStyle = `rgba(215,150,255,${0.65 * (1 - q)})`;
          ctx.lineWidth = 1.2;
          ctx.beginPath();
          ctx.arc(r.x, r.y, 8 + q * 90, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // mount, white string, ball
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      ctx.fillRect(px - 70, py - 9, 140, 1);
      ctx.strokeStyle = "#fff";
      ctx.shadowColor = "rgba(255,255,255,0.45)";
      ctx.shadowBlur = 6;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(px, py - 4);
      ctx.lineTo(bx, by);
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(px, py - 5, 3.2, 0, Math.PI * 2);
      ctx.fillStyle = "#000";
      ctx.fill();
      ctx.stroke();

      const g = ctx.createRadialGradient(bx - 2.4, by - 2.6, 0.5, bx, by, 8);
      g.addColorStop(0, "#f2d9ff");
      g.addColorStop(0.4, "#b05cf0");
      g.addColorStop(1, "#5a21a3");
      ctx.shadowColor = "rgba(176,96,255,1)";
      ctx.shadowBlur = 30;
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.fillStyle = "rgba(255,255,255,0.85)";
      ctx.beginPath();
      ctx.arc(bx - 2.2, by - 2.4, 1.3, 0, Math.PI * 2);
      ctx.fill();

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
    const idx = n - (((n % 2) + 2) % 2 === parity ? 0 : 1);
    return idx >= 0 && idx < WORK.length ? idx : -1;
  };
  const right = slot(0);
  const left = slot(1);
  const go = (e) => {
    e.stopPropagation();
    if (e.currentTarget.dataset.local) {
      e.preventDefault();
      finish.current();
      setTimeout(() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" }), 1100);
    }
  };

  return (
    <div className="pend" ref={root} onClick={() => finish.current()} role="presentation">
      {n >= 0 && n < WORK.length && (
        <div className="p-ghost" key={`g${n}`} aria-hidden="true">
          {String(n + 1).padStart(2, "0")}
        </div>
      )}
      <canvas ref={canvas} aria-hidden="true" />
      <div className="p-vig" aria-hidden="true" />

      <header className="p-top">
        <span className="p-brand">
          prixon<i />
        </span>
        <span className="p-kick">
          <u /> Selected work <u />
        </span>
        <button type="button" className="p-skip" onClick={(e) => (e.stopPropagation(), finish.current())}>
          Skip <kbd>esc</kbd>
        </button>
      </header>

      {[
        ["l", left],
        ["r", right],
      ].map(([side, idx]) =>
        idx >= 0 ? (
          <figure
            key={`${side}${idx}`}
            className={`ic ic-${side} ${idx === n ? "now" : "old"}`}
            onPointerEnter={() => (paused.current = true)}
            onPointerLeave={() => (paused.current = false)}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="ic-img" style={{ backgroundImage: `url(${WORK[idx].img})`, ...(WORK[idx].bg ? { backgroundColor: WORK[idx].bg } : {}) }} />
            <figcaption>
              <span className="no">{String(idx + 1).padStart(2, "0")}</span>
              <span className="meta">
                <b>{WORK[idx].n}</b>
                <small>{WORK[idx].tags}</small>
              </span>
              {WORK[idx].link ? (
                <a className="vw" href={WORK[idx].link} target="_blank" rel="noopener noreferrer" onClick={go}>
                  Visit website <Arrow />
                </a>
              ) : (
                <a className="vw" href="#work" data-local="1" onClick={go}>
                  View project <Arrow />
                </a>
              )}
            </figcaption>
          </figure>
        ) : null,
      )}

      {n >= 0 && n < WORK.length && (
        <div className="p-cap" key={n}>
          <p className="p-no">
            <b>{String(cur + 1).padStart(2, "0")}</b>
            <span /> {String(WORK.length).padStart(2, "0")}
          </p>
          <h2 className="t">
            {WORK[cur].n.split("").map((c, i) => (
              <span key={i} className="l" style={{ "--l": i }}>
                {c === " " ? " " : c}
              </span>
            ))}
          </h2>
          <em>{WORK[cur].s}</em>
        </div>
      )}

      <div className="p-rail" aria-hidden="true">
        <div className="p-line">
          <span style={{ transform: `scaleX(${Math.min(1, (n + 1) / WORK.length)})` }} />
        </div>
        <ol>
          {WORK.map((wk, i) => (
            <li key={wk.n} className={i === cur ? "on" : i < cur ? "past" : ""}>
              <b>{String(i + 1).padStart(2, "0")}</b> {wk.n}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
