"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Logo from "./Logo";
import { NAV, SITE } from "@/data/site";

// Fixed bar that hides on the way down and returns on the way up. Its colour follows the tone
// of the section underneath it ([data-tone] on sections), so it reads on sand and on ink.
export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");

  // close the menu on navigation (adjusting state during render, not in an effect)
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // lock scroll + Escape while the menu is open
  useEffect(() => {
    const l = window.__lenis;
    if (open) l?.stop();
    else l?.start();
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 240 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
      // tone of whatever section sits under the bar
      const probe = document.elementsFromPoint(window.innerWidth / 2, 36).find((n) => (n as HTMLElement).closest?.("[data-tone]") && !(n as HTMLElement).closest(".nav"));
      const sec = (probe as HTMLElement | undefined)?.closest<HTMLElement>("[data-tone]");
      const t = sec?.dataset.tone;
      setTone(t === "dark" || t === "graphite" ? "dark" : "light");
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  const current = (href: string) => (pathname === href || pathname.startsWith(href + "/") ? "page" : undefined);

  return (
    <>
      <header className={`nav${hidden && !open ? " is-hidden" : ""}${scrolled && !open ? " is-scrolled" : ""}`} data-tone={open ? "dark" : tone}>
        <div className="nav-bar" aria-hidden="true" />
        <div className="nav-in wrap">
          <Link href="/" aria-label="zerosoft, home">
            <Logo />
          </Link>
          <nav aria-label="Main">
            <ul className="nav-links" role="list" style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} aria-current={current(n.href)}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <Link href="/quote" className="btn btn-sm">
              Start a project <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <button type="button" className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open} inert={!open}>
        <nav aria-label="Mobile">
          <ol>
            {[{ href: "/", label: "Home" }, ...NAV, { href: "/quote", label: "Get a quotation" }].map((n, i) => (
              <li key={n.href}>
                <Link href={n.href} style={{ transitionDelay: open ? `${0.12 + i * 0.05}s` : "0s" }} aria-current={n.href === "/" ? (pathname === "/" ? "page" : undefined) : current(n.href)}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {n.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="menu-foot">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <span>
            {SITE.address.line1}, {SITE.address.city}
          </span>
        </div>
      </div>
    </>
  );
}
