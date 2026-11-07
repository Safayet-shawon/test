import { PROCESS } from "@/data/site";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-in">
        <Reveal as="p" className="eyebrow">
          How we work
        </Reveal>
        <Reveal as="h2" delay={80}>
          From hello to <span className="scribble">live.</span>
        </Reveal>
        <ol className="steps4">
          {PROCESS.map(([n, t, d], i) => (
            <Reveal as="li" key={n} delay={i * 110} className="step4">
              <span className="n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
