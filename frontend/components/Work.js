import fs from "node:fs";
import path from "node:path";
import { PROJECTS, ALSO_BUILT } from "@/data/site";
import Reveal from "./Reveal";
import { Arrow } from "./Icons";

// Screenshots: `public/projects/<id>.webp` (and optionally `<id>-2.webp`, which crossfades).
function shotsFor(id) {
  const dir = path.join(process.cwd(), "public", "projects");
  const out = [];
  for (const suffix of ["", "-2", "-3"]) {
    for (const ext of ["webp", "png", "jpg"]) {
      if (fs.existsSync(path.join(dir, `${id}${suffix}.${ext}`))) {
        out.push(`/projects/${id}${suffix}.${ext}`);
        break;
      }
    }
  }
  return out;
}

function Clip({ p }) {
  const shots = shotsFor(p.id);
  const host = p.link ? p.link.replace(/^https?:\/\//, "") : p.title;
  return (
    <div className="clip has-shot" data-tilt>
      {shots.length > 0 && (
        <>
          <div className="chrome">
            <i />
            <i />
            <i />
            <span>{host}</span>
          </div>
          <div className={`shots n${shots.length}`}>
            {shots.map((src, i) => (
              <div key={src} className="shot" style={{ backgroundImage: `url(${src})`, "--i": i }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work-head">
        <Reveal as="h2">Selected work</Reveal>
        <Reveal as="p" delay={80} className="work-sub">
          Recent client projects, from small business websites to software that runs a whole operation.
        </Reveal>
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
                <a className="visit" href={p.link} target="_blank" rel="noopener noreferrer">
                  Visit website <Arrow />
                </a>
              )}
            </div>
            <Clip p={p} />
          </article>
        ))}
      </div>

      <Reveal className="also">
        <h3>Also built</h3>
        <ul>
          {ALSO_BUILT.map(([name, type, text]) => (
            <li key={name}>
              <b>{name}</b>
              <span>{type}</span>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
