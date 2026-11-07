const D = "#14161f"; // neutral outline (not our brand ink — these are "client" colours)

// Apple-style exploded phone: layers float apart in 3D (CSS), labels appear as they separate.
const PHONE_LAYERS = [
  ["back", "Back glass"],
  ["batt", "Battery"],
  ["logic", "Logic board + chip"],
  ["cam", "Camera system"],
  ["oled", "OLED display"],
  ["glass", "Cover glass"],
];
export function ExplodePhone({ live = false }) {
  return (
    <div className={`phone ${live ? "live" : ""}`} aria-hidden="true">
      <div className="stage">
        {PHONE_LAYERS.map(([k], i) => (
          <div key={k} className={`pl pl-${k}`} style={{ "--i": i }}>
            {k === "logic" && (
              <>
                <b className="chip1" />
                <b className="chip2" />
                <b className="chip3" />
              </>
            )}
            {k === "cam" && (
              <span className="lenses">
                <i />
                <i />
                <i />
              </span>
            )}
            {k === "oled" && <span className="notch" />}
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
    case "pizza":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <circle cx="100" cy="100" r="92" fill="#C98A3C" />
          <circle cx="100" cy="100" r="80" fill="#F6C65B" />
          <path d="M100 100 L100 20 A80 80 0 0 1 169 60 Z" fill="#FFE29A" opacity=".55" />
          {[[70, 70], [128, 66], [145, 118], [96, 140], [58, 114], [100, 98]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="15" fill="#C8301C" />
              <circle cx={x - 4} cy={y - 4} r="4" fill="#F08A70" opacity=".7" />
            </g>
          ))}
          {[[84, 100], [118, 90], [76, 138], [132, 140]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q8 -14 16 0 q-8 10 -16 0z`} fill="#2E9E4F" />
          ))}
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <path d="M70 70 V58 a30 30 0 0 1 60 0 V70" fill="none" stroke={D} strokeWidth="9" strokeLinecap="round" />
          <path d="M34 70 H166 L176 176 H24Z" fill="#FF5A1F" stroke={D} strokeWidth="6" strokeLinejoin="round" />
          <path d="M34 70 H166 L170 112 H30Z" fill="#FF8A4D" />
          <circle cx="100" cy="132" r="15" fill="#fff" />
          <path d="M92 132 l6 6 l11 -12" fill="none" stroke="#FF5A1F" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <g className="steam" fill="none" stroke="#F6E7D4" strokeWidth="6" strokeLinecap="round">
            <path d="M78 52 q-10 -14 0 -26 q10 -12 0 -24" />
            <path d="M104 56 q-10 -14 0 -26 q10 -12 0 -24" />
            <path d="M130 52 q-10 -14 0 -26 q10 -12 0 -24" />
          </g>
          <path d="M44 74 H156 L146 150 Q144 168 126 168 H74 Q56 168 54 150Z" fill="#F6E7D4" stroke={D} strokeWidth="6" strokeLinejoin="round" />
          <path d="M156 88 H170 Q190 90 188 114 Q186 138 150 138" fill="none" stroke="#F6E7D4" strokeWidth="9" strokeLinecap="round" />
          <path d="M48 98 H152 L148 128 H52Z" fill="#6B4630" />
          <rect x="28" y="168" width="144" height="10" rx="5" fill="#D9A066" />
        </svg>
      );
    case "gym":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="62" y="92" width="76" height="16" rx="5" fill="#E5E7EB" stroke="#0B0B0F" strokeWidth="3" />
          <rect x="34" y="60" width="26" height="80" rx="8" fill="#C6FF00" stroke="#0B0B0F" strokeWidth="6" />
          <rect x="140" y="60" width="26" height="80" rx="8" fill="#C6FF00" stroke="#0B0B0F" strokeWidth="6" />
          <rect x="14" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#0B0B0F" strokeWidth="6" />
          <rect x="168" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#0B0B0F" strokeWidth="6" />
        </svg>
      );
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
