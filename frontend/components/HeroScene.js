"use client";
import { useEffect, useState } from "react";
import { BUSINESSES } from "@/data/site";
import { goldenSpiral } from "./Icons";
import { SITES } from "./DemoSites";

const SPIRAL = goldenSpiral(600, 12);
const SITE_MS = 3900; // ms each website is on screen (drop-in + hold)
const FALL_MS = 700; // the site falls away, the next one drops in


function SiteView({ site }) {
  const C = SITES[site.layout];
  return C ? <C site={site} /> : null;
}

// step 0 = intro (any business), steps 1..n = BUSINESSES[step-1]
export default function HeroScene({ onChange }) {
  const [step, setStep] = useState(1);
  const [siteStep, setSiteStep] = useState(1);
  const [phase, setPhase] = useState("site");
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
  const total = BUSINESSES.length;

  useEffect(() => {
    onChange?.(step, phase);
  }, [step, phase, onChange]);

  // loop: site (drops in, plays) -> fall away -> next site. No "pre" step.
  useEffect(() => {
    if (!ready) return;
    let t;
    if (phase === "site") {
      t = setTimeout(() => setPhase("fall"), SITE_MS - FALL_MS);
    } else {
      t = setTimeout(() => {
        const next = (step % BUSINESSES.length) + 1;
        setStep(next);
        setSiteStep(next);
        setPhase("site");
      }, FALL_MS);
    }
    return () => clearTimeout(t);
  }, [phase, step, ready]);

    const site = BUSINESSES[siteStep - 1];

  return (
    <div className="scene" data-phase={ready ? phase : "wait"}>
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
          <li key={i} className={i === step - 1 ? "on" : i < step - 1 ? "done" : ""} />
        ))}
      </ol>
    </div>
  );
}
