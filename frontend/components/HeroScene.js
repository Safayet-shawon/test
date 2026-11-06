"use client";
import { useEffect, useState } from "react";
import { BUSINESSES } from "@/data/site";
import { BizIcon } from "./Icons";

const IDLE = 2600; // ms showing the plain object
const SITE_MS = 4400; // ms showing the generated website

export default function HeroScene({ onChange }) {
  const [idx, setIdx] = useState(0); // object currently shown
  const [siteIdx, setSiteIdx] = useState(0); // website currently shown
  const [phase, setPhase] = useState("idle");

  useEffect(() => {
    onChange?.(idx);
  }, [idx, onChange]);

  useEffect(() => {
    let t;
    if (phase === "idle") {
      t = setTimeout(() => {
        setSiteIdx(idx);
        setPhase("site");
      }, IDLE);
    } else {
      t = setTimeout(() => {
        setIdx((i) => (i + 1) % BUSINESSES.length);
        setPhase("idle");
      }, SITE_MS);
    }
    return () => clearTimeout(t);
  }, [phase, idx]);

  const obj = BUSINESSES[idx];
  const site = BUSINESSES[siteIdx];

  return (
    <div className="scene" data-phase={phase}>
      <div className="blob b-stone" />
      <div className="blob b-red" />
      <div className="ring" />
      <span className="spark s1" />
      <span className="spark s2" />
      <span className="spark s3" />

      <span className="chip c1">SaaS</span>
      <span className="chip c2">Shop</span>
      <span className="chip c3">Booking</span>

      {/* 1. the plain business */}
      <div className="obj-layer" key={`o${idx}`}>
        <div className="obj-float">
          <BizIcon kind={obj.kind} />
        </div>
        <p className="obj-label">
          your <b>{obj.label.replace(/s$/, "")}</b>
          <em> ...needs a website</em>
        </p>
      </div>

      {/* 2. ...becomes its website */}
      <div className="site-layer">
        <div className="browser" style={{ "--bg": site.bg, "--fg": site.fg, "--ac": site.accent }}>
          <div className="bar">
            <i />
            <i />
            <i />
            <span>{site.url}</span>
          </div>
          <div className="page">
            <div className="pnav pop" style={{ "--i": 0 }}>
              <b>{site.name}</b>
              <span>
                {site.nav.map((n, i) => (
                  <u key={n} className={i === site.nav.length - 1 ? "pill" : ""}>
                    {n}
                  </u>
                ))}
              </span>
            </div>
            <div className="phero">
              <div>
                <h4 className="pop" style={{ "--i": 1 }}>
                  {site.headline}
                </h4>
                <p className="pop" style={{ "--i": 2 }}>
                  {site.sub}
                </p>
                <button type="button" tabIndex={-1} className="pop pbtn" style={{ "--i": 3 }}>
                  {site.cta}
                </button>
              </div>
              <div className="phero-art pop" style={{ "--i": 2 }}>
                <BizIcon kind={site.kind} />
              </div>
            </div>
            <div className="pcards">
              {site.items.map(([n, p], i) => (
                <div key={n} className="pcard pop" style={{ "--i": 4 + i }}>
                  <span className="pthumb">
                    <BizIcon kind={site.kind} />
                  </span>
                  <b>{n}</b>
                  <small>{p}</small>
                </div>
              ))}
            </div>
            <span className="cursor" />
          </div>
        </div>
      </div>
    </div>
  );
}
