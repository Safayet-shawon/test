import { Browser, Cloud, DeviceMobile, GearSix, Database } from "@phosphor-icons/react/dist/ssr";
import { SERVICES } from "@/data/site";
import Reveal from "./Reveal";

const ICONS = { browser: Browser, cloud: Cloud, phone: DeviceMobile, gear: GearSix, database: Database };

export default function Services() {
  return (
    <section className="svc" id="services" aria-labelledby="svc-title">
      <div className="svc-in">
        <Reveal as="h2" id="svc-title">Services</Reveal>
        <ul className="svc-grid">
          {SERVICES.map((s, i) => {
            const I = ICONS[s.icon];
            return (
              <Reveal as="li" key={s.title} delay={(i % 3) * 80} className={`svc-card${i >= 3 ? " svc-wide" : ""}`}>
                <span className={`svc-ico svc-ico-${i % 3}`}>
                  <I size={24} weight="regular" aria-hidden="true" />
                </span>
                <h3>{s.title}</h3>
                <ul className="svc-tags">
                  {s.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
