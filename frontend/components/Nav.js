"use client";
import { useEffect, useRef, useState } from "react";
import { SITE } from "@/data/site";
import Logo from "./Logo";

// Page sections, in page order. Used by the mobile menu (with a one-line hint each).
const LINKS = [
  ["services", "Services", "What we build"],
  ["process", "Process", "How a project runs"],
  ["work", "Our work", "Projects we have completed"],
  ["care", "After launch", "Hosting, updates and care"],
  ["about", "About", "Who we are"],
  ["contact", "Contact", "Tell us about your project"],
];

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const btn = useRef(null);
  const firstLink = useRef(null);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    const els = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // While open: lock page scroll, Esc closes, focus moves into the menu; closes if the screen grows to desktop.
  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("menu-open", open);
    if (!open) return;
    const key = (e) => e.key === "Escape" && close();
    const size = () => window.innerWidth > 900 && close();
    window.addEventListener("keydown", key);
    window.addEventListener("resize", size);
    const t = setTimeout(() => firstLink.current?.focus({ preventScroll: true }), 250);
    return () => {
      clearTimeout(t);
      window.removeEventListener("keydown", key);
      window.removeEventListener("resize", size);
      html.classList.remove("menu-open");
    };
  }, [open]);

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) btn.current?.focus({ preventScroll: true });
  }

  // Close first, then scroll, so the page is unlocked before it moves.
  function go(e, id) {
    const el = document.getElementById(id);
    if (!el) return close(false); // section lives on the home page: let the /#id link navigate there
    e.preventDefault();
    close(false);
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  }

  return (
    <>
      <header className={`nav ${solid ? "solid" : ""} ${open ? "is-open" : ""}`}>
        <a href="/#top" aria-label="zerosoft home" onClick={() => open && close(false)}>
          <Logo />
        </a>
        <nav aria-label="Main">
          <a href="/#services">Services</a>
          <a href="/#process">Process</a>
          <a href="/#work">Our work</a>
          <a href="/#care">After launch</a>
          <a href="/#about">About</a>
          <a href="/quote" className="nav-cta" onClick={() => open && close(false)}>
            Start a project
          </a>
          <button
            ref={btn}
            type="button"
            className="menu-btn"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className="menu-btn-icon" aria-hidden="true">
              <i />
              <i />
            </span>
          </button>
        </nav>
      </header>

      <div className={`m-menu ${open ? "open" : ""}`} id="mobile-menu" aria-hidden={!open} inert={!open}>
        <nav className="m-inner" aria-label="Sections">
          <ol className="m-links">
            {LINKS.map(([id, t, s], i) => (
              <li key={id} style={{ "--k": i }}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={`/#${id}`}
                  onClick={(e) => go(e, id)}
                  className={active === id ? "is-active" : undefined}
                  aria-current={active === id ? "location" : undefined}
                >
                  <span className="m-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="m-text">
                    <b>{t}</b>
                    <small>{s}</small>
                  </span>
                  <span className="m-arrow" aria-hidden="true">→</span>
                </a>
              </li>
            ))}
          </ol>
          <div className="m-foot" style={{ "--k": LINKS.length }}>
            <a href="/quote" className="m-cta" onClick={() => close(false)}>
              Start a project <span aria-hidden="true">→</span>
            </a>
            <a href={`mailto:${SITE.email}`} className="m-mail">
              {SITE.email}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
