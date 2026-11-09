import { ALL_WORK, SECTORS, SITE } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

// About: three short "pages". On desktop each one slides over the one before it.
const PAGES = [
  {
    no: "i.",
    kicker: "The beginning",
    title: (
      <>
        Every good thing we build begins with a <em>blank page.</em>
      </>
    ),
    text: [
      "No bought theme. No template with your logo dropped in.",
      "We sit with you first: how customers find you, what they ask, where the day gets stuck. Only then do we draw a single screen.",
    ],
  },
  {
    no: "ii.",
    kicker: "The workshop",
    title: (
      <>
        One team. One table. <em>No hand-offs.</em>
      </>
    ),
    text: [
      "The hands that sketch your screens are the hands that write the code.",
      "Ideas don't get lost between departments, because there are none. You talk to the people building it, and you see working pages from the first week.",
    ],
  },
  {
    no: "iii.",
    kicker: "The long run",
    title: (
      <>
        Launch day is only the <em>middle of the story.</em>
      </>
    ),
    text: [
      "We host what we build, watch it, back it up and keep making it better.",
      "The site you paid for should be working just as hard a year from now.",
    ],
  },
];

export default function About() {
  const stats = [
    [ALL_WORK.length, "projects shipped"],
    [SECTORS.length, "industries served"],
    [1, "team, design to hosting"],
  ];
  return (
    <section id="about" className="about-pages" aria-labelledby="about-title">
      <h2 id="about-title" className="sr-only">
        About zerosoft
      </h2>
      {PAGES.map((pg, i) => (
        <article key={pg.no} className={`apage apage-${i + 1}`} style={{ "--i": i }}>
          <div className="apage-in">
            <Reveal as="p" className="apage-kick">
              <span>About zerosoft</span>
              <span className="apage-sep" aria-hidden="true" />
              <span>
                {pg.no} {pg.kicker}
              </span>
            </Reveal>
            <Reveal as="h3" delay={80} className="apage-title">
              {pg.title}
            </Reveal>
            <Reveal delay={160} className="apage-text">
              {pg.text.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </Reveal>
            {i === PAGES.length - 1 && (
              <Reveal delay={220} className="apage-foot">
                <dl className="apage-stats">
                  {stats.map(([n, l]) => (
                    <div key={l}>
                      <dd>{n}</dd>
                      <dt>{l}</dt>
                    </div>
                  ))}
                </dl>
                <div className="apage-cta">
                  <a href="/quote" className="apage-btn">
                    Start a project <Arrow />
                  </a>
                  <span>
                    {SITE.address.line1}, {SITE.address.city}
                  </span>
                </div>
              </Reveal>
            )}
          </div>
        </article>
      ))}
    </section>
  );
}
