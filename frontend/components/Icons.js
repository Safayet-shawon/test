import { useId } from "react";

const D = "#14161f"; // neutral outline (not our brand ink — these are "client" colours)

// Exploded phone (iPhone-style teardown): seven real-looking parts float apart in 3D, labels appear as they separate.
// Each layer is drawn as SVG (viewBox 100 x 207); CSS stacks them in depth and animates the gap.
const PHONE_LAYERS = [
  ["back", "Back glass"],
  ["cam", "Camera system"],
  ["batt", "Battery"],
  ["logic", "Logic board + chip"],
  ["frame", "Titanium frame"],
  ["oled", "OLED display"],
  ["glass", "Cover glass"],
];

function PhoneArt({ k, id }) {
  const g = (n) => `url(#${id}${n})`;
  const lens = (cx, cy, r) => (
    <g key={`${cx}-${cy}`}>
      <circle cx={cx} cy={cy} r={r + 2.2} fill="#0b0c10" stroke="#9a9ea9" strokeWidth="1" />
      <circle cx={cx} cy={cy} r={r} fill={g("len")} stroke="#3b3e48" strokeWidth="1" />
      <circle cx={cx - r * 0.35} cy={cy - r * 0.38} r={r * 0.2} fill="#fff" opacity=".75" />
    </g>
  );
  const defs = (
    <defs>
      <linearGradient id={`${id}glass`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#3b3d46" />
        <stop offset="1" stopColor="#15161a" />
      </linearGradient>
      <radialGradient id={`${id}len`} cx=".35" cy=".3" r=".9">
        <stop offset="0" stopColor="#7aa8ff" />
        <stop offset=".35" stopColor="#1d2a58" />
        <stop offset="1" stopColor="#04050b" />
      </radialGradient>
      <linearGradient id={`${id}ti`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#a6a198" />
        <stop offset=".25" stopColor="#e4e0d6" />
        <stop offset=".55" stopColor="#8d887f" />
        <stop offset="1" stopColor="#bdb8ad" />
      </linearGradient>
      <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1b0f45" />
        <stop offset=".55" stopColor="#4a22a8" />
        <stop offset="1" stopColor="#0b4aa8" />
      </linearGradient>
      <linearGradient id={`${id}sheen`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fff" stopOpacity=".0" />
        <stop offset=".45" stopColor="#fff" stopOpacity=".38" />
        <stop offset=".6" stopColor="#fff" stopOpacity=".0" />
      </linearGradient>
      <linearGradient id={`${id}steel`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d3d6dc" />
        <stop offset="1" stopColor="#7f8591" />
      </linearGradient>
      <linearGradient id={`${id}pcb`} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#1d4a3f" />
        <stop offset="1" stopColor="#0c231e" />
      </linearGradient>
    </defs>
  );
  const body = (() => {
    switch (k) {
      case "back":
        return (
          <>
            <rect x="3" y="2" width="94" height="203" rx="14" fill={g("glass")} stroke="rgba(255,255,255,.2)" strokeWidth=".8" />
            <path d="M3 150 L60 2 H83 A14 14 0 0 1 97 16 V60 L24 205 H17 A14 14 0 0 1 3 191Z" fill={g("sheen")} opacity=".55" />
            <rect x="9" y="8" width="48" height="48" rx="12" fill="#474a54" stroke="rgba(255,255,255,.22)" strokeWidth=".8" />
            {lens(23, 22, 7.4)}
            {lens(23, 42, 7.4)}
            {lens(43, 32, 7.4)}
            <circle cx="49" cy="14" r="2.6" fill="#f3e6b0" />
            <circle cx="49" cy="50" r="2.4" fill="#0b0c10" stroke="#777" strokeWidth=".6" />
            <circle cx="50" cy="132" r="27" fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="1.3" />
            <circle cx="50" cy="132" r="22" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1" />
          </>
        );
      case "cam":
        return (
          <>
            <path d="M30 56 V96 Q30 104 38 104 H52" fill="none" stroke="#d9a441" strokeWidth="3" strokeLinecap="round" />
            <rect x="52" y="98" width="14" height="12" rx="2" fill="#d9a441" />
            <rect x="9" y="8" width="48" height="48" rx="12" fill="#1c1e25" stroke="#454955" strokeWidth="1" />
            {lens(23, 22, 8.2)}
            {lens(23, 42, 8.2)}
            {lens(43, 32, 8.2)}
            <circle cx="49" cy="14" r="2.6" fill="#f3e6b0" />
            <circle cx="49" cy="50" r="2.4" fill="#05060a" stroke="#777" strokeWidth=".6" />
          </>
        );
      case "batt":
        return (
          <>
            <rect x="14" y="60" width="72" height="104" rx="9" fill={g("steel")} stroke="rgba(0,0,0,.25)" strokeWidth=".8" />
            <path d="M50 60 V164" stroke="rgba(0,0,0,.2)" strokeWidth="1" />
            <rect x="22" y="70" width="22" height="3" rx="1.5" fill="rgba(0,0,0,.35)" />
            <rect x="56" y="70" width="22" height="3" rx="1.5" fill="rgba(0,0,0,.35)" />
            <rect x="22" y="78" width="30" height="2" rx="1" fill="rgba(0,0,0,.22)" />
            <rect x="38" y="52" width="24" height="9" rx="2" fill="#2a2c33" />
            <rect x="42" y="54" width="6" height="5" fill="#d9a441" />
            <rect x="52" y="54" width="6" height="5" fill="#d9a441" />
            {[0, 1, 2].map((i) => (
              <rect key={i} x={20 + i * 22} y="168" width="14" height="8" rx="2" fill="#e8e3d8" opacity=".85" />
            ))}
          </>
        );
      case "logic":
        return (
          <>
            <path d="M14 22 H86 V76 H72 V150 H30 V76 H14 Z" fill={g("pcb")} stroke="#6fcfb5" strokeOpacity=".45" strokeWidth="1" strokeLinejoin="round" />
            <path d="M18 34 H82 M18 50 H44 M60 50 H82 M30 80 V146 M40 80 V146 M62 80 V146" stroke="#d9b36a" strokeOpacity=".45" strokeWidth=".7" fill="none" />
            <rect x="24" y="28" width="26" height="26" rx="3.5" fill="#0a0b0f" stroke="#d9b36a" strokeWidth="1" />
            <rect x="30" y="34" width="14" height="14" rx="2" fill="#2f3646" stroke="#7aa8ff" strokeWidth=".8" />
            <rect x="58" y="28" width="20" height="14" rx="2" fill="#13151b" stroke="#d9b36a" strokeWidth=".8" />
            <rect x="58" y="46" width="12" height="8" rx="1.5" fill="#13151b" stroke="#d9b36a" strokeWidth=".8" />
            <rect x="20" y="62" width="16" height="10" rx="2" fill="#13151b" stroke="#d9b36a" strokeWidth=".8" />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <rect key={i} x={36 + i * 5} y="118" width="3" height="6" fill="#d9b36a" opacity=".85" />
            ))}
            <rect x="34" y="136" width="30" height="8" rx="1.5" fill="#d9a441" opacity=".9" />
          </>
        );
      case "frame":
        return (
          <>
            <path
              fillRule="evenodd"
              d="M17 2 H83 A14 14 0 0 1 97 16 V191 A14 14 0 0 1 83 205 H17 A14 14 0 0 1 3 191 V16 A14 14 0 0 1 17 2 Z M20 7 H80 A10 10 0 0 1 90 17 V190 A10 10 0 0 1 80 200 H20 A10 10 0 0 1 10 190 V17 A10 10 0 0 1 20 7 Z"
              fill={g("ti")}
              stroke="rgba(0,0,0,.35)"
              strokeWidth=".8"
            />
            <rect x="0.4" y="38" width="3" height="8" rx="1.2" fill="#cfcac0" />
            <rect x="0.4" y="58" width="3" height="14" rx="1.2" fill="#cfcac0" />
            <rect x="0.4" y="76" width="3" height="14" rx="1.2" fill="#cfcac0" />
            <rect x="96.6" y="64" width="3" height="24" rx="1.2" fill="#cfcac0" />
            <rect x="40" y="200.4" width="20" height="3" rx="1.5" fill="#15161a" />
            {[0, 1, 2, 3].map((i) => (
              <circle key={i} cx={22 + i * 3.6} cy="202" r="0.9" fill="#15161a" />
            ))}
          </>
        );
      case "oled": {
        const cols = ["#ff5f57", "#febc2e", "#28c840", "#5ac8fa", "#af52de", "#ff9f0a", "#34c759", "#0a84ff"];
        return (
          <>
            <rect x="6" y="5" width="88" height="197" rx="12" fill={g("wall")} />
            <ellipse cx="68" cy="60" rx="40" ry="46" fill="#8b6bff" opacity=".35" />
            <rect x="36" y="10" width="28" height="8.5" rx="4.2" fill="#000" />
            <text x="14" y="17.5" fontSize="6.4" fontWeight="700" fill="#fff">10:09</text>
            <rect x="74" y="12.5" width="13" height="5.4" rx="1.8" fill="none" stroke="#fff" strokeWidth=".8" />
            <rect x="75.4" y="13.8" width="8" height="2.8" rx="1" fill="#fff" />
            {Array.from({ length: 16 }, (_, i) => (
              <rect key={i} x={12 + (i % 4) * 20.5} y={42 + Math.floor(i / 4) * 24} width="16" height="16" rx="4.2" fill={cols[(i * 3) % cols.length]} opacity=".92" />
            ))}
            <rect x="12" y="176" width="76" height="22" rx="10" fill="rgba(255,255,255,.2)" />
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x={17 + i * 18.5} y="180" width="14" height="14" rx="3.6" fill={cols[(i * 2 + 1) % cols.length]} />
            ))}
          </>
        );
      }
      default:
        return (
          <>
            <rect x="3" y="2" width="94" height="203" rx="14" fill="rgba(255,255,255,.07)" stroke="rgba(255,255,255,.6)" strokeWidth="1" />
            <rect x="6" y="5" width="88" height="197" rx="12" fill="none" stroke="rgba(0,0,0,.4)" strokeWidth=".8" />
            <path d="M3 120 L52 2 H72 L3 190Z" fill={g("sheen")} opacity=".6" />
            <path d="M97 40 L97 90 L60 205 H40Z" fill={g("sheen")} opacity=".25" />
            <rect x="40" y="7" width="20" height="1.8" rx=".9" fill="rgba(255,255,255,.4)" />
          </>
        );
    }
  })();
  return (
    <svg viewBox="0 0 100 207" preserveAspectRatio="none" className="pl-art">
      {defs}
      {body}
    </svg>
  );
}

export function ExplodePhone({ live = false }) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`phone ${live ? "live" : ""}`} aria-hidden="true">
      <div className="stage">
        {PHONE_LAYERS.map(([k], i) => (
          <div key={k} className={`pl pl-${k}`} style={{ "--i": i }}>
            <PhoneArt k={k} id={`${id}${k}`} />
          </div>
        ))}
      </div>
      <ul className="plabels">
        {PHONE_LAYERS.map(([k, label], i) => (
          <li key={k} style={{ "--i": i }}>
            {label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BizIcon({ kind }) {
  switch (kind) {
    case "saas":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="18" y="34" width="164" height="130" rx="10" fill="#fff" stroke="#0F1536" strokeWidth="6" />
          <path d="M18 62 H182" stroke="#0F1536" strokeWidth="6" />
          <circle cx="36" cy="48" r="5" fill="#5B5BF0" />
          <rect x="36" y="118" width="22" height="32" fill="#8E8EFA" />
          <rect x="68" y="96" width="22" height="54" fill="#5B5BF0" />
          <rect x="100" y="106" width="22" height="44" fill="#8E8EFA" />
          <rect x="132" y="80" width="22" height="70" fill="#0F1536" />
        </svg>
      );
    case "perfume":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="84" y="16" width="32" height="26" rx="4" fill="#b08d57" />
          <rect x="94" y="40" width="12" height="14" fill="#d8c9a8" />
          <rect x="50" y="54" width="100" height="130" rx="18" fill="#efe6d4" fillOpacity=".9" stroke="#b08d57" strokeWidth="3" />
          <rect x="66" y="108" width="68" height="44" rx="4" fill="none" stroke="#b08d57" strokeWidth="1.5" />
          <text x="100" y="136" textAnchor="middle" fontSize="13" fill="#8a6a35" fontFamily="serif">AURE</text>
          <path d="M62 66 V170" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".6" />
        </svg>
      );
    case "gym":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="62" y="92" width="76" height="16" rx="5" fill="#e5e7eb" stroke="#0b0b0f" strokeWidth="3" />
          <rect x="34" y="60" width="26" height="80" rx="8" fill="#c6ff00" stroke="#0b0b0f" strokeWidth="6" />
          <rect x="140" y="60" width="26" height="80" rx="8" fill="#c6ff00" stroke="#0b0b0f" strokeWidth="6" />
          <rect x="14" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#0b0b0f" strokeWidth="6" />
          <rect x="168" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#0b0b0f" strokeWidth="6" />
        </svg>
      );
    case "hardware":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="60" y="14" width="80" height="172" rx="18" fill="#12151c" stroke="#8b93a3" strokeWidth="4" />
          <rect x="67" y="22" width="66" height="156" rx="12" fill="url(#ph-g)" />
          <defs>
            <linearGradient id="ph-g" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#1a1040" />
              <stop offset=".6" stopColor="#0a2f6b" />
              <stop offset="1" stopColor="#3a1d7a" />
            </linearGradient>
          </defs>
          <rect x="88" y="28" width="24" height="6" rx="3" fill="#000" />
          <circle cx="100" cy="112" r="22" fill="none" stroke="#4da3ff" strokeWidth="3" opacity=".7" />
          <circle cx="100" cy="112" r="9" fill="#4da3ff" opacity=".85" />
        </svg>
      );
    default:
      return null;
  }
}

export function Arrow({ className = "" }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Golden spiral (quarter arcs, each radius = previous / phi), centred on its "eye".
const PHI = 1.618033988749895;
export function goldenSpiral(r0 = 600, arcs = 12) {
  let x = 0,
    y = 0,
    tx = 1,
    ty = 0,
    r = r0;
  const pts = [[x, y]];
  const segs = [];
  for (let i = 0; i < arcs; i++) {
    const nx = ty, // rotate tangent 90deg
      ny = -tx;
    const cx = x + r * nx,
      cy = y + r * ny;
    const ex = cx + r * tx,
      ey = cy + r * ty;
    segs.push({ r, ex, ey });
    pts.push([ex, ey]);
    x = ex;
    y = ey;
    tx = nx;
    ty = ny;
    r /= PHI;
  }
  const eye = pts[pts.length - 1];
  let d = `M${(pts[0][0] - eye[0]).toFixed(1)} ${(pts[0][1] - eye[1]).toFixed(1)}`;
  segs.forEach((s) => {
    d += ` A${s.r.toFixed(1)} ${s.r.toFixed(1)} 0 0 1 ${(s.ex - eye[0]).toFixed(1)} ${(s.ey - eye[1]).toFixed(1)}`;
  });
  return d;
}
