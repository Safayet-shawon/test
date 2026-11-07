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
