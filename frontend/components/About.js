import { ALL_WORK, SECTORS, SITE } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

const CHAPTERS = [
  {
    title: (
      <>
        We start at <em>zero.</em>
      </>
    ),
    text: "No bought theme, no template with your logo dropped in. Every project begins with how your business actually runs: who calls you, what they ask, and where the work gets stuck. We build from there.",
  },
  {
    title: (
      <>
        One team, <em>one table.</em>
      </>
    ),
    text: "The people who design your screens are the people who write the code. Nothing gets lost in a hand-off, because there isn't one. You talk to the builders directly, and you see working pages from the first week.",
  },
  {
    title: (
      <>
        We stay <em>after launch.</em>
      </>
    ),
    text: "A website isn't finished on launch day. We host it, watch it, back it up and keep improving it, so what you paid for keeps working long after the last invoice.",
  },
];

export default function About() {
  const stats = [
    [ALL_WORK.length, "projects shipped"],
    [SECTORS.length, "industries served"],
    [1, "team, design to hosting"],
  ];
  return (
    <section id="about" className="about about-story" aria-labelledby="about-title">
      <div className="about-in">
        <div className="story-side">
          <Reveal as="p" className="about-kick">
            About zerosoft
          </Reveal>
          <Reveal as="h2" id="about-title" delay={80} className="story-lead">
            A small studio that builds software the way a good tailor makes a suit: <em>measured first,</em> then cut to fit.
          </Reveal>
          <Reveal delay={140} className="story-place">
            {SITE.address.line1}, {SITE.address.city}
          </Reveal>
        </div>

        <ol className="story-chapters">
          {CHAPTERS.map((c, i) => (
            <Reveal as="li" key={i} delay={i * 90} className="chapter">
              <span className="chapter-n" aria-hidden="true">
                {["i", "ii", "iii"][i]}.
              </span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>

      <Reveal className="story-foot">
        <dl className="story-stats">
          {stats.map(([n, l]) => (
            <div key={l}>
              <dt>{l}</dt>
              <dd>{n}</dd>
            </div>
          ))}
        </dl>
        <a href="/quote" className="about-link">
          Start a project <Arrow />
        </a>
      </Reveal>
    </section>
  );
}
