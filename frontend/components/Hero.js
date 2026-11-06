"use client";
import { useCallback, useState } from "react";
import { BUSINESSES, INTRO } from "@/data/site";
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
  const [step, setStep] = useState(0);
  const onChange = useCallback((i) => setStep(i), []);
  const word = step === 0 ? INTRO.label : BUSINESSES[step - 1].label;

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
              <Letters text="Websites for" />
            </span>
            {/* the sticker + dashed line ties this text to the animation on the right */}
            <span className="line word-line">
              <span className="word" key={word}>
                <Letters text={word} />
              </span>
              <span className="link" aria-hidden="true" />
            </span>
            <span className="line hl">
              <Letters text="that stand out." base={12} />
            </span>
          </h1>
          <p className="lead">
            Pizza shop or SaaS startup — whatever you run, we design and build the site.
            Fast, loud and <b>actually fun</b> to scroll.
          </p>
          <div className="cta-row">
            <a href="#contact" className="btn btn-mocha">
              Describe your project <Arrow />
            </a>
            <a href="#work" className="btn btn-ghost">
              See our work
            </a>
          </div>
        </div>
        <span className="scroll-hint">scroll</span>
      </div>
      <div className="hero-right">
        <HeroScene onChange={onChange} />
      </div>
    </section>
  );
}
