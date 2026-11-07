"use client";
import { useEffect, useState } from "react";
import { BUSINESSES, INTRO } from "@/data/site";
import { BizIcon, goldenSpiral } from "./Icons";
import { SITES } from "./DemoSites";

const SPIRAL = goldenSpiral(600, 12);
const INTRO_MS = 2500; // "any business" collage
const IDLE = 1150; // short pre-context: the plain object
const SITE_MS = 4300; // ms from "site opens" until the next business
const FALL_MS = 650; // the site's pieces drop away under mild gravity


function SiteView({ site }) {
  const C = SITES[site.layout];
  return C ? <C site={site} /> : null;
}

// step 0 = intro (any business), steps 1..n = BUSINESSES[step-1]
export default function HeroScene({ onChange }) {
  const [step, setStep] = useState(0);
  const [siteStep, setSiteStep] = useState(1);
  const [phase, setPhase] = useState("idle");
  const [ready, setReady] = useState(false); // hero animation starts once the pendulum intro is done

  useEffect(() => {
    if (!document.documentElement.classList.contains("intro-lock")) {
      setReady(true);
      return;
    }
    const on = () => setReady(true);
    window.addEventListener("zerosoft:intro-done", on, { once: true });
    return () => window.removeEventListener("zerosoft:intro-done", on);
  }, []);
  const total = BUSINESSES.length + 1;

  useEffect(() => {
    onChange?.(step, step === 0 ? "intro" : phase);
  }, [step, phase, onChange]);

  useEffect(() => {
    if (!ready) return;
    let t;
    if (step === 0) {
      t = setTimeout(() => setStep(1), INTRO_MS);
    } else if (phase === "idle") {
      t = setTimeout(() => {
        setSiteStep(step);
        setPhase("site");
      }, IDLE);
    } else if (phase === "site") {
      t = setTimeout(() => setPhase("fall"), SITE_MS - FALL_MS);
    } else {
      t = setTimeout(() => {
        setStep((s) => (s % (total - 1)) + 1); // loop 1..n; intro plays once
        setPhase("idle");
      }, FALL_MS);
    }
    return () => clearTimeout(t);
  }, [phase, step, total, ready]);

  const biz = step === 0 ? INTRO : BUSINESSES[step - 1];
  const site = BUSINESSES[siteStep - 1];

  return (
    <div className="scene" data-phase={step === 0 ? "intro" : phase}>
      {/* golden spiral: its eye sits behind the focal object so the eye is led to the animation */}
      <svg className="spiral" viewBox="-700 -700 1400 1400" aria-hidden="true">
        <path d={SPIRAL} />
      </svg>
      <div className="blob b-violet" />
      <div className="ring" />
      <span className="spark s1" />
      <span className="spark s2" />
      <span className="spark s3" />
      <span className="chip c1">SaaS</span>
      <span className="chip c2">Shop</span>
      <span className="chip c3">Booking</span>

      <div className="obj-layer" key={`o${step}`}>
        {step === 0 ? (
          <div className="collage">
            {BUSINESSES.map((b, i) => (
              <span key={b.kind} className="col-item" style={{ "--a": `${i * (360 / BUSINESSES.length)}deg`, "--i": i }}>
                {b.thumb ? <img src={b.thumb} alt="" /> : <BizIcon kind={b.kind} />}
              </span>
            ))}
            <span className="col-core">any<br />business</span>
          </div>
        ) : (
          biz.hero ? (
            <div className="obj-photo">
              <img src={biz.hero} alt="" />
            </div>
          ) : (
            <div className="obj-float">
              <BizIcon kind={biz.kind} />
            </div>
          )
        )}
        <p className="obj-label">
          {step === 0 ? (
            <>
              we do <b>any business</b>
            </>
          ) : (
            <>
              your <b>{biz.single}</b>
              <em> needs a website</em>
            </>
          )}
        </p>
      </div>

      <div className="site-layer">
        <div
          className="browser"
          data-tone={site.tone}
          style={{ "--bg": site.bg, "--fg": site.fg, "--ac": site.accent, "--aon": site.aon }}
        >
          <div className="bar">
            <i />
            <i />
            <i />
            <span>{site.url}</span>
          </div>
          <SiteView site={site} />
        </div>
      </div>

      <ol className="steps" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <li key={i} className={i === step ? "on" : i < step ? "done" : ""} />
        ))}
      </ol>
    </div>
  );
}
