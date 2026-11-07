"use client";
import { useEffect, useRef } from "react";
import { Arrow } from "./Icons";

const PANELS = [
  {
    id: "saas",
    n: "01",
    tone: "mocha",
    title: "SaaS",
    text: "From empty repo to paying users. Auth, billing, dashboards and onboarding that people actually finish.",
    tags: ["Dashboards", "Auth & billing", "MVP in weeks"],
    art: "bars",
  },
  {
    id: "projects",
    n: "02",
    tone: "sand",
    title: "Projects",
    text: "Custom websites and web apps for any business — restaurant, gym, studio, creator. Built around you, never a template.",
    tags: ["Brand sites", "Web apps", "Landing pages"],
    art: "browser",
  },
  {
    id: "products",
    n: "03",
    tone: "white",
    title: "Products",
    text: "Stores, drops and product pages that turn scrolling into checkout. Fast, thumb-friendly, a little unhinged.",
    tags: ["E-commerce", "Drops & waitlists", "Product pages"],
    art: "cards",
  },
];

function Art({ kind }) {
  if (kind === "bars")
    return (
      <div className="art art-bars">
        {[40, 70, 50, 90, 65, 100].map((h, i) => (
          <i key={i} style={{ "--h": `${h}%`, "--i": i }} />
        ))}
      </div>
    );
  if (kind === "browser")
    return (
      <div className="art art-browser">
        <div className="mini-bar">
          <i />
          <i />
          <i />
        </div>
        <div className="mini-hero" />
        <div className="mini-lines">
          <i />
          <i />
          <i />
        </div>
      </div>
    );
  return (
    <div className="art art-cards">
      {[0, 1, 2].map((i) => (
        <div key={i} style={{ "--i": i }}>
          <span />
          <b />
        </div>
      ))}
    </div>
  );
}

export default function Services() {
  const outer = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  // Vertical scroll drives a horizontal track (desktop). Progress is eased (lerp) every frame
  // so the motion glides instead of snapping to the wheel; panels also get parallax vars.
  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    const b = bar.current;
    const panels = Array.from(t.children);
    const mq = window.matchMedia("(min-width: 901px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cur = 0;
    let target = 0;
    let dist = 0;
    let vw = 0;

    const measure = () => {
      if (!mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        panels.forEach((p) => {
          p.style.removeProperty("--x");
          p.style.removeProperty("--o");
        });
        return false;
      }
      vw = window.innerWidth;
      dist = Math.max(0, t.scrollWidth - vw);
      o.style.height = `${window.innerHeight + dist}px`;
      return true;
    };
    const readTarget = () => {
      const top = o.getBoundingClientRect().top;
      target = Math.min(1, Math.max(0, -top / (dist || 1)));
    };
    const paint = () => {
      const x = -cur * dist;
      t.style.transform = `translate3d(${x.toFixed(2)}px,0,0)`;
      b.style.transform = `scaleX(${cur.toFixed(4)})`;
      for (const p of panels) {
        const c = (p.offsetLeft + x + p.offsetWidth / 2 - vw / 2) / vw; // -1..1 = distance from centre
        p.style.setProperty("--x", c.toFixed(3));
        p.style.setProperty("--o", Math.max(0.2, 1 - Math.max(0, Math.abs(c) - 0.55) * 1.6).toFixed(3));
      }
    };
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      readTarget();
      const d = target - cur;
      cur = reduce || Math.abs(d) < 0.0004 ? target : cur + d * 0.11;
      paint();
      if (cur !== target) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const onResize = () => {
      if (measure()) {
        readTarget();
        cur = target;
        paint();
      }
    };

    onResize();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    mq.addEventListener("change", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      mq.removeEventListener("change", onResize);
    };
  }, []);

  return (
    <section id="services" className="services" ref={outer}>
      <div className="services-sticky">
        <div className="progress">
          <span ref={bar} />
        </div>
        <div className="track" ref={track}>
          <article className="panel tone-sand intro">
            <p className="eyebrow">What we make</p>
            <h2>
              Three ways
              <br />
              we <span className="scribble">level you up</span>
            </h2>
            <p className="swipe">
              keep scrolling <Arrow />
            </p>
          </article>

          {PANELS.map((p) => (
            <article key={p.id} className={`panel tone-${p.tone}`}>
              <span className="num">{p.n}</span>
              <h3>{p.title}</h3>
              <p>{p.text}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <Art kind={p.art} />
            </article>
          ))}

          <article className="panel tone-deep cta-panel">
            <span className="num">04</span>
            <h3>
              Describe
              <br />
              your project
            </h3>
            <p>Two sentences is enough. We&apos;ll come back with a plan, a price and a first look.</p>
            <a href="#contact" className="btn btn-white">
              Contact us <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
