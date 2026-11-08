"use client";
import { useEffect, useRef, useState } from "react";

// Brand intro, about 2 seconds, once per tab:
//   0.0–1.0s  loading: an arc chases twice round a faint track, then closes into a ring (the "0" of our mark)
//   0.9–1.4s  the rounded tile grows out from behind the ring, the ring becomes the cut-out,
//             then the slash and the cursor bar draw in
//   1.3–1.65s the mark slides left as "zerosoft26" appears beside it, then holds
//   1.9–2.2s  the curtain fades and the hero starts
// Timing lives in CSS (.brand-intro). Any key, click, scroll or swipe skips it.
// Skipped entirely for reduced-motion users and on repeat visits (see the script in app/layout.js).
export default function Intro() {
  const [gone, setGone] = useState(false);
  const released = useRef(false);

  const release = () => {
    if (released.current) return;
    released.current = true;
    const html = document.documentElement;
    html.classList.remove("intro-lock");
    try {
      sessionStorage.setItem("zerosoft-intro", "1");
    } catch {}
    window.dispatchEvent(new Event("zerosoft:intro-done"));
  };

  useEffect(() => {
    const html = document.documentElement;
    if (!html.classList.contains("intro-lock")) {
      release();
      setGone(true);
      return;
    }
    const skip = () => {
      release();
      setGone(true);
    };
    // Fallbacks in case the animation events were missed before hydration.
    const t1 = setTimeout(release, 2000);
    const t2 = setTimeout(() => setGone(true), 2400);
    const opts = { passive: true };
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchstart", skip, opts);
    window.addEventListener("pointerdown", skip);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchstart", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className="brand-intro"
      aria-hidden="true"
      onAnimationStart={(e) => e.animationName === "biExit" && release()}
      onAnimationEnd={(e) => e.animationName === "biExit" && setGone(true)}
    >
      <div className="bi-lockup">
        <svg className="bi-mark" viewBox="0 0 32 32">
          <rect className="bi-tile" width="32" height="32" rx="8.5" />
          <ellipse className="bi-track" cx="16" cy="15.2" rx="6.6" ry="9" />
          <ellipse className="bi-ring" cx="16" cy="15.2" rx="6.6" ry="9" pathLength="1" />
          <path className="bi-slash" d="M12.4 20.6 L19.6 9.8" pathLength="1" />
          <rect className="bi-cursor" x="20.4" y="24.2" width="5.6" height="2.2" rx="1.1" />
        </svg>
        <div className="bi-wordwrap">
          <span className="bi-word">
            <b>zero</b>soft<span className="bi-yr">26</span>
          </span>
        </div>
      </div>
    </div>
  );
}
