import fs from "node:fs";
import path from "node:path";
import { PROJECTS } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

/* ---------- EcomMS: two apps -> API gateway -> four services ---------- */
const NODES = [
  { id: "auth", label: "Auth Service", sub: "sign-in & roles", y: 6, s: 0.1 },
  { id: "product", label: "Product Service", sub: "catalog & inventory", y: 30, s: 0.26 },
  { id: "order", label: "Order Service", sub: "cart to order", y: 54, s: 0.42 },
  { id: "notif", label: "Notification Service", sub: "emails & alerts", y: 78, s: 0.58 },
];
const CAPTIONS = [
  ["Storefront sends a request to the API Gateway", 0],
  ["Auth Service signs the customer in", 0.1],
  ["Product Service serves catalog & stock", 0.26],
  ["Order Service places the order", 0.42],
  ["Notification Service confirms to the customer", 0.58],
  ["Admin console updates products & inventory", 0.72],
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
  const clients = [
    { id: "store", label: "Storefront", sub: "customers", y: 12, s: 0, to: "M26 23 C34 23 34 44 40 44" },
    { id: "admin", label: "Admin", sub: "console", y: 62, s: 0.72, to: "M26 73 C34 73 34 56 40 56" },
  ];
  return (
    <div className="scr scr-micro">
      <svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid meet">
        {clients.map((c) => (
          <path key={c.id} className="wire" d={c.to} />
        ))}
        {NODES.map((n) => (
          <path key={n.id} className="wire" d={gw(n.y + 7.5)} />
        ))}
        <path className="wire dashed" d="M118 69 V78" />

        {clients.map((c) => (
          <g key={c.id} className="mnode" style={{ "--s": c.s }}>
            <rect x="4" y={c.y} width="22" height="22" rx="3" />
            <text x="15" y={c.y + 10} className="t">{c.label}</text>
            <text x="15" y={c.y + 15.5} className="t2">{c.sub}</text>
          </g>
        ))}
        <g className="mnode gw" style={{ "--s": 0.02 }}>
          <rect x="40" y="34" width="26" height="32" rx="3" />
          <text x="53" y="48" className="t">API</text>
          <text x="53" y="54" className="t">Gateway</text>
        </g>
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

        {/* storefront journey */}
        <Packet d={clients[0].to} s={0} e={0.09} />
        <Packet d={gw(13.5)} s={0.1} e={0.19} />
        <Packet d={gw(37.5)} s={0.26} e={0.35} />
        <Packet d={gw(61.5)} s={0.42} e={0.51} />
        <Packet d="M118 69 V78" s={0.58} e={0.66} />
        {/* admin journey */}
        <Packet d={clients[1].to} s={0.72} e={0.8} />
        <Packet d={gw(37.5)} s={0.82} e={0.91} />
      </svg>
      <div className="caps">
        {CAPTIONS.map(([t, s]) => (
          <span key={t} style={{ "--s": s }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

/* ---------- tomadachis.com: its real look, built step by step ---------- */
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
        <div className="wf wnav">
          <em className="logo-m" />
          <span /><span /><span /><span />
          <u className="login" />
        </div>
        <div className="wf whero">
          <div className="txt">
            <b /><b /><i className="sub" />
          </div>
          <div className="img" />
        </div>
        <div className="wf wpills">
          <span className="p1">Shop Now</span>
          <span className="p2">Vet Care</span>
          <span className="p3">Adopt</span>
        </div>
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

/* ---------- Single Dot Studio: room sizes -> estimate -> quotation PDF -> email ---------- */
function Calc() {
  return (
    <div className="scr scr-calc">
      <div className="rooms">
        {["Living room", "Bedroom", "Kitchen"].map((r, i) => (
          <div key={r} className="room" style={{ "--i": i }}>
            <span>{r}</span>
            <div className="trk">
              <i />
            </div>
          </div>
        ))}
        <div className="est">
          <b>ESTIMATE</b>
          <div className="est-bar"><i /></div>
        </div>
      </div>
      <div className="pdf">
        <h5>QUOTATION</h5>
        <i /><i /><i /><i />
        <u>TOTAL</u>
      </div>
      <div className="sent">✓ sent to your inbox</div>
      <span className="cur" />
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
      return <Calc />;
  }
}

// Real screenshots: drop `public/projects/<id>.webp` (and optionally `<id>-2.webp`) and the card
// shows them (slow auto-pan, crossfading) instead of the animated stand-in. No code change needed.
function shotsFor(id) {
  const dir = path.join(process.cwd(), "public", "projects");
  const out = [];
  for (const suffix of ["", "-2", "-3"]) {
    for (const ext of ["webp", "png", "jpg"]) {
      if (fs.existsSync(path.join(dir, `${id}${suffix}.${ext}`))) {
        out.push(`/projects/${id}${suffix}.${ext}`);
        break;
      }
    }
  }
  return out;
}

function Clip({ p }) {
  const shots = shotsFor(p.id);
  const host = p.link ? p.link.replace(/^https?:\/\//, "") : `${p.id}.app`;
  return (
    <div className={`clip ${shots.length ? "has-shot" : ""}`} data-tilt>
      {p.video ? (
        <video src={p.video} autoPlay muted loop playsInline />
      ) : shots.length ? (
        <>
          <div className="chrome">
            <i />
            <i />
            <i />
            <span>{host}</span>
          </div>
          <div className={`shots n${shots.length}`}>
            {shots.map((src, i) => (
              <div key={src} className="shot" style={{ backgroundImage: `url(${src})`, "--i": i }} />
            ))}
          </div>
        </>
      ) : (
        <Screen variant={p.variant} />
      )}
      <span className="rec">
        <i /> {shots.length ? "snapshot" : "loop"}
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
