import { EnvelopeSimple, MapPin, Phone, Clock } from "@phosphor-icons/react/dist/ssr";
import { SITE, SERVICES } from "@/data/site";
import Logo from "./Logo";
import { Arrow } from "./Icons";

const COMPANY = [
  ["Process", "/process"],
  ["Our work", "/work"],
  ["After launch", "/after-launch"],
  ["About", "/about"],
  ["Get a quotation", "/quote"],
];

export default function Footer() {
  const a = SITE.address;
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="sf-top">
        <div className="sf-brand">
          <a href="/" aria-label="zerosoft home" className="sf-logo">
            <Logo />
          </a>
          <p>Websites, management systems, SaaS and apps for growing businesses, designed and built by one team in Dhaka.</p>
          <a href="/quote" className="sf-cta">
            Start a project <Arrow />
          </a>
        </div>

        <nav className="sf-col" aria-label="Services">
          <h2>Services</h2>
          <ul>
            {SERVICES.map((s) => (
              <li key={s.title}>
                <a href="/services">{s.title}</a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="sf-col" aria-label="Company">
          <h2>Company</h2>
          <ul>
            {COMPANY.map(([t, h]) => (
              <li key={h}>
                <a href={h}>{t}</a>
              </li>
            ))}
          </ul>
        </nav>

        <address className="sf-col sf-contact">
          <h2>Contact</h2>
          <ul>
            <li>
              <a href={`mailto:${SITE.email}`}>
                <EnvelopeSimple size={18} aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            {SITE.phone && (
              <li>
                <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`}>
                  <Phone size={18} aria-hidden="true" />
                  {SITE.phone}
                </a>
              </li>
            )}
            <li>
              <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer">
                <MapPin size={18} aria-hidden="true" />
                <span>
                  {a.line1}
                  <br />
                  {a.city} {a.postcode}, {a.country}
                </span>
              </a>
            </li>
            {SITE.hours && (
              <li className="sf-hours">
                <Clock size={18} aria-hidden="true" />
                {SITE.hours}
              </li>
            )}
          </ul>
          {SITE.socials.length > 0 && (
            <ul className="sf-social">
              {SITE.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </address>
      </div>

      <div className="sf-bottom">
        <p>
          © {year} {SITE.legalName}. All rights reserved.
        </p>
        <nav aria-label="Legal" className="sf-legal">
          <a href="/privacy">Privacy policy</a>
          <a href="#top">
            Back to top <Arrow />
          </a>
        </nav>
      </div>
    </footer>
  );
}
