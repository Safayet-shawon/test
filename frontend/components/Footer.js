import { SITE } from "@/data/site";
import Logo from "./Logo";
import { Arrow } from "./Icons";

const LINKS = [
  ["Services", "/#services"],
  ["Process", "/#process"],
  ["Our work", "/#work"],
  ["All projects", "/work"],
  ["After launch", "/#care"],
  ["About", "/#about"],
  ["Contact", "/#contact"],
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer-in">
        <div className="sf-brand">
          <Logo />
          <p>Websites, web apps and SaaS for growing businesses.</p>
        </div>
        <nav aria-label="Footer" className="sf-links">
          {LINKS.map(([t, h]) => (
            <a key={h} href={h}>
              {t}
            </a>
          ))}
        </nav>
        <div className="sf-contact">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          {SITE.location && <span>{SITE.location}</span>}
          {(SITE.socials || []).map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="sf-bottom">
        <span>© {new Date().getFullYear()} {SITE.name}</span>
        <a href="#top">
          Back to top <Arrow />
        </a>
      </div>
    </footer>
  );
}
