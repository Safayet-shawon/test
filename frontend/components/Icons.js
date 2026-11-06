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
              <circle cx={x} cy={y} r="15" fill="#B5472D" />
              <circle cx={x - 4} cy={y - 4} r="4" fill="#E58A70" opacity=".7" />
            </g>
          ))}
          {[[84, 100], [118, 90], [76, 138], [132, 140]].map(([x, y], i) => (
            <path key={i} d={`M${x} ${y} q8 -14 16 0 q-8 10 -16 0z`} fill="#566A48" />
          ))}
        </svg>
      );
    case "store":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <path d="M70 70 V58 a30 30 0 0 1 60 0 V70" fill="none" stroke="#222B1D" strokeWidth="9" strokeLinecap="round" />
          <path d="M34 70 H166 L176 176 H24Z" fill="#fff" stroke="#222B1D" strokeWidth="6" strokeLinejoin="round" />
          <path d="M34 70 H166 L170 112 H30Z" fill="#566A48" />
          <circle cx="100" cy="132" r="15" fill="#FF6F91" />
          <path d="M92 132 l6 6 l11 -12" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "coffee":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <g className="steam" fill="none" stroke="#566A48" strokeWidth="6" strokeLinecap="round">
            <path d="M78 52 q-10 -14 0 -26 q10 -12 0 -24" />
            <path d="M104 56 q-10 -14 0 -26 q10 -12 0 -24" />
            <path d="M130 52 q-10 -14 0 -26 q10 -12 0 -24" />
          </g>
          <path d="M44 74 H156 L146 150 Q144 168 126 168 H74 Q56 168 54 150Z" fill="#fff" stroke="#222B1D" strokeWidth="6" strokeLinejoin="round" />
          <path d="M156 88 H170 Q190 90 188 114 Q186 138 150 138" fill="none" stroke="#222B1D" strokeWidth="9" strokeLinecap="round" />
          <path d="M48 98 H152 L148 128 H52Z" fill="#566A48" />
          <rect x="28" y="168" width="144" height="10" rx="5" fill="#222B1D" />
        </svg>
      );
    case "gym":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="62" y="92" width="76" height="16" rx="5" fill="#222B1D" />
          <rect x="34" y="60" width="26" height="80" rx="8" fill="#566A48" stroke="#222B1D" strokeWidth="6" />
          <rect x="140" y="60" width="26" height="80" rx="8" fill="#566A48" stroke="#222B1D" strokeWidth="6" />
          <rect x="14" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#222B1D" strokeWidth="6" />
          <rect x="168" y="76" width="18" height="48" rx="6" fill="#fff" stroke="#222B1D" strokeWidth="6" />
        </svg>
      );
    case "saas":
      return (
        <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
          <rect x="18" y="34" width="164" height="130" rx="10" fill="#fff" stroke="#222B1D" strokeWidth="6" />
          <path d="M18 62 H182" stroke="#222B1D" strokeWidth="6" />
          <circle cx="36" cy="48" r="5" fill="#FF6F91" />
          <rect x="36" y="118" width="22" height="32" fill="#566A48" />
          <rect x="68" y="96" width="22" height="54" fill="#566A48" />
          <rect x="100" y="106" width="22" height="44" fill="#566A48" />
          <rect x="132" y="80" width="22" height="70" fill="#222B1D" />
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
