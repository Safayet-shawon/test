import { PROJECTS } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

/* ---------- Microservice architecture: request flows through the services ---------- */
const NODES = [
  { id: "auth", label: "Auth Service", sub: "verifies token", y: 6, s: 0.1 },
  { id: "product", label: "Product Service", sub: "catalog & prices", y: 30, s: 0.28 },
  { id: "inv", label: "Inventory Service", sub: "reserves stock", y: 54, s: 0.46 },
  { id: "order", label: "Order Service", sub: "creates the order", y: 78, s: 0.64 },
];
const CAPTIONS = [
  ["Client sends a request to the API Gateway", 0],
  ["Auth Service verifies the token", 0.1],
  ["Product Service returns the item", 0.28],
  ["Inventory Service reserves stock", 0.46],
  ["Order Service creates the order", 0.64],
  ["Gateway replies: order confirmed", 0.84],
];

function Packet({ d, s, e, rev = false }) {
  // dot travels along path d between fractions s..e of the 8s loop
  const kp = rev ? "1;1;0;0" : "0;0;1;1";
  return (
    <circle r="1.7" className="pkt">
      <animateMotion dur="8s" repeatCount="indefinite" path={d} keyPoints={kp} keyTimes={`0;${s};${e};1`} calcMode="linear" />
      <animate attributeName="opacity" dur="8s" repeatCount="indefinite" values="0;1;0" keyTimes={`0;${s};${e}`} calcMode="discrete" />
    </circle>
  );
}

function Micro() {
  const gw = (y) => `M66 50 C80 50 82 ${y} 96 ${y}`;
  return (
    <div className="scr scr-micro">
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
        {/* connections */}
        <path className="wire" d="M26 50 H40" />
        {NODES.map((n) => (
          <path key={n.id} className="wire" d={gw(n.y + 7.5)} />
        ))}
        <path className="wire dashed" d="M117 69 V78" />

        {/* client */}
        <g className="mnode" style={{ "--s": 0 }}>
          <rect x="4" y="38" width="22" height="24" rx="3" />
          <text x="15" y="49" className="t">Client</text>
          <text x="15" y="55" className="t2">browser</text>
        </g>
        {/* gateway */}
        <g className="mnode gw" style={{ "--s": 0.02 }}>
          <rect x="40" y="34" width="26" height="32" rx="3" />
          <text x="53" y="48" className="t">API</text>
          <text x="53" y="54" className="t">Gateway</text>
        </g>
        {/* services */}
        {NODES.map((n) => (
          <g key={n.id} className="mnode svc" style={{ "--s": n.s }}>
            <rect x="96" y={n.y} width="44" height="15" rx="3" />
            <text x="118" y={n.y + 6.4} className="t">{n.label}</text>
            <text x="118" y={n.y + 11.4} className="t2">{n.sub}</text>
            <g className="db" transform={`translate(143 ${n.y + 3})`}>
              <ellipse cx="6" cy="2" rx="6" ry="2" />
              <path d="M0 2 V9 A6 2 0 0 0 12 9 V2" />
            </g>
          </g>
        ))}

        {/* packets: request flows in, then out */}
        <Packet d="M26 50 H40" s={0} e={0.1} />
        <Packet d={gw(13.5)} s={0.1} e={0.2} />
        <Packet d={gw(37.5)} s={0.28} e={0.38} />
        <Packet d={gw(61.5)} s={0.46} e={0.56} />
        <Packet d={gw(85.5)} s={0.64} e={0.74} />
        <Packet d="M117 69 V78" s={0.74} e={0.8} />
        <Packet d="M26 50 H40" s={0.86} e={0.96} rev />
      </svg>
      <div className="caps">
        {CAPTIONS.map(([t, s]) => (
          <span key={t} style={{ "--s": s }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- tomadaxhis: symbolic design -> features -> live workflow ---------- */
function Flow() {
  return (
    <div className="scr scr-flow">
      <ol className="stepper">
        {["Sketch", "Design", "Features", "Live"].map((t, i) => (
          <li key={t} style={{ "--s": i * 0.25 }}>
            <i>{i + 1}</i>
            {t}
          </li>
        ))}
      </ol>
      <div className="canvas">
        <div className="wf wnav"><span /><span /><span /></div>
        <div className="wf whero"><b /><b /></div>
        <div className="wf cards"><span /><span /><span /></div>
        <div className="feat f1" />
        <div className="feat f2" />
        <div className="feat f3" />
        <div className="live-badge">LIVE</div>
        <span className="cur" />
      </div>
    </div>
  );
}

/* ---------- Architect portfolio: count -> flash -> polaroid ---------- */
function Arch() {
  return (
    <div className="scr scr-arch">
      <div className="cnt" aria-hidden="true" />
      <div className="roles">architect · photographer · traveller</div>
      <div className="flash" />
      <div className="polaroid">
        <div className="ph" />
        <span>PHOTOGRAPHER</span>
      </div>
    </div>
  );
}

/* ---------- singledotstudio: one dot -> a whole layout ---------- */
function Dot() {
  return (
    <div className="scr scr-dot">
      <span className="dot" />
      <span className="ripple" />
      <div className="layout">
        <i style={{ "--i": 0 }} />
        <i style={{ "--i": 1 }} />
        <i style={{ "--i": 2 }} />
        <i style={{ "--i": 3 }} />
        <i style={{ "--i": 4 }} />
      </div>
    </div>
  );
}

function Screen({ variant }) {
  switch (variant) {
    case "micro":
      return <Micro />;
    case "flow":
      return <Flow />;
    case "arch":
      return <Arch />;
    default:
      return <Dot />;
  }
}

function Clip({ p }) {
  return (
    <div className="clip">
      {p.video ? <video src={p.video} autoPlay muted loop playsInline /> : <Screen variant={p.variant} />}
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
              {p.link && (
                <a className="visit" href={p.link} target="_blank" rel="noopener noreferrer">
                  Visit site <Arrow />
                </a>
              )}
            </div>
            <Clip p={p} />
          </article>
        ))}
      </div>
    </section>
  );
}
