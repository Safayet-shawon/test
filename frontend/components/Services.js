"use client";
import { useEffect, useRef } from "react";
import { Arrow } from "./Icons";

const PANELS = [
  {
    id: "saas",
    n: "01",
    tone: "stone",
    title: "SaaS",
    text: "From empty repo to paying users. Auth, billing, dashboards and onboarding that people actually finish.",
    tags: ["Dashboards", "Auth & billing", "MVP in weeks"],
    art: "bars",
  },
  {
    id: "projects",
    n: "02",
    tone: "blue",
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

  // Vertical scroll drives a horizontal track (desktop). On mobile it stacks natively.
  useEffect(() => {
    const o = outer.current;
    const t = track.current;
    const b = bar.current;
    const mq = window.matchMedia("(min-width: 901px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!mq.matches) {
        o.style.height = "";
        t.style.transform = "";
        return;
      }
      const dist = Math.max(0, t.scrollWidth - window.innerWidth);
      o.style.height = `${window.innerHeight + dist}px`;
      const top = o.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, -top / (dist || 1)));
      t.style.transform = `translate3d(${-p * dist}px,0,0)`;
      b.style.transform = `scaleX(${p})`;
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    mq.addEventListener("change", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
      mq.removeEventListener("change", queue);
    };
  }, []);

  return (
    <section id="services" className="services" ref={outer}>
      <div className="services-sticky">
        <div className="progress">
          <span ref={bar} />
        </div>
        <div className="track" ref={track}>
          <article className="panel tone-blue intro">
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

          <article className="panel tone-red cta-panel">
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
