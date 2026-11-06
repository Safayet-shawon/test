export function BizIcon({ kind }) {
  if (kind === "pizza")
    return (
      <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
        <circle cx="100" cy="100" r="92" fill="#D98B2B" />
        <circle cx="100" cy="100" r="80" fill="#FFC94D" />
        <path d="M100 100 L100 20 A80 80 0 0 1 169 60 Z" fill="#FFE08A" opacity=".55" />
        {[[70, 70], [128, 66], [145, 118], [96, 140], [58, 114], [100, 98]].map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="15" fill="#E8230A" />
            <circle cx={x - 4} cy={y - 4} r="4" fill="#FF7A5C" opacity=".7" />
          </g>
        ))}
        {[[84, 100], [118, 90], [76, 138], [132, 140]].map(([x, y], i) => (
          <path key={i} d={`M${x} ${y} q8 -14 16 0 q-8 10 -16 0z`} fill="#2E9E4F" />
        ))}
      </svg>
    );
  if (kind === "sneaker")
    return (
      <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
        <path d="M14 126 Q14 92 52 84 L80 54 Q100 44 112 66 L124 94 Q176 100 188 122 L188 138 Q188 148 178 148 L24 148 Q14 148 14 138Z" fill="#fff" />
        <path d="M14 126 Q14 92 52 84 L80 54 Q100 44 112 66 L124 94 Q176 100 188 122 L14 126Z" fill="#FF2400" />
        <rect x="12" y="134" width="178" height="18" rx="9" fill="#1034A6" />
        <path d="M86 62 l20 16 M78 74 l22 16 M70 86 l22 14" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
        <path d="M30 118 Q70 108 112 118" stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round" opacity=".8" />
      </svg>
    );
  return (
    <svg viewBox="0 0 200 200" className="biz-icon" aria-hidden="true">
      <g className="steam" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" opacity=".85">
        <path d="M78 52 q-10 -14 0 -26 q10 -12 0 -24" />
        <path d="M104 56 q-10 -14 0 -26 q10 -12 0 -24" />
        <path d="M130 52 q-10 -14 0 -26 q10 -12 0 -24" />
      </g>
      <path d="M44 74 H156 L146 150 Q144 168 126 168 H74 Q56 168 54 150Z" fill="#fff" />
      <path d="M156 88 H170 Q190 90 188 114 Q186 138 150 138" fill="none" stroke="#fff" strokeWidth="12" strokeLinecap="round" />
      <path d="M48 98 H152 L148 128 H52Z" fill="#1034A6" />
      <rect x="28" y="168" width="144" height="10" rx="5" fill="#FF2400" />
    </svg>
  );
}

export function Arrow({ className = "" }) {
  return (
    <svg className={className} width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
