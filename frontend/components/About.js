import Reveal from "./Reveal";
import { Arrow } from "./Icons";

const POINTS = [
  ["01", "Zero templates", "Every project starts from a blank page. No recycled layouts, no pile of assumptions. Just your business, your customers and what a good outcome looks like."],
  ["02", "Design and code, together", "The people who design it are the people who build it, so what you approve is what ships. Fast to load, easy to use, built to grow."],
  ["03", "We stay after launch", "A launch is day one, not the finish line. We measure, fix and keep improving so the site keeps earning its place."],
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="about-in">
        <Reveal as="p" className="about-kick">
          About zerosoft
        </Reveal>
        <Reveal as="h2" delay={80} className="about-lead">
          We&apos;re a small software studio that starts every project at <span className="zero">zero</span> and ends with a website,
          SaaS or product people actually enjoy using.
        </Reveal>

        <div className="about-grid">
          {POINTS.map(([n, t, d], i) => (
            <Reveal key={n} delay={i * 110} className="about-pt">
              <span className="n">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="about-foot">
          <p>Pizza shop, clinic, studio, startup or hardware brand. If it has customers, it deserves a site that works as hard as you do.</p>
          <a href="#work" className="about-link">
            See what we&apos;ve built <Arrow />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
