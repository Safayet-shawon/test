import { useId } from "react";

// zerosoft mark: a slashed zero (the programmer's 0) with a terminal-cursor underscore.
export function LogoMark({ className = "" }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg className={`logo-mark ${className}`} viewBox="0 0 32 32" aria-hidden="true">
      <defs>
        <linearGradient id={`lg${id}`} x1="4" y1="4" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c9cad3" />
          <stop offset="0.3" stopColor="#ffffff" />
          <stop offset="0.62" stopColor="#7ec3ff" />
          <stop offset="1" stopColor="#b58cff" />
        </linearGradient>
      </defs>
      <ellipse cx="15" cy="15" rx="8.6" ry="11.6" fill="none" stroke={`url(#lg${id})`} strokeWidth="3.2" />
      <path d="M10.6 21.2 L19.4 8.8" stroke={`url(#lg${id})`} strokeWidth="2.6" strokeLinecap="round" />
      <rect x="21.6" y="25.4" width="7.2" height="3" rx="1.2" fill="#b58cff" />
    </svg>
  );
}

export default function Logo({ text = "zerosoft" }) {
  return (
    <span className="logo">
      <LogoMark />
      <span className="logo-text">{text}</span>
    </span>
  );
}
