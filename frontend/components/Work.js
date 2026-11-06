import { PROJECTS } from "@/data/site";
import Reveal from "./Reveal";

function Screen({ variant }) {
  switch (variant) {
    case "dash":
      return (
        <div className="scr scr-dash">
          <div className="side">
            <i />
            <i />
            <i />
          </div>
          <div className="main">
            <div className="kpis">
              <b />
              <b />
              <b />
            </div>
            <div className="chart">
              {[35, 55, 45, 75, 60, 90, 70].map((h, i) => (
                <i key={i} style={{ "--h": `${h}%`, "--i": i }} />
              ))}
              <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                <path d="M0 32 L16 24 L32 28 L50 14 L68 18 L84 6 L100 10" pathLength="1" />
              </svg>
            </div>
          </div>
          <span className="cur" />
        </div>
      );
    case "order":
      return (
        <div className="scr scr-order">
          <div className="pz">
            <i />
            <i />
            <i />
            <i />
          </div>
          <div className="panel-r">
            <b />
            <b />
            <span className="price" />
            <u>Order</u>
          </div>
          <span className="cur" />
        </div>
      );
    case "shop":
      return (
        <div className="scr scr-shop">
          <div className="count">
            <i />
            <i />
            <i />
          </div>
          <div className="grid">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ "--i": i }}>
                <span />
                <b />
              </div>
            ))}
          </div>
          <span className="cur" />
        </div>
      );
    default:
      return (
        <div className="scr scr-sub">
          <div className="cup" />
          <div className="opts">
            <b />
            <b />
            <b />
          </div>
          <div className="toggle">
            <i />
          </div>
          <span className="cur" />
        </div>
      );
  }
}

function Clip({ p }) {
  return (
    <div className="clip">
      {p.video ? (
        <video src={p.video} autoPlay muted loop playsInline />
      ) : (
        <Screen variant={p.variant} />
      )}
      <span className="rec">
        <i /> loop
      </span>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work-head">
        <Reveal as="p" className="eyebrow">
          Built &amp; shipped
        </Reveal>
        <Reveal as="h2" delay={80}>
          Stuff we made.
          <br />
          <span className="scribble">Press play.</span>
        </Reveal>
      </div>

      <div className="stack">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className={`card k${i % 4}`} style={{ "--k": i }}>
            <div className="card-info">
              <span className="pill-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="result">{p.result}</p>
            </div>
            <Clip p={p} />
          </article>
        ))}
      </div>
    </section>
  );
}
