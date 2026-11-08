"use client";
import { useEffect, useRef, useState } from "react";
import { BUSINESSES } from "@/data/site";
import { SITES } from "./DemoSites";

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
  const [visible, setVisible] = useState(true); // paused while the hero is off screen or the tab is hidden
  const root = useRef(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let onScreen = true;
    const update = () => setVisible(onScreen && document.visibilityState === "visible");
    const io = new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      update();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", update);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);

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
    if (!ready || !visible) return;
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
  }, [phase, step, ready, visible]);

  const site = BUSINESSES[siteStep - 1];

  return (
    <div className="scene" ref={root} data-phase={ready ? phase : "wait"}>
      <div className="blob b-violet" />

      <div className="site-layer">
        <div
          className="browser"
          data-tone={site.tone}
          data-real={site.real ? "" : undefined}
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
