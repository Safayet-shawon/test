// The mark is a zero built from grains, crossed by a slash of amber grains: the slashed zero of
// engineering type, drawn in the site's material. Wordmark keeps the two-weight "zerosoft".
const RING = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  return [16 + Math.cos(a) * 9.2, 16 + Math.sin(a) * 12.4, i % 3 === 0 ? 1.55 : 1.25] as const;
});
const SLASH = [0, 1, 2, 3, 4].map((i) => [11.6 + i * 2.2, 22.6 - i * 3.3] as const);

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {RING.map(([x, y, r], i) => (
        <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={r} fill="currentColor" />
      ))}
      {SLASH.map(([x, y], i) => (
        <circle key={`s${i}`} cx={x.toFixed(2)} cy={y.toFixed(2)} r={1.35} fill="#C99B61" />
      ))}
    </svg>
  );
}

export default function Logo() {
  return (
    <span className="logo">
      <Mark />
      <span>
        <b>zero</b>
        <i>soft</i>
      </span>
    </span>
  );
}
