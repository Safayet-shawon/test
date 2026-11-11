"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger, SplitText, prefersReducedMotion } from "@/lib/gsap";

// One client component animates the whole (server-rendered) page through data attributes,
// so sections stay Server Components and ship no JavaScript of their own:
//   data-reveal="up|fade|clip"  enter once when scrolled into view (data-delay in seconds)
//   data-stagger                each direct child enters in sequence
//   data-split="lines|chars"    masked line or character reveal for headings
//   data-words                  words light up as the paragraph is scrolled (scrubbed)
//   data-parallax="0.2"         drifts against the scroll by that fraction of its height
//   data-count                  counts up from zero to its text value
// Re-runs on every route change; everything is reverted on cleanup.
export default function Choreographer() {
  const pathname = usePathname();

  useEffect(() => {
    window.__zsMotion = true;
    const root = document.documentElement;
    if (prefersReducedMotion()) {
      root.classList.remove("js-motion");
      return;
    }
    root.classList.add("js-motion");

    const splits: SplitText[] = [];
    let ctx: gsap.Context | undefined;
    let cancelled = false;

    const run = () => {
      if (cancelled) return;
      ctx = gsap.context(() => {
        // progress bar
        gsap.to(".progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 0.3 },
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          const kind = el.dataset.reveal;
          const delay = Number(el.dataset.delay || 0);
          const st = { trigger: el, start: "top 88%", once: true };
          if (kind === "clip") {
            gsap.to(el, { clipPath: "inset(0% 0 0 0)", duration: 1.4, ease: "expo.inOut", delay, scrollTrigger: st });
          } else if (kind === "fade") {
            gsap.to(el, { opacity: 1, duration: 1.2, ease: "power2.out", delay, scrollTrigger: st });
          } else {
            gsap.fromTo(el, { opacity: 0, y: 36 }, { opacity: 1, y: 0, delay, scrollTrigger: st });
          }
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.fromTo(
            el.children,
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, stagger: 0.08, scrollTrigger: { trigger: el, start: "top 85%", once: true } }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const type = el.dataset.split === "chars" ? "chars" : "lines";
          const split = SplitText.create(el, {
            type: type === "chars" ? "chars" : "lines",
            mask: type === "chars" ? undefined : "lines",
            linesClass: "split-line",
          });
          splits.push(split);
          el.classList.add("is-split");
          const targets = type === "chars" ? split.chars : split.lines;
          gsap.from(targets, {
            yPercent: type === "chars" ? 100 : 110,
            opacity: type === "chars" ? 0 : 1,
            duration: type === "chars" ? 1.2 : 1.25,
            stagger: type === "chars" ? 0.04 : 0.1,
            delay: Number(el.dataset.delay || 0),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-words]").forEach((el) => {
          gsap.to(el.querySelectorAll(".w"), {
            opacity: 1,
            stagger: 0.12,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amt = Number(el.dataset.parallax || 0.15);
          gsap.fromTo(
            el,
            { yPercent: -amt * 50 },
            {
              yPercent: amt * 50,
              ease: "none",
              scrollTrigger: { trigger: el.parentElement || el, start: "top bottom", end: "bottom top", scrub: true },
            }
          );
        });

        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const end = Number(el.textContent || 0);
          const obj = { v: 0 };
          el.textContent = "0";
          gsap.to(obj, {
            v: end,
            duration: 1.8,
            ease: "power3.out",
            onUpdate: () => (el.textContent = String(Math.round(obj.v))),
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          });
        });
      });
      ScrollTrigger.refresh();
    };

    // Split text only after web fonts are in, so line breaks are measured with the real font.
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    fontsReady.then(() => requestAnimationFrame(run));

    return () => {
      cancelled = true;
      splits.forEach((s) => s.revert());
      ctx?.revert();
    };
  }, [pathname]);

  return <div className="progress" aria-hidden="true" />;
}
