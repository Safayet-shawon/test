"use client";
import { useCallback, useState } from "react";
import { BUSINESSES } from "@/data/site";
import HeroScene from "./HeroScene";
import { Arrow } from "./Icons";

function Letters({ text, base = 0 }) {
  return (
    <>
      {text.split("").map((c, i) => (
        <span key={i} className="ltr" style={{ "--l": base + i }}>
          {c === " " ? " " : c}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const onChange = useCallback((i) => setIdx(i), []);
  const word = BUSINESSES[idx].label;

  return (
    <section id="top" className="hero">
      <div className="hero-grid" />
      <div className="hero-left">
        <div className="hero-copy">
          <p className="badge">
            <i /> Now booking new projects
          </p>
          <h1>
            <span className="line">
              <Letters text="We turn" />
            </span>
            <span className="line word-line">
              <span className="word" key={word}>
                <Letters text={word} />
              </span>
            </span>
            <span className="line">
              <Letters text="into websites" base={8} />
            </span>
            <span className="line hl">
              <Letters text="nobody scrolls past." base={20} />
            </span>
          </h1>
          <p className="lead">
            We&apos;re a tiny, chronically-online dev + design crew. Bring us a business, an idea or a
            half-baked Notion page — we ship it as a fast, loud, <b>actually fun</b> website, SaaS
            or product.
          </p>
          <div className="cta-row">
            <a href="#contact" className="btn btn-red">
              Describe your project <Arrow />
            </a>
            <a href="#work" className="btn btn-ghost">
              See our work
            </a>
          </div>
          <ul className="proof">
            <li>
              <b>0</b> templates
            </li>
            <li>
              <b>Next.js</b> fast
            </li>
            <li>
              <b>100%</b> custom
            </li>
          </ul>
        </div>
        <span className="scroll-hint">scroll</span>
      </div>
      <div className="hero-right">
        <HeroScene onChange={onChange} />
      </div>
    </section>
  );
}
