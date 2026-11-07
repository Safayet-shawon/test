// zerosoft mark: a slashed zero with a cursor underscore. Single colour (currentColor), flat, no gradient.
export function LogoMark({ className = "" }) {
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <ellipse cx="15" cy="15" rx="8.4" ry="11.4" fill="none" stroke="currentColor" strokeWidth="2.6" />
      <path d="M10.8 21 L19.2 9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <rect x="22" y="25.6" width="7" height="2.6" rx="1.3" fill="currentColor" />
    </svg>
  );
}

export default function Logo({ text = "zerosoft", tone = "light" }) {
  return (
    <span className={`logo ${tone === "dark" ? "logo-dark" : ""}`}>
      <LogoMark />
      <span className="logo-text">{text}</span>
    </span>
  );
}
