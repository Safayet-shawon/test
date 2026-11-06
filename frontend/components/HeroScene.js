"use client";
import { useEffect, useState } from "react";
import { BUSINESSES, INTRO } from "@/data/site";
import { BizIcon, goldenSpiral } from "./Icons";

const SPIRAL = goldenSpiral(600, 12);
const INTRO_MS = 3400; // "any business" collage
const IDLE = 2400; // plain object
const SITE_MS = 4400; // generated website

// step 0 = intro (any business), steps 1..n = BUSINESSES[step-1]
export default function HeroScene({ onChange }) {
  const [step, setStep] = useState(0);
  const [siteStep, setSiteStep] = useState(1);
  const [phase, setPhase] = useState("idle");
  const total = BUSINESSES.length + 1;

  useEffect(() => {
    onChange?.(step);
  }, [step, onChange]);

  useEffect(() => {
    let t;
    if (step === 0) {
      t = setTimeout(() => setStep(1), INTRO_MS);
    } else if (phase === "idle") {
      t = setTimeout(() => {
        setSiteStep(step);
        setPhase("site");
      }, IDLE);
    } else {
      t = setTimeout(() => {
        setStep((s) => (s % (total - 1)) + 1); // loop 1..n; intro plays once
        setPhase("idle");
      }, SITE_MS);
    }
    return () => clearTimeout(t);
  }, [phase, step, total]);

  const biz = step === 0 ? INTRO : BUSINESSES[step - 1];
  const site = BUSINESSES[siteStep - 1];

  return (
    <div className="scene" data-phase={step === 0 ? "intro" : phase}>
      {/* golden spiral: its eye sits behind the focal object so the eye is led to the animation */}
      <svg className="spiral" viewBox="-700 -700 1400 1400" aria-hidden="true">
        <path d={SPIRAL} />
      </svg>
      <div className="blob b-mocha" />
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
                <BizIcon kind={b.kind} />
              </span>
            ))}
            <span className="col-core">any<br />business</span>
          </div>
        ) : (
          <div className="obj-float">
            <BizIcon kind={biz.kind} />
          </div>
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
        <div className="browser" style={{ "--bg": site.bg, "--fg": site.fg, "--ac": site.accent }}>
          <div className="bar">
            <i />
            <i />
            <i />
            <span>{site.url}</span>
          </div>
          <div className="page">
            <div className="pnav pop" style={{ "--i": 0 }}>
              <b>{site.name}</b>
              <span>
                {site.nav.map((n, i) => (
                  <u key={n} className={i === site.nav.length - 1 ? "pill" : ""}>
                    {n}
                  </u>
                ))}
              </span>
            </div>
            <div className="phero">
              <div>
                <h4 className="pop" style={{ "--i": 1 }}>
                  {site.headline}
                </h4>
                <p className="pop" style={{ "--i": 2 }}>
                  {site.sub}
                </p>
                <button type="button" tabIndex={-1} className="pop pbtn" style={{ "--i": 3 }}>
                  {site.cta}
                </button>
              </div>
              <div className="phero-art pop" style={{ "--i": 2 }}>
                <BizIcon kind={site.kind} />
              </div>
            </div>
            <div className="pcards">
              {site.items.map(([n, p], i) => (
                <div key={n} className="pcard pop" style={{ "--i": 4 + i }}>
                  <span className="pthumb">
                    <BizIcon kind={site.kind} />
                  </span>
                  <b>{n}</b>
                  <small>{p}</small>
                </div>
              ))}
            </div>
            <span className="cursor" />
          </div>
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
