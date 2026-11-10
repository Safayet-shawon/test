import { PROCESS } from "@/data/site";
import Reveal from "./Reveal";

// "How we work" as a flow graph: four nodes on one line. The line draws itself in, each node fills
// with ink as the line reaches it, then a fine dashed line drifts along it (plain ink, no glow).
// Desktop: a gently waving horizontal line (SVG). Phones: a straight vertical line (CSS).
const LINE = "M0 40C60 40 80 40 125 40S250 8 375 40S500 72 625 40S750 8 875 40S960 40 1000 40";

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-in">
        <Reveal as="h2">How we work</Reveal>
        <Reveal as="div" className="flow">
          <svg className="flow-line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <path className="flow-track" d={LINE} pathLength="1" />
            <path className="flow-march" d={LINE} pathLength="1" />
          </svg>
          <ol className="flow-steps">
            {PROCESS.map((s, i) => (
              <li key={s.title} className="flow-step" style={{ "--n": i }}>
                <span className="flow-node" aria-hidden="true" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
