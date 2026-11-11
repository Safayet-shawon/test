import { ABOUT } from "@/data/site";

// About in three short chapters. On desktop each one slides over the one before it (CSS sticky).
export default function Chapters({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const H = heading;
  return (
    <section className="chapters tone" data-tone="light" aria-labelledby="about-title">
      <H id="about-title" className="sr-only">
        About zerosoft
      </H>
      {ABOUT.map((c, i) => (
        <article key={c.no} className="chapter" data-tone={i === 2 ? "graphite" : i === 1 ? "sand" : "light"}>
          <div className="wrap chapter-in">
            <p className="label eyebrow" data-reveal="fade">
              {c.no} {c.kicker}
            </p>
            <div>
              <h3 data-split="lines">
                {c.title[0]}
                <em className="serif-em">{c.title[1]}</em>
              </h3>
              <div className="chapter-text" data-stagger>
                {c.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
