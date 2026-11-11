"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { ALL_WORK, WORK_TABS, SECTORS, type WorkItem } from "@/data/site";

function Item({ w, eager }: { w: WorkItem; eager: boolean }) {
  const [playing, setPlaying] = useState(false);
  const vid = useRef<HTMLVideoElement>(null);
  // scroll recordings play on hover (desktop) only; the poster frame is the still
  const play = () => {
    if (!w.video || !vid.current || prefersReducedMotion()) return;
    vid.current.play().then(() => setPlaying(true)).catch(() => {});
  };
  const stop = () => {
    vid.current?.pause();
    setPlaying(false);
  };
  return (
    <article className={`witem${playing ? " is-playing" : ""}`} onPointerEnter={play} onPointerLeave={stop}>
      <div className="witem-media">
        <Image src={w.image} alt={`${w.title}, ${w.kind.toLowerCase()}`} fill sizes="(min-width: 1000px) 31vw, (min-width: 620px) 46vw, 92vw" loading={eager ? "eager" : "lazy"} />
        {w.video && <video ref={vid} src={w.video} muted loop playsInline preload="none" aria-hidden="true" tabIndex={-1} />}
      </div>
      <div className="witem-meta">
        <h3>{w.title}</h3>
        {w.link && (
          <a href={w.link} target="_blank" rel="noopener noreferrer" className="witem-link link-u">
            Visit <ArrowUpRight size={15} aria-hidden="true" />
            <span className="sr-only">{w.title} (opens in a new tab)</span>
          </a>
        )}
      </div>
      <p>
        {w.kind}
        {w.sector ? ` · ${SECTORS[w.sector]}` : ""}
      </p>
      <div className="witem-tags">
        {w.tags.map((t) => (
          <span key={t} className="tag">
            {t}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function WorkIndex() {
  const [tab, setTab] = useState<(typeof WORK_TABS)[number]["id"]>("all");
  const grid = useRef<HTMLDivElement>(null);
  const items = tab === "all" ? ALL_WORK : ALL_WORK.filter((w) => w.tab === tab);
  const count = (id: string) => (id === "all" ? ALL_WORK.length : ALL_WORK.filter((w) => w.tab === id).length);

  useEffect(() => {
    const g = grid.current;
    if (!g || prefersReducedMotion()) return;
    const tween = gsap.fromTo(g.children, { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.05, duration: 1, ease: "expo.out" });
    ScrollTrigger.refresh();
    return () => {
      tween.kill();
    };
  }, [tab]);

  return (
    <section className="tone section" data-tone="light" style={{ paddingTop: "3rem" }} aria-label="All projects">
      <div className="wrap">
        <div className="filters" role="group" aria-label="Filter projects">
          {WORK_TABS.map((t) => (
            <button key={t.id} type="button" className="filter" aria-pressed={tab === t.id} onClick={() => setTab(t.id)}>
              {t.label}
              <sup>{count(t.id)}</sup>
            </button>
          ))}
        </div>
        {tab === "samples" && (
          <p className="lede" style={{ marginTop: "-1rem", marginBottom: "2rem" }}>
            Demo builds that show an idea. Their content is fictional.
          </p>
        )}
        <div ref={grid} className="wgrid" aria-live="polite">
          {items.map((w, i) => (
            <Item key={w.id} w={w} eager={i < 3} />
          ))}
        </div>
      </div>
    </section>
  );
}
