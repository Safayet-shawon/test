// zerosoft identity: a solid rounded-square mark with a slashed zero cut out of it (reads as "0" and as a
// terminal cursor), plus a two-weight wordmark: **zero** semibold, soft light. One colour, no effects.
export function LogoMark({ className = "" }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8.5" fill="currentColor" />
      <ellipse cx="16" cy="15.2" rx="6.6" ry="9" fill="none" stroke="var(--cut)" strokeWidth="2.5" />
      <path d="M12.4 20.6 L19.6 9.8" stroke="var(--cut)" strokeWidth="2.1" strokeLinecap="round" />
      <rect x="20.4" y="24.2" width="5.6" height="2.2" rx="1.1" fill="var(--cut)" />
    </svg>
  );
}

export default function Logo({ tone = "light" }) {
  return (
    <span className={`logo ${tone === "dark" ? "logo-dark" : ""}`}>
      <LogoMark />
      <span className="logo-text">
        <b>zero</b>soft
      </span>
    </span>
  );
}
