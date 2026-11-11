"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { SITE, STATS } from "@/data/site";

// The canvas is the heaviest piece on the page: load it after the text has painted.
const SandField = dynamic(() => import("./SandField"), { ssr: false });

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const [ready, setReady] = useState(false);
  const [field, setField] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  // Start the grains once the main thread is idle (at most 1.5 s), so hydration and the first
  // paint of the headline are never competing with shader compilation.
  useEffect(() => {
    const start = () => setField(true);
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(start, 600);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const reduce = prefersReducedMotion();

    const ctx = gsap.context(() => {
      const bar = el.querySelector<HTMLElement>(".hero-phase-bar");
      const phases = el.querySelectorAll<HTMLElement>("[data-phase]");
      const setPhase = (p: number) => {
        bar?.style.setProperty("--p", String(p));
        phases[0]?.classList.toggle("is-on", p < 0.5);
        phases[1]?.classList.toggle("is-on", p >= 0.5);
      };
      setPhase(0);

      // scroll story: the hero holds while the sand turns into structure. One trigger pins and
      // scrubs the copy timeline (a second trigger on a pinned element would measure after the pin).
      const mobile = window.matchMedia("(max-width: 760px)").matches;
      const tl = reduce
        ? undefined
        : gsap
            .timeline({ defaults: { ease: "none" } })
            // explicit start values: the CSS entrance may still be running when this is created
            .fromTo(".hero-copy", { yPercent: 0, opacity: 1 }, { yPercent: -10, opacity: 0.12, duration: 0.6 }, 0)
            .fromTo(".hero-meta", { opacity: 1 }, { opacity: 0.4, duration: 0.6 }, 0)
            .to(".hero-statement", { opacity: 1, y: 0, duration: 0.35 }, 0.5)
            .to({}, { duration: 0.15 });
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: mobile ? "+=70%" : "+=110%",
        pin: true,
        scrub: 0.6,
        animation: tl,
        onUpdate: (self) => {
          progress.current = self.progress;
          setPhase(self.progress);
        },
      });
    }, el);

    return () => {
      ctx.revert();
    };
  }, []);

  // The wrapper stays React's node: GSAP's pin-spacer wraps the section inside it, so
  // unmounting on a route change never asks React to remove a node GSAP has moved.
  return (
    <div className="pin-wrap">
      <section ref={root} className="hero tone" data-tone="dark" aria-labelledby="hero-title">
        <div className="hero-fallback" aria-hidden="true" />
        <div className="hero-canvas" aria-hidden="true" style={{ opacity: ready ? 1 : 0, transition: "opacity 1.2s ease" }}>
          {field && <SandField progress={progress} onReady={onReady} />}
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-in wrap">
          <div className="hero-meta">
            <span className="label">
              {SITE.address.city}, {SITE.address.country}
            </span>
            <span className="label">
              {STATS[0].n} projects · {STATS[1].n} industries
            </span>
          </div>

          <div className="hero-copy">
            <p className="label label-accent eyebrow">Software studio</p>
            <h1 id="hero-title" className="hero-title display h-xxl">
              <span className="ln">
                <span>Software for</span>
              </span>{" "}
              <span className="ln">
                <span>
                  <em>any business.</em>
                </span>
              </span>
            </h1>
            <p className="hero-sub">
              We design and build websites, web apps, SaaS and management systems, then keep them fast, safe and online after launch.
            </p>
            <div className="hero-ctas">
              <Link href="/quote" className="btn">
                Get a quotation <ArrowRight size={18} aria-hidden="true" />
              </Link>
              <Link href="/work" className="btn btn-ghost">
                See our work
              </Link>
            </div>
          </div>

          <div className="hero-foot">
            <div className="hero-phase label" aria-hidden="true">
              <span data-phase>01 Raw material</span>
              <span className="hero-phase-bar">
                <i />
              </span>
              <span data-phase>02 Working system</span>
            </div>
            <span className="scroll-cue label">
              <i aria-hidden="true" /> Scroll
            </span>
          </div>
        </div>

        <p className="hero-statement display h-md" aria-hidden="true" style={{ transform: "translateY(20px)" }}>
          Raw ideas in. <em>Precise, working systems</em> out.
        </p>
      </section>
    </div>
  );
}
