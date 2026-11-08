import { ListChecks, SlidersHorizontal, EnvelopeSimple, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { SITE } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

const STEPS = [
  [ListChecks, "Choose what you need", "Website, store, management system, SaaS or app."],
  [SlidersHorizontal, "Pick the features", "Admin panel, staff, inventory, payments and more."],
  [EnvelopeSimple, "Get your quotation", "An itemised scope by email, then a detailed quotation."],
];

export default function Contact() {
  const a = SITE.address;
  return (
    <section id="contact" className="contact cta-block">
      <div className="cta-in">
        <Reveal className="cta-main">
          <h2>Get a quotation for your project</h2>
          <p className="cta-lead">Answer a few questions. It takes about two minutes, and we reply within one business day.</p>
          <ol className="cta-steps">
            {STEPS.map(([I, t, d], i) => (
              <li key={t}>
                <span className="cta-ico">
                  <I size={22} aria-hidden="true" />
                </span>
                <span className="cta-n">{String(i + 1).padStart(2, "0")}</span>
                <b>{t}</b>
                <span>{d}</span>
              </li>
            ))}
          </ol>
          <a href="/quote" className="btn btn-violet cta-btn">
            Start your quotation <Arrow />
          </a>
        </Reveal>
        <Reveal as="address" delay={120} className="cta-card">
          <p className="cta-card-t">Or talk to us directly</p>
          <a href={`mailto:${SITE.email}`} className="cta-line">
            <EnvelopeSimple size={20} aria-hidden="true" /> {SITE.email}
          </a>
          {SITE.phone && (
            <a href={`tel:${SITE.phone.replace(/[^\d+]/g, "")}`} className="cta-line">
              <Phone size={20} aria-hidden="true" /> {SITE.phone}
            </a>
          )}
          <a href={SITE.mapUrl} target="_blank" rel="noopener noreferrer" className="cta-line">
            <MapPin size={20} aria-hidden="true" />
            <span>
              {a.line1}
              <br />
              {a.city} {a.postcode}, {a.country}
            </span>
          </a>
          {SITE.hours && <p className="cta-hours">{SITE.hours}</p>}
        </Reveal>
      </div>
    </section>
  );
}
