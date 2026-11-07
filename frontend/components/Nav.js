"use client";
import { useEffect, useState } from "react";
import Logo from "./Logo";

const LINKS = [
  ["#about", "About", "Who we are"],
  ["#services", "Services", "SaaS, projects, products"],
  ["#work", "Our work", "Real projects, real screenshots"],
  ["#care", "DevOps & care", "We keep it running"],
  ["#process", "How we work", "From hello to live"],
  ["#contact", "Contact", "Describe your project"],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // lock page scroll while the menu is open; Esc closes it; closes if the screen grows to desktop
  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    const key = (e) => e.key === "Escape" && setOpen(false);
    const size = () => window.innerWidth > 900 && setOpen(false);
    window.addEventListener("keydown", key);
    window.addEventListener("resize", size);
    return () => {
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", size);
      document.documentElement.classList.remove("menu-open");
    };
  }, [open]);

  return (
    <>
      <header className={`nav ${solid ? "solid" : ""} ${open ? "is-open" : ""}`}>
        <a href="#top" aria-label="zerosoft home" onClick={() => setOpen(false)}>
          <Logo />
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Work</a>
          <a href="#contact" className="nav-cta" onClick={() => setOpen(false)}>
            Start a project
          </a>
          <button
            type="button"
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            <i />
          </button>
        </nav>
      </header>

      <div className={`m-menu ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open}>
        <div className="m-back" onClick={() => setOpen(false)} />
        <aside className="m-panel" aria-label="Menu">
          <ul>
            {LINKS.map(([href, t, s], i) => (
              <li key={href} style={{ "--k": i }}>
                <a href={href} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1}>
                  <b>{t}</b>
                  <small>{s}</small>
                  <i>→</i>
                </a>
              </li>
            ))}
          </ul>
          <p className="m-foot">© {new Date().getFullYear()} zerosoft</p>
        </aside>
      </div>
    </>
  );
}
