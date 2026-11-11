import Link from "next/link";
import { NAV, SITE, SERVICES } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer tone" data-tone="dark">
      <div className="wrap">
        <div className="footer-grid" data-stagger>
          <div>
            <Logo />
            <p className="lede" style={{ marginTop: "1.25rem", fontSize: "1rem" }}>
              {SITE.description}
            </p>
          </div>
          <div>
            <h2 className="label">Studio</h2>
            <ul role="list">
              {NAV.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-u">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/quote" className="link-u">
                  Get a quotation
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="label">Services</h2>
            <ul role="list">
              {SERVICES.map((s) => (
                <li key={s.id}>
                  <Link href={`/services#${s.id}`} className="link-u">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="label">Contact</h2>
            <ul role="list">
              <li>
                <a href={`mailto:${SITE.email}`} className="link-u">
                  {SITE.email}
                </a>
              </li>
              {SITE.phone && (
                <li>
                  <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="link-u">
                    {SITE.phone}
                  </a>
                </li>
              )}
              <li>
                <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="link-u">
                  <address>
                    {SITE.address.line1}
                    <br />
                    {SITE.address.city} {SITE.address.postcode}, {SITE.address.country}
                  </address>
                </a>
              </li>
              {SITE.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-u">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-word" aria-hidden="true" data-split="chars">
        <span>zero</span>
        <span className="it">soft</span>
      </div>

      <div className="wrap">
        <div className="footer-base label">
          <span>
            © {year} {SITE.name}
          </span>
          <Link href="/privacy" className="link-u">
            Privacy policy
          </Link>
          <a href="#main" className="link-u">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
