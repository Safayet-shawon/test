import Reveal from "./Reveal";
import { Arrow } from "./Icons";

const POINTS = ["Zero templates", "Design and code, together", "We stay after launch"];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-in">
        <Reveal as="p" className="about-kick">
          About zerosoft
        </Reveal>
        <Reveal as="h2" delay={80} className="about-lead">
          A small software studio that starts every project at <span className="zero">zero</span> and ends with a website, web
          app or product people enjoy using.
        </Reveal>
        <Reveal delay={160} className="about-row">
          <ul>
            {POINTS.map((t, i) => (
              <li key={t}>
                <span>{String(i + 1).padStart(2, "0")}</span> {t}
              </li>
            ))}
          </ul>
          <a href="/quote" className="about-link">
            Start a project <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
