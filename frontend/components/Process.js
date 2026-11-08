import { PROCESS } from "@/data/site";
import Reveal from "./Reveal";

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-in">
        <Reveal as="h2">How we work</Reveal>
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
