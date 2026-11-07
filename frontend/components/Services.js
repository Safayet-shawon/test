"use client";
import { useEffect, useRef } from "react";
import { Arrow } from "./Icons";

const PANELS = [
  {
    id: "saas",
    n: "01",
    title: "SaaS",
    serif: "Software people actually finish onboarding.",
    text: "From empty repo to paying users. Auth, billing, dashboards and onboarding, built to scale from the first customer.",
    tags: ["Dashboards", "Auth & billing", "MVP in weeks"],
    art: "bars",
  },
  {
    id: "projects",
    n: "02",
    title: "Projects",
    serif: "Never a template. Always you.",
    text: "Custom websites and web apps for any business: restaurant, studio, clinic, creator. Designed around your brand and your customers.",
    tags: ["Brand sites", "Web apps", "Landing pages"],
    art: "browser",
  },
  {
    id: "products",
    n: "03",
    title: "Products",
    serif: "Scrolling that ends at checkout.",
    text: "Stores, drops and product pages that turn browsers into buyers. Fast, thumb-friendly and a little unhinged.",
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
  const sticky = useRef(null);
  const track = useRef(null);
  const bar = useRef(null);

  // Vertical scroll drives a horizontal track (desktop). Progress is eased every frame so the
  // motion glides; panels get parallax vars (--x / --o) and the section exposes --p (0..1).
  useEffect(() => {
    const o = outer.current;
    const st = sticky.current;
    const t = track.current;
    const b = bar.current;
    const panels = Array.from(t.children);
    const ticks = Array.from(st.querySelectorAll(".ticks li"));
    const mq = window.matchMedia("(min-width: 901px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let cur = 0;
    let target = 0;
    let dist = 0;
    let vw = 0;
    let active = -1;

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
      st.style.setProperty("--p", cur.toFixed(4));
      for (const p of panels) {
        const c = (p.offsetLeft + x + p.offsetWidth / 2 - vw / 2) / vw; // -1..1 = distance from centre
        p.style.setProperty("--x", c.toFixed(3));
        p.style.setProperty("--o", Math.max(0.15, 1 - Math.max(0, Math.abs(c) - 0.5) * 1.5).toFixed(3));
      }
      const a = Math.round(cur * (panels.length - 1));
      if (a !== active) {
        active = a;
        ticks.forEach((li, i) => li.classList.toggle("on", i === a));
      }
    };
    const tick = () => {
      raf = 0;
      if (!mq.matches) return;
      readTarget();
      const d = target - cur;
      cur = reduce || Math.abs(d) < 0.0003 ? target : cur + d * 0.075; // lower = smoother
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
      <div className="services-sticky" ref={sticky}>
        <div className="progress">
          <span ref={bar} />
        </div>
        <div className="ghost" aria-hidden="true">
          SaaS · Projects · Products · SaaS · Projects · Products
        </div>
        <ol className="ticks" aria-hidden="true">
          {[0, 1, 2, 3, 4].map((i) => (
            <li key={i} className={i === 0 ? "on" : ""} />
          ))}
        </ol>

        <div className="track" ref={track}>
          <article className="panel tone-dark intro">
            <p className="kicker">What we make</p>
            <h2>
              Three ways to make people <em>stop scrolling.</em>
            </h2>
            <p className="swipe">
              Scroll <span className="line-anim" /> <Arrow />
            </p>
          </article>

          {PANELS.map((p, i) => (
            <article key={p.id} className={`panel tone-dark alt${i % 2}`}>
              <span className="ghostnum" aria-hidden="true">
                {p.n}
              </span>
              <p className="kicker">
                {p.n} — {p.title}
              </p>
              <h3>{p.title}</h3>
              <p className="serif">{p.serif}</p>
              <p className="desc">{p.text}</p>
              <ul className="tags">
                {p.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <a href="#work" className="more">
                <span>See related work</span>
                <i>
                  <Arrow />
                </i>
              </a>
              <Art kind={p.art} />
            </article>
          ))}

          <article className="panel tone-dark cta-panel">
            <p className="kicker">Now the proof</p>
            <h3>
              See what
              <br />
              we&apos;ve built
            </h3>
            <p className="serif">Real projects. Real screenshots.</p>
            <a href="#work" className="go" aria-label="Go to our work">
              <Arrow />
            </a>
            <a href="#contact" className="alt-link">
              or describe your project <Arrow />
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
