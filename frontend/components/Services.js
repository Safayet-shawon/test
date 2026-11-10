import { SERVICES } from "@/data/site";
import Reveal from "./Reveal";
import Doodle, { DoodleDefs } from "./Doodles";
import LiveBuild from "./LiveBuild";

export default function Services() {
  return (
    <section className="svc" id="services" aria-labelledby="svc-title">
      <DoodleDefs />
      <div className="svc-in">
        <Reveal as="h2" id="svc-title">Services</Reveal>
        <ul className="svc-grid">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={(i % 3) * 80} className="svc-card">
              <span className="svc-doodle">
                <Doodle name={s.icon} />
              </span>
              <h3>{s.title}</h3>
              <ul className="svc-tags">
                {s.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
          <Reveal as="li" delay={160} className="svc-card svc-live">
            <LiveBuild />
            <p className="svc-live-cap">Code in, product out.</p>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
