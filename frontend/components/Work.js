import { PROJECTS, ALL_WORK } from "@/data/site";
import Reveal from "./Reveal";
import Clip from "./Clip";
import { Arrow } from "./Icons";

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work-head">
        <Reveal as="h2">Selected work</Reveal>
        <Reveal as="p" delay={80} className="work-sub">
          Recent client projects, from small business websites to software that runs a whole operation.
        </Reveal>
        <p className="swipe-hint" aria-hidden="true">
          Swipe to see more <Arrow />
        </p>
      </div>

      <div className="stack">
        {PROJECTS.map((p, i) => (
          <article key={p.id} className={`card k${i % 4}`} style={{ "--k": i }}>
            <div className="card-info">
              <span className="pill-tag">{p.tag}</span>
              <h3>{p.title}</h3>
              <p>{p.blurb}</p>
              <ul className="tags">
                {p.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              <p className="result">{p.result}</p>
              {p.link && (
                <a className="visit" href={p.link} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${p.title} website`}>
                  <span className="visit-text">Visit website</span> <Arrow />
                </a>
              )}
            </div>
            <Clip p={p} />
          </article>
        ))}
      </div>

      <div className="work-more">
        <a href="/work" className="btn btn-violet">
          See all projects <span className="work-count">{ALL_WORK.length}</span> <Arrow />
        </a>
      </div>
    </section>
  );
}
