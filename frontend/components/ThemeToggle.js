"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "@phosphor-icons/react";

// Light is the default. The choice is saved in this browser; the script in app/layout.js
// applies it before the first paint so the page never flashes the wrong theme.
export const THEME_KEY = "zerosoft-theme";

export default function ThemeToggle({ className = "", withLabel = false }) {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const sync = () => setDark(document.documentElement.dataset.theme === "dark");
    sync();
    window.addEventListener("zerosoft:theme", sync);
    return () => window.removeEventListener("zerosoft:theme", sync);
  }, []);

  const toggle = () => {
    const next = !dark;
    const html = document.documentElement;
    html.classList.add("theme-switching");
    if (next) html.dataset.theme = "dark";
    else delete html.dataset.theme;
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {}
    window.dispatchEvent(new Event("zerosoft:theme"));
    setTimeout(() => html.classList.remove("theme-switching"), 450);
  };

  const label = dark ? "Switch to light mode" : "Switch to dark mode";
  return (
    <button type="button" className={`theme-btn ${className}`} onClick={toggle} aria-label={label} title={label} aria-pressed={dark}>
      {dark ? <Sun size={18} weight="regular" aria-hidden="true" /> : <Moon size={18} weight="regular" aria-hidden="true" />}
      {withLabel && <span>{dark ? "Light mode" : "Dark mode"}</span>}
    </button>
  );
}
