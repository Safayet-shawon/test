import { ExplodePhone } from "./Icons";

/* Six different demo websites for the hero. Each has its own layout, type and interaction,
   so we never look like we make the same site twice. Sizes are in cqw (they scale with the scene). */

/* ---------- 1. Interior studio: editorial + before/after slider ---------- */
function InteriorSite({ site }) {
  return (
    <div className="page dm dm-int">
      <div className="int-nav pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n) => (
            <u key={n}>{n}</u>
          ))}
        </span>
        <em>{site.navCta}</em>
      </div>
      <div className="int-copy pop" style={{ "--i": 1 }}>
        <small>{site.kicker}</small>
        <h4>{site.headline}</h4>
        <p>{site.sub}</p>
        <button type="button" tabIndex={-1}>{site.cta}</button>
        <div className="int-sw" aria-hidden="true">
          {site.swatches.map((c, i) => (
            <i key={c} style={{ "--c": c, "--k": i }} />
          ))}
        </div>
      </div>
      <div className="int-wrap pop" style={{ "--i": 2 }}>
        <div className="cmp">
          <img className="cmp-after" src={site.after} alt="" />
          <div className="cmp-before">
            <img src={site.before} alt="" />
          </div>
          <span className="cmp-tag l">Before</span>
          <span className="cmp-tag r">After</span>
          <div className="cmp-h">
            <i />
            <span className="cursor" />
          </div>
          <div className="cmp-chip">{site.room}</div>
        </div>
      </div>
    </div>
  );
}

/* ---------- 2. Real estate: search + 3D coverflow of listings ---------- */
function EstateSite({ site }) {
  return (
    <div className="page dm dm-est">
      <div className="est-nav pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n) => (
            <u key={n}>{n}</u>
          ))}
        </span>
        <em>Sign in</em>
      </div>
      <div className="est-search pop" style={{ "--i": 1 }}>
        <div>
          <small>Location</small>
          <b className="type">Downtown</b>
        </div>
        <div>
          <small>Type</small>
          <b>House</b>
        </div>
        <div>
          <small>Budget</small>
          <b>$600k – $1.3M</b>
        </div>
        <u>Search</u>
      </div>
      <div className="est-stage">
        {site.listings.map((l, i) => (
          <article key={l.title} className="cv" style={{ "--k": i }}>
            <div className="cv-img" style={{ backgroundImage: `url(${l.img})` }}>
              <span className="cv-price">{l.price}</span>
              <span className="cv-heart">♡</span>
            </div>
            <div className="cv-body">
              <b>{l.title}</b>
              <small>{l.meta}</small>
              <u>View home</u>
            </div>
          </article>
        ))}
      </div>
      <div className="est-count pop" style={{ "--i": 3 }}>
        <i /> 12 homes match your search
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---------- 3. Travel: full-bleed destination, fanned photo stack, flight route ---------- */
function TravelSite({ site }) {
  return (
    <div className="page dm dm-tr">
      <div className="tr-bg" style={{ backgroundImage: `url(${site.hero})` }} />
      <div className="tr-shade" />
      <div className="tr-big" aria-hidden="true">{site.dest}</div>
      <div className="tr-nav pop" style={{ "--i": 0 }}>
        <u>{site.nav[0]}</u>
        <b>{site.name}</b>
        <em>{site.nav[1]}</em>
      </div>
      <div className="tr-copy pop" style={{ "--i": 1 }}>
        <small>{site.kicker}</small>
        <h4>{site.headline}</h4>
        <span className="tr-cta">
          {site.cta}
          <i>→</i>
        </span>
      </div>
      <div className="tr-stack">
        {site.stack.map((c, i) => (
          <figure key={c.t} className="pop" style={{ "--i": 2 + i, "--n": i }}>
            <img src={c.img} alt="" />
            <figcaption>
              <b>{c.t}</b>
              <small>{c.p}</small>
            </figcaption>
          </figure>
        ))}
      </div>
      <div className="tr-route pop" style={{ "--i": 5 }}>
        <span className="a">{site.from}</span>
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" aria-hidden="true">
          <path id="route" d="M2 15 C 30 -4, 70 -4, 98 15" />
        </svg>
        <i className="plane">✈</i>
        <span className="b">{site.to}</span>
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---------- 4. Photographer: camera viewfinder + film strip ---------- */
function PhotoSite({ site }) {
  const strip = [...site.strip, ...site.strip];
  return (
    <div className="page dm dm-ph">
      <div className="ph-rail pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n) => (
            <u key={n}>{n}</u>
          ))}
        </span>
      </div>
      <div className="ph-main pop" style={{ "--i": 1 }}>
        <img src={site.hero} alt="" />
        <div className="vf" aria-hidden="true">
          <i className="c1" />
          <i className="c2" />
          <i className="c3" />
          <i className="c4" />
          <span className="x" />
        </div>
        <div className="ph-meta">
          <span>ISO 200 · f/1.8 · 1/250</span>
          <span className="fcount">07 / 36</span>
        </div>
        <div className="ph-title">
          <h4>{site.headline}</h4>
          <u>{site.cta} →</u>
        </div>
        <div className="flash" />
      </div>
      <div className="ph-film pop" style={{ "--i": 2 }}>
        <div className="ph-track">
          {strip.map((src, i) => (
            <div key={i} className="fr">
              <img src={src} alt="" />
              <small>{String((i % site.strip.length) + 1).padStart(2, "0")}</small>
            </div>
          ))}
        </div>
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---------- 5. SaaS: bento dashboard + ⌘K command palette ---------- */
function DashSite({ site }) {
  return (
    <div className="page dm dm-dash">
      <aside className="pop" style={{ "--i": 0 }}>
        {["◧", "◔", "▤", "◉", "⚙"].map((g, i) => (
          <span key={g} className={i === 0 ? "on" : ""}>{g}</span>
        ))}
      </aside>
      <div className="dash-top pop" style={{ "--i": 1 }}>
        <b>{site.name}</b>
        <div className="dash-search">Search or jump to… <kbd>⌘K</kbd></div>
        <i className="av" />
      </div>
      <div className="bento">
        <div className="bt rev pop" style={{ "--i": 2 }}>
          <small>Revenue · 30 days</small>
          <b>$48.2k <em>+12.4%</em></b>
          <svg viewBox="0 0 200 70" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="dgrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0" stopColor="#7c7cff" stopOpacity=".5" />
                <stop offset="1" stopColor="#7c7cff" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path className="area" d="M0 56 L22 46 L44 50 L66 32 L88 38 L110 22 L132 28 L154 12 L176 18 L200 6 L200 70 L0 70Z" fill="url(#dgrad)" />
            <path className="line" d="M0 56 L22 46 L44 50 L66 32 L88 38 L110 22 L132 28 L154 12 L176 18 L200 6" pathLength="1" />
          </svg>
        </div>
        <div className="bt ring pop" style={{ "--i": 3 }}>
          <small>Active plans</small>
          <svg viewBox="0 0 36 36" aria-hidden="true">
            <circle cx="18" cy="18" r="14" className="trk" />
            <circle cx="18" cy="18" r="14" className="val" pathLength="100" />
          </svg>
          <b>72%</b>
        </div>
        <div className="bt ai pop" style={{ "--i": 4 }}>
          <small>✦ Insight</small>
          <p>Churn dropped 0.3% after the new onboarding. Keep going.</p>
        </div>
        <div className="bt feed pop" style={{ "--i": 5 }}>
          {[["Acme Co.", "upgraded to Pro", "+$480"], ["Globex", "added 12 seats", "+$1,240"], ["Initech", "renewed", "+$480"]].map(([a, b, c], i) => (
            <div key={a} className="row" style={{ "--k": i }}>
              <i />
              <span><b>{a}</b> {b}</span>
              <em>{c}</em>
            </div>
          ))}
        </div>
      </div>
      <div className="palette" aria-hidden="true">
        <div className="pin"><span>new report</span><i /></div>
        <ul>
          <li><b>◧</b> New report</li>
          <li className="hot"><b>▤</b> New report from template</li>
          <li><b>◉</b> Invite teammate</li>
        </ul>
      </div>
      <span className="cursor" />
    </div>
  );
}

/* ---------- 6. Electronics: centred product stage with the exploded phone ---------- */
function TechSite({ site }) {
  return (
    <div className="page dm dm-tech">
      <div className="tech-nav pop" style={{ "--i": 0 }}>
        <b>{site.name}</b>
        <span>
          {site.nav.map((n) => (
            <u key={n}>{n}</u>
          ))}
        </span>
      </div>
      <div className="tech-head pop" style={{ "--i": 1 }}>
        <h4>{site.headline}</h4>
        <p>{site.sub}</p>
      </div>
      <div className="tech-phone pop" style={{ "--i": 2 }}>
        <ExplodePhone live />
      </div>
      <div className="tech-specs">
        {site.specs.map(([a, b], i) => (
          <div key={a} className={`sp pop sp${i}`} style={{ "--i": 3 + i }}>
            <small>{a}</small>
            <b>{b}</b>
          </div>
        ))}
      </div>
      <div className="tech-buy pop" style={{ "--i": 6 }}>
        <span className="dots">
          <i />
          <i />
          <i />
        </span>
        <u>{site.cta}</u>
      </div>
      <span className="cursor" />
    </div>
  );
}

export const SITES = {
  interior: InteriorSite,
  estate: EstateSite,
  travel: TravelSite,
  photo: PhotoSite,
  dash: DashSite,
  tech: TechSite,
};
