"use client";
import { useEffect, useState } from "react";
import { BUSINESSES, INTRO } from "@/data/site";
import { BizIcon, ExplodeDevice, goldenSpiral } from "./Icons";

const SPIRAL = goldenSpiral(600, 12);
const INTRO_MS = 3400; // "any business" collage
const IDLE = 2400; // plain object
const SITE_MS = 4400; // generated website


/* ---- photo-led editorial site (real photography) ---- */
function PhotoSite({ site }) {
  return (
    <div className={`page psite f-${site.font}`}>
      <div className="ph-bg" style={{ backgroundImage: `url(${site.hero})` }} />
      <div className="ph-shade" />
      <div className="ph-nav pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n) => (
            <u key={n}>{n}</u>
          ))}
        </span>
        <em className="pill">{site.navCta}</em>
      </div>
      <div className="ph-copy">
        <small className="pop" style={{ "--i": 1 }}>{site.kicker}</small>
        <h4 className="pop" style={{ "--i": 2 }}>{site.headline}</h4>
        <p className="pop" style={{ "--i": 3 }}>{site.sub}</p>
        <button type="button" tabIndex={-1} className="pop pbtn" style={{ "--i": 4 }}>{site.cta}</button>
      </div>
      <div className="ph-card pop" style={{ "--i": 4 }}>
        <h5>{site.panel.title}</h5>
        {site.panel.rows.map(([l, v]) => (
          <div key={l} className="row"><span>{l}</span><b>{v}</b></div>
        ))}
        <i className="meter" />
        <u>{site.panel.btn}</u>
      </div>
      <div className="ph-strip">
        {site.cards.map((c, i) => (
          <figure key={c.t} className="pop" style={{ "--i": 5 + i }}>
            <img src={c.img} alt="" />
            <figcaption>
              <b>{c.t}</b>
              <small>{c.s}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---- SaaS dashboard (real UI) ---- */
function DashSite({ site }) {
  const rows = [["Acme Co.", "Pro", "$480"], ["Globex", "Team", "$1,240"], ["Initech", "Pro", "$480"]];
  return (
    <div className="page dsite">
      <aside className="pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        {["Overview", "Customers", "Billing", "Reports", "Settings"].map((n, i) => (
          <span key={n} className={i === 0 ? "on" : ""}>{n}</span>
        ))}
      </aside>
      <div className="dmain">
        <div className="dtop pop" style={{ "--i": 1 }}>
          <h4>Good morning, Sam</h4>
          <u>+ New report</u>
        </div>
        <div className="kpis2">
          {[["Revenue", "$48.2k", "+12.4%"], ["Active users", "12,408", "+8.1%"], ["Churn", "1.2%", "-0.3%"]].map(([l, v, d], i) => (
            <div key={l} className="kpi pop" style={{ "--i": 2 + i }}>
              <small>{l}</small>
              <b>{v}</b>
              <em>{d}</em>
            </div>
          ))}
        </div>
        <div className="chart2 pop" style={{ "--i": 5 }}>
          <small>Revenue, last 30 days</small>
          <svg viewBox="0 0 200 60" preserveAspectRatio="none">
            <defs>
              <linearGradient id="dg" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#5B5BF0" stopOpacity=".35" />
                <stop offset="1" stopColor="#5B5BF0" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="area" d="M0 48 L20 40 L40 44 L60 28 L80 33 L100 20 L120 26 L140 12 L160 18 L180 6 L200 10 L200 60 L0 60Z" fill="url(#dg)" />
            <path className="line" d="M0 48 L20 40 L40 44 L60 28 L80 33 L100 20 L120 26 L140 12 L160 18 L180 6 L200 10" pathLength="1" />
          </svg>
        </div>
        <div className="tbl">
          {rows.map(([a, b, c], i) => (
            <div key={a} className="tr pop" style={{ "--i": 6 + i }}>
              <b>{a}</b>
              <span>{b}</span>
              <em>{c}</em>
            </div>
          ))}
        </div>
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---- generic (hardware teardown) ---- */
function GenericSite({ site }) {
  return (
    <div className="page gsite">
      <div className="pnav pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n, i) => (
            <u key={n} className={i === site.nav.length - 1 ? "pill" : ""}>{n}</u>
          ))}
        </span>
      </div>
      <div className="phero">
        <div>
          <h4 className="pop" style={{ "--i": 1 }}>{site.headline}</h4>
          <p className="pop" style={{ "--i": 2 }}>{site.sub}</p>
          <button type="button" tabIndex={-1} className="pop pbtn" style={{ "--i": 3 }}>{site.cta}</button>
        </div>
        <div className="phero-art pop" style={{ "--i": 2 }}>
          <ExplodeDevice live />
        </div>
      </div>
      <div className="pcards">
        {site.items.map(([n, p], i) => (
          <div key={n} className="pcard pop" style={{ "--i": 4 + i }}>
            <b>{n}</b>
            <small>{p}</small>
          </div>
        ))}
      </div>
      <span className="cursor" />
    </div>
  );
}

// step 0 = intro (any business), steps 1..n = BUSINESSES[step-1]
export default function HeroScene({ onChange }) {
  const [step, setStep] = useState(0);
  const [siteStep, setSiteStep] = useState(1);
  const [phase, setPhase] = useState("idle");
  const total = BUSINESSES.length + 1;

  useEffect(() => {
    onChange?.(step);
  }, [step, onChange]);

  useEffect(() => {
    let t;
    if (step === 0) {
      t = setTimeout(() => setStep(1), INTRO_MS);
    } else if (phase === "idle") {
      t = setTimeout(() => {
        setSiteStep(step);
        setPhase("site");
      }, IDLE);
    } else {
      t = setTimeout(() => {
        setStep((s) => (s % (total - 1)) + 1); // loop 1..n; intro plays once
        setPhase("idle");
      }, SITE_MS);
    }
    return () => clearTimeout(t);
  }, [phase, step, total]);

  const biz = step === 0 ? INTRO : BUSINESSES[step - 1];
  const site = BUSINESSES[siteStep - 1];

  return (
    <div className="scene" data-phase={step === 0 ? "intro" : phase}>
      {/* golden spiral: its eye sits behind the focal object so the eye is led to the animation */}
      <svg className="spiral" viewBox="-700 -700 1400 1400" aria-hidden="true">
        <path d={SPIRAL} />
      </svg>
      <div className="blob b-mocha" />
      <div className="ring" />
      <span className="spark s1" />
      <span className="spark s2" />
      <span className="spark s3" />
      <span className="chip c1">SaaS</span>
      <span className="chip c2">Shop</span>
      <span className="chip c3">Booking</span>

      <div className="obj-layer" key={`o${step}`}>
        {step === 0 ? (
          <div className="collage">
            {BUSINESSES.map((b, i) => (
              <span key={b.kind} className="col-item" style={{ "--a": `${i * (360 / BUSINESSES.length)}deg`, "--i": i }}>
                {b.hero ? <img src={b.cards[0].img} alt="" /> : <BizIcon kind={b.kind} />}
              </span>
            ))}
            <span className="col-core">any<br />business</span>
          </div>
        ) : (
          biz.hero ? (
            <div className="obj-photo">
              <img src={biz.hero} alt="" />
            </div>
          ) : (
            <div className="obj-float">
              <BizIcon kind={biz.kind} />
            </div>
          )
        )}
        <p className="obj-label">
          {step === 0 ? (
            <>
              we do <b>any business</b>
            </>
          ) : (
            <>
              your <b>{biz.single}</b>
              <em> needs a website</em>
            </>
          )}
        </p>
      </div>

      <div className="site-layer">
        <div
          className="browser"
          style={{ "--bg": site.bg, "--fg": site.fg, "--ac": site.accent, "--aon": site.aon }}
        >
          <div className="bar">
            <i />
            <i />
            <i />
            <span>{site.url}</span>
          </div>
          {site.layout === "photo" && <PhotoSite site={site} />}
          {site.layout === "dash" && <DashSite site={site} />}
          {site.layout === "generic" && <GenericSite site={site} />}
        </div>
      </div>

      <ol className="steps" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <li key={i} className={i === step ? "on" : i < step ? "done" : ""} />
        ))}
      </ol>
    </div>
  );
}
