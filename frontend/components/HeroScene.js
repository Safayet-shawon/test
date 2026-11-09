"use client";
import { useEffect, useRef, useState } from "react";
import { BUSINESSES } from "@/data/site";
import { SITES } from "./DemoSites";

const SHOW_MS = 3600; // how long each website stays on screen
const TYPE_MS = 42; // per character while the next address is typed
const LOAD_MS = 380; // "loading" pause after the address is typed


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

  // One browser that never moves. Loop: the site is shown -> the screen clears and the next address
  // is typed into the bar -> a short load -> the next site fades in.
  const [typed, setTyped] = useState("");
  useEffect(() => {
    if (!ready || !visible) return;
    if (phase === "site") {
      const t = setTimeout(() => {
        setTyped("");
        setPhase("type");
      }, SHOW_MS);
      return () => clearTimeout(t);
    }
    const next = (step % BUSINESSES.length) + 1;
    const url = BUSINESSES[next - 1].url;
    if (typed.length < url.length) {
      const t = setTimeout(() => setTyped(url.slice(0, typed.length + 1)), typed.length ? TYPE_MS : 260);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setStep(next);
      setSiteStep(next);
      setPhase("site");
    }, LOAD_MS);
    return () => clearTimeout(t);
  }, [phase, step, ready, visible, typed]);

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
            <span className="bar-url">
              {phase === "type" ? typed : site.url}
              {phase === "type" && <b className="bar-caret" aria-hidden="true" />}
            </span>
            <u className="bar-load" aria-hidden="true" />
          </div>
          <div className="screen">{phase === "type" ? <div className="page page-blank" /> : <SiteView key={site.url} site={site} />}</div>
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
