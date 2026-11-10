import { SERVICES } from "@/data/site";
import Reveal from "./Reveal";
import LiveBuild from "./LiveBuild";

// Services as plain text: a title and a line of what it covers, no icons and no boxes.
// The live build (code in, product out) sits beside the list.
export default function Services() {
  return (
    <section className="svc" id="services" aria-labelledby="svc-title">
      <div className="svc-in">
        <Reveal as="h2" id="svc-title">Services</Reveal>
        <div className="svc-wrap">
          <ul className="svc-list">
            {SERVICES.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 70} className="svc-item">
                <h3>{s.title}</h3>
                <p>{s.tags.join(" · ")}</p>
              </Reveal>
            ))}
          </ul>
          <Reveal as="div" delay={200} className="svc-live">
            <LiveBuild />
            <p className="svc-live-cap">Code in, product out.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
