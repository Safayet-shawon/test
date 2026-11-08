"use client";
import { useEffect, useState } from "react";
import { ALL_WORK, WORK_TABS, SECTORS } from "@/data/site";
import Clip from "./Clip";
import { Arrow } from "./Icons";

function Tile({ p }) {
  return (
    <article className="tile">
      <Clip p={p} tilt={false} />
      <div className="tile-info">
        <h3>{p.title}</h3>
        <p className="tile-kind">{p.kind}</p>
        <ul className="tags">
          {p.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {p.link && (
          <a className="tile-visit" href={p.link} target="_blank" rel="noopener noreferrer">
            Visit website <Arrow />
          </a>
        )}
      </div>
    </article>
  );
}

// The full catalogue: one tab per service; websites grouped by the business they serve.
export default function AllWork() {
  const [tab, setTabState] = useState(WORK_TABS[0].id);
  // open the tab named in the link (/work?tab=systems) and keep the address in sync
  useEffect(() => {
    const t = new URLSearchParams(location.search).get("tab");
    if (WORK_TABS.some((x) => x.id === t)) setTabState(t);
  }, []);
  const setTab = (t) => {
    setTabState(t);
    history.replaceState(null, "", t === WORK_TABS[0].id ? "/work" : `/work?tab=${t}`);
  };
  const current = WORK_TABS.find((t) => t.id === tab);
  const items = ALL_WORK.filter((p) => p.tab === tab);
  const groups = tab === "websites" ? SECTORS.map(([id, label]) => [label, items.filter((p) => p.sector === id)]).filter(([, l]) => l.length) : [[null, items]];

  return (
    <>
      <div className="work-tabs" role="tablist" aria-label="Project type">
        {WORK_TABS.map((t) => {
          const n = ALL_WORK.filter((p) => p.tab === t.id).length;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls="work-panel"
              className={tab === t.id ? "is-on" : undefined}
              onClick={() => setTab(t.id)}
            >
              {t.label} <span>{n}</span>
            </button>
          );
        })}
      </div>

      <div id="work-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="work-panel" key={tab}>
        <p className="work-panel-blurb">{current.blurb}</p>
        {groups.map(([label, list]) => (
          <section key={label || "all"} className="work-group" aria-label={label || current.label}>
            {label && <h2 className="work-group-title">{label}</h2>}
            <div className="tiles">
              {list.map((p) => (
                <Tile key={p.id} p={p} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
