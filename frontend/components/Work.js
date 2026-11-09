"use client";
import { useState } from "react";
import { PROJECTS, ALL_WORK, WORK_TABS, SECTORS } from "@/data/site";
import Reveal from "./Reveal";
import Clip from "./Clip";
import { Arrow } from "./Icons";

const PER_TAB = 4; // projects shown on the home page for one category
const SINGULAR = { websites: "Website", systems: "Management system", saas: "SaaS", samples: "Sample" };
const sectorLabel = (id) => SECTORS.find(([s]) => s === id)?.[1];

// A catalogue entry shaped like a featured card (featured text wins when the same project exists).
function toCard(w) {
  const f = PROJECTS.find((p) => p.id === w.id);
  if (f) return f;
  return {
    id: w.id,
    tag: (w.sector && sectorLabel(w.sector)) || SINGULAR[w.tab],
    title: w.title,
    blurb: w.kind,
    stack: w.tags,
    link: w.link,
    shots: w.shots,
    video: w.video,
    poster: w.poster,
  };
}

const TABS = [{ id: "all", label: "All", count: ALL_WORK.length }, ...WORK_TABS.map((t) => ({ ...t, count: ALL_WORK.filter((w) => w.tab === t.id).length }))];

// Cards stay short: one line saying what it is (the catalogue's short description), no long paragraph.
const short = (p) => ({ ...p, blurb: ALL_WORK.find((w) => w.id === p.id)?.kind || p.blurb, result: null });

export default function Work() {
  const [tab, setTab] = useState("all");
  const list = (tab === "all" ? PROJECTS : ALL_WORK.filter((w) => w.tab === tab).slice(0, PER_TAB).map(toCard)).map(short);
  const cur = TABS.find((t) => t.id === tab);
  const more =
    tab === "all"
      ? { href: "/work", label: "See all projects", n: ALL_WORK.length }
      : { href: `/work?tab=${tab}`, label: `See all ${cur.label.toLowerCase()}`, n: cur.count };

  return (
    <section id="work" className="work">
      <div className="work-head">
        <Reveal as="h2">Selected work</Reveal>
        <Reveal as="p" delay={80} className="work-sub">
          Recent client projects, from small business websites to software that runs a whole operation.
        </Reveal>
      </div>

      <div className="work-tabs work-tabs-home" role="tablist" aria-label="Project category">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`wt-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls="work-list"
            className={tab === t.id ? "is-on" : undefined}
            onClick={() => setTab(t.id)}
          >
            {t.label} <span>{t.count}</span>
          </button>
        ))}
      </div>
      <p className="swipe-hint" aria-hidden="true">
        Swipe to see more <Arrow />
      </p>

      <div className="stack" id="work-list" role="tabpanel" aria-labelledby={`wt-${tab}`} key={tab}>
        {list.map((p, i) => (
          <article key={p.id} className={`card k${i % 4}`} style={{ "--k": i }}>
            <div className="card-info">
              <span className="pill-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              {p.blurb && <p>{p.blurb}</p>}
              {p.stack?.length > 0 && (
                <ul className="tags">
                  {p.stack.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              )}
              {p.result && <p className="result">{p.result}</p>}
              {p.link && (
                <a className="visit" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.title} website`}>
                  <span className="visit-text">Visit website</span> <Arrow />
                </a>
              )}
            </div>
            <Clip p={p} />
          </article>
        ))}
      </div>

      <div className="work-more">
        <a href={more.href} className="btn btn-violet">
          {more.label} <span className="work-count">{more.n}</span> <Arrow />
        </a>
      </div>
    </section>
  );
}
