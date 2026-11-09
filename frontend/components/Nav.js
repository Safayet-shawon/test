"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/data/site";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

// Each menu item opens its own page. The home page still shows every section in one scroll.
// [section id on the home page, page link, label, one-line hint for the mobile menu]
const LINKS = [
  ["services", "/services", "Services", "What we build"],
  ["process", "/process", "Process", "How a project runs"],
  ["work", "/work", "Our work", "Projects we have completed"],
  ["care", "/after-launch", "After launch", "Hosting, updates and care"],
  ["about", "/about", "About", "Who we are"],
  ["contact", "/quote", "Contact", "Tell us about your project"],
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

  // Highlight the current page; on the home page, the section currently in view.
  const path = usePathname();
  useEffect(() => {
    if (path !== "/") {
      const hit = LINKS.find(([, href]) => path === href || path.startsWith(href + "/"));
      setActive(hit ? hit[0] : "");
      return;
    }
    const els = LINKS.map(([id]) => document.getElementById(id)).filter(Boolean);
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [path]);

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
        <a href="/" aria-label="zerosoft home" onClick={() => open && close(false)}>
          <Logo />
        </a>
        <nav aria-label="Main">
          {LINKS.slice(0, 5).map(([id, href, label]) => (
            <a key={id} href={href} className={active === id ? "is-active" : undefined} aria-current={active === id && path !== "/" ? "page" : undefined}>
              {label}
            </a>
          ))}
          <ThemeToggle className="theme-btn-nav" />
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
            {LINKS.map(([id, href, t, s], i) => (
              <li key={id} style={{ "--k": i }}>
                <a
                  ref={i === 0 ? firstLink : undefined}
                  href={href}
                  onClick={() => close(false)}
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
            <ThemeToggle className="theme-btn-menu" withLabel />
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
