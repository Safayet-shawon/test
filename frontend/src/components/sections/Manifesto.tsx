import { STATS } from "@/data/site";

const TEXT =
  "zerosoft is a software studio in Dhaka. We start every project with a blank page, learn how your business really works, then design and build the software it runs on, from the first screen to the server it lives on.";

export default function Manifesto() {
  return (
    <section className="tone section" data-tone="light" aria-labelledby="manifesto-title">
      <div className="wrap">
        <div className="manifesto-grid">
          <div>
            <h2 id="manifesto-title" className="label eyebrow" data-reveal="fade">
              Who we are
            </h2>
          </div>
          <p className="manifesto-text" data-words>
            {TEXT.split(" ").map((w, i) => (
              <span key={i}>
                <span className="w">{w}</span>{" "}
              </span>
            ))}
          </p>
        </div>
        <dl className="stats">
          {STATS.map((s) => (
            <div key={s.label} data-reveal="up">
              <dd className="stat-n" style={{ margin: 0 }} data-count>
                {s.n}
              </dd>
              <dt className="label" style={{ marginTop: "0.75rem" }}>
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
