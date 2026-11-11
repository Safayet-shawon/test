"use client";
import { useEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { PROCESS } from "@/data/site";

// Desktop: the section holds while a large numeral rolls from 01 to 04 and a rust rail fills;
// the active step is lit, the others recede. Mobile: the steps are a simple list with a rail.
export default function ProcessPinned({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const root = useRef<HTMLElement>(null);
  const H = heading;

  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const grid = el.querySelector<HTMLElement>(".proc");
      const steps = el.querySelectorAll<HTMLElement>(".proc-step");
      const nums = el.querySelectorAll<HTMLElement>(".proc-big span");
      const rail = el.querySelector<HTMLElement>(".proc-rail");
      if (!grid) return;
      grid.classList.add("is-pinned");
      gsap.set(nums, { yPercent: (i: number) => (i === 0 ? 0 : 100) });
      let cur = 0;
      const activate = (n: number) => {
        steps.forEach((s, i) => s.classList.toggle("is-on", i === n));
        if (n === cur) return;
        gsap.to(nums[cur], { yPercent: n > cur ? -100 : 100, duration: 0.9, ease: "expo.inOut", overwrite: true });
        gsap.fromTo(nums[n], { yPercent: n > cur ? 100 : -100 }, { yPercent: 0, duration: 0.9, ease: "expo.inOut", overwrite: true });
        cur = n;
      };
      activate(0);
      gsap.to(
        {},
        {
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + window.innerHeight * 2.2,
            pin: true,
            scrub: true,
            onUpdate: (self) => {
              rail?.style.setProperty("--p", String(self.progress));
              activate(Math.min(steps.length - 1, Math.floor(self.progress * steps.length)));
            },
          },
        },
      );
      return () => grid.classList.remove("is-pinned");
    });
    return () => mm.revert();
  }, []);

  // The wrapper stays React's node: GSAP's pin-spacer wraps the section inside it, so
  // unmounting on a route change never asks React to remove a node GSAP has moved.
  return (
    <div className="pin-wrap">
      <section ref={root} className="tone" data-tone="sand" aria-labelledby="proc-title">
        <div className="wrap proc">
          <div>
            <p className="label eyebrow" data-reveal="fade">
              How we work
            </p>
            <H id="proc-title" className="display h-lg" data-split="lines" style={{ margin: "1.25rem 0 2rem", maxWidth: "12ch" }}>
              Four steps, <em>no surprises.</em>
            </H>
            <div className="proc-big" aria-hidden="true">
              {PROCESS.map((_, i) => (
                <span key={i}>{String(i + 1).padStart(2, "0")}</span>
              ))}
            </div>
          </div>
          <div style={{ position: "relative", paddingLeft: "1.75rem" }}>
            <div className="proc-rail" aria-hidden="true">
              <i />
            </div>
            <ol className="proc-steps" style={{ listStyle: "none" }}>
              {PROCESS.map((p, i) => (
                <li key={p.title} className="proc-step" data-reveal="up" data-delay={String(i * 0.06)}>
                  <span className="label">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{p.title}</h3>
                    <p>{p.text}</p>
                    <p className="proc-detail">{p.detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>
    </div>
  );
}
