"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { FEATURED, ALL_WORK, SECTORS } from "@/data/site";

// Desktop: the section pins and the projects travel sideways with the scroll; each screenshot
// is unmasked as it arrives and drifts slightly inside its frame. Below 1024px it is a plain
// vertical list (no pinning on touch devices).
export default function SelectedWork() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    const tr = track.current;
    if (!el || !tr || prefersReducedMotion()) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      const distance = () => tr.scrollWidth - window.innerWidth;
      const move = gsap.to(tr, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + distance(),
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
        },
      });
      tr.querySelectorAll<HTMLElement>(".wcard").forEach((card, i) => {
        const media = card.querySelector(".wcard-media");
        const img = card.querySelector("img");
        if (i > 0) {
          gsap.fromTo(
            media,
            { clipPath: "inset(0 0 0 100%)" },
            {
              clipPath: "inset(0 0 0 0%)",
              ease: "none",
              scrollTrigger: { trigger: card, containerAnimation: move, start: "left 100%", end: "left 55%", scrub: true },
            },
          );
        }
        gsap.fromTo(
          img,
          { xPercent: 6 },
          {
            xPercent: -6,
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: move, start: "left right", end: "right left", scrub: true },
          },
        );
      });
    });
    mm.add("(max-width: 1023px)", () => {
      tr.querySelectorAll<HTMLElement>(".wcard-media").forEach((m) => {
        gsap.fromTo(
          m,
          { clipPath: "inset(14% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", ease: "expo.out", duration: 1.4, scrollTrigger: { trigger: m, start: "top 88%", once: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  // The wrapper stays React's node: GSAP's pin-spacer wraps the section inside it, so
  // unmounting on a route change never asks React to remove a node GSAP has moved.
  return (
    <div className="pin-wrap">
      <section ref={root} className="work-hs tone" data-tone="graphite" aria-labelledby="work-title">
        <div className="wrap work-intro">
          <div>
            <p className="label label-accent eyebrow" data-reveal="fade">
              Selected work
            </p>
            <h2 id="work-title" className="display h-xl" data-split="lines" style={{ margin: "1.25rem 0 0" }}>
              Built, shipped, <em>in use.</em>
            </h2>
          </div>
          <p className="lede" data-reveal="up" style={{ maxWidth: "26rem" }}>
            A few of the {ALL_WORK.length} projects we have designed and built, from company websites to the system behind a garment factory.
          </p>
        </div>

        <div ref={track} className="work-track">
          {FEATURED.map((p, i) => (
            <article key={p.id} className="wcard">
              <div className="wcard-media">
                <Image src={p.image} alt={`${p.title}: ${p.result}`} fill sizes="(min-width: 1024px) 48vw, 92vw" loading={i < 2 ? "eager" : "lazy"} />
              </div>
              <div>
                <span className="wcard-n" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="label" style={{ marginTop: "1rem" }}>
                  {p.tag}
                </p>
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <div className="wcard-tags">
                  {p.stack.map((t) => (
                    <span key={t} className="tag">
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    Visit site <ArrowUpRight size={16} aria-hidden="true" />
                    <span className="sr-only">(opens {p.title} in a new tab)</span>
                  </a>
                )}
              </div>
            </article>
          ))}
          <div className="wcard-end">
            <p className="display h-lg" style={{ margin: 0 }}>
              {ALL_WORK.length} projects across {Object.keys(SECTORS).length} industries.
            </p>
            <div>
              <Link href="/work" className="btn">
                See all work <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
