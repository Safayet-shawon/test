"use client";
import { useCallback, useRef, useState } from "react";
import { BUSINESSES } from "@/data/site";
import HeroScene from "./HeroScene";
import Tape from "./Tape";
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
  const [step, setStep] = useState(1);
  const [phase, setPhase] = useState("site");
  const [pos, setPos] = useState(0); // ever-increasing: the tape moves one notch per business
  const prevStep = useRef(1);
  const onChange = useCallback((i, ph) => {
    setStep(i);
    setPhase(ph);
    if (i !== prevStep.current) {
      prevStep.current = i;
      setPos((p) => p + 1);
    }
  }, []);
  const item = (j) => {
    const k = j % BUSINESSES.length;
    const b = BUSINESSES[k];
    return { no: String(k + 1).padStart(2, "0"), cat: b.label, sub: `${b.name} · ${b.url}` };
  };
  const cur = BUSINESSES[step - 1];
  const ref = useRef(null);
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <section
      id="top"
      className="hero"
      ref={ref}
      onMouseMove={onMove}
      style={{ "--t": cur.theme.t, "--on": cur.theme.on }}
    >
      <div className="aurora" aria-hidden="true">
        <i />
        <i />
        <i />
      </div>
      <div className="hero-left">
        <div className="hero-copy">
          <h1>
            <span className="line">
              <Letters text="Websites for" />
            </span>
            <span className="line hl">
              <Letters text="any business." base={12} />
            </span>
          </h1>
          <Tape pos={pos} item={item} />
          <p className="lead">
            Custom websites, web apps and SaaS, designed and built by one team. Whatever you run, the site is
            made around your business, never from a template.
          </p>
          <div className="cta-row">
            <a href="#contact" className="btn btn-violet">
              Start a project <Arrow />
            </a>
            <a href="#work" className="btn btn-ghost">
              See our work
            </a>
          </div>
        </div>
        <span className="scroll-hint">scroll</span>
      </div>
      <div className="hero-right">
        <div className="status" data-state={phase} key={`${step}-${phase}`} aria-live="polite">
          <i />
          <span>
            {phase === "site" && <>{cur.real ? "Client project" : "Concept design"} · {cur.url}</>}
            {phase === "fall" && "Next business…"}
          </span>
        </div>
        <HeroScene onChange={onChange} />
      </div>
      <div className="m-scroll" aria-hidden="true">
        <span>Scroll</span>
        <i />
      </div>
    </section>
  );
}
