import Reveal from "./Reveal";

const CARDS = [
  {
    id: "maintain",
    span: 2,
    title: "Maintenance & monitoring",
    text: "Updates, security patches and fixes, with uptime checks that tell us before your customers do.",
    tags: ["Uptime alerts", "Patching", "Bug fixes"],
  },
  {
    id: "traffic",
    span: 2,
    title: "Traffic control",
    text: "CDN, caching, load balancing and rate limiting, so a launch day or a viral post doesn't take you down.",
    tags: ["CDN & caching", "Load balancing", "Rate limits"],
  },
  {
    id: "scale",
    span: 2,
    title: "Scaling",
    text: "Capacity that grows with demand and shrinks when it's quiet, so you only pay for what you use.",
    tags: ["Autoscaling", "Queues", "Cost control"],
  },
  {
    id: "db",
    span: 3,
    title: "Database management",
    text: "Migrations, indexing, query tuning, replicas and access control for PostgreSQL, MySQL and Redis, so data stays fast and safe as it grows.",
    tags: ["PostgreSQL", "MySQL", "Redis", "Replicas"],
  },
  {
    id: "backup",
    span: 3,
    title: "Backups & recovery",
    text: "Automated, encrypted backups and restores we actually test. A bad day should be an inconvenience, not a disaster.",
    tags: ["Scheduled backups", "Tested restores", "Recovery plan"],
  },
];

function Viz({ id }) {
  switch (id) {
    case "maintain":
      return (
        <div className="viz viz-maintain" aria-hidden="true">
          <svg viewBox="0 0 120 34" preserveAspectRatio="none">
            <path d="M0 20 H30 L36 20 L42 6 L50 30 L56 14 L62 20 H120" pathLength="1" />
          </svg>
          <ul>
            {["SSL renewed", "Dependencies updated", "Logs clean"].map((t, i) => (
              <li key={t} style={{ "--k": i }}>
                <i>✓</i>
                {t}
              </li>
            ))}
          </ul>
        </div>
      );
    case "traffic":
      return (
        <div className="viz viz-traffic" aria-hidden="true">
          <div className="users">
            {[0, 1, 2].map((i) => (
              <i key={i} style={{ "--k": i }} />
            ))}
          </div>
          <div className="lb">balancer</div>
          <div className="srv">
            {[0, 1, 2].map((i) => (
              <b key={i} style={{ "--k": i }}>
                <u />
              </b>
            ))}
          </div>
        </div>
      );
    case "scale":
      return (
        <div className="viz viz-scale" aria-hidden="true">
          {[3, 4, 6, 9, 12, 9, 6, 4].map((h, i) => (
            <i key={i} style={{ "--h": `${h * 8}%`, "--k": i }} />
          ))}
          <span>2 → 12 instances</span>
        </div>
      );
    case "db":
      return (
        <div className="viz viz-db" aria-hidden="true">
          <div className="cyl main">
            <i />
            <i />
            <i />
          </div>
          <div className="link" />
          <div className="cyl rep">
            <i />
            <i />
          </div>
          <div className="cyl rep r2">
            <i />
            <i />
          </div>
          <div className="spark">
            <svg viewBox="0 0 60 24" preserveAspectRatio="none">
              <path d="M0 4 L10 6 L20 8 L28 14 L38 18 L48 20 L60 21" pathLength="1" />
            </svg>
            <small>query time ↓</small>
          </div>
        </div>
      );
    default:
      return (
        <div className="viz viz-backup" aria-hidden="true">
          <div className="line">
            {[0, 1, 2, 3, 4].map((i) => (
              <i key={i} style={{ "--k": i }} />
            ))}
          </div>
          <div className="restore">
            <span className="arrow">↻</span>
            <b>Restore tested ✓</b>
          </div>
        </div>
      );
  }
}

export default function Care() {
  return (
    <section id="care" className="care">
      <div className="care-in">
        <Reveal as="p" className="care-kick">
          After launch
        </Reveal>
        <Reveal as="h2" delay={80} className="care-title">
          We keep it <em>running.</em>
        </Reveal>
        <Reveal as="p" delay={140} className="care-lead">
          A website doesn&apos;t stop at launch. We manage the DevOps work that keeps it fast, online and safe, so you can get on
          with your customers.
        </Reveal>
        <div className="care-grid">
          {CARDS.map((c, i) => (
            <Reveal key={c.id} delay={i * 90} className={`care-card span${c.span}`}>
              <Viz id={c.id} />
              <h3>{c.title}</h3>
              <p>{c.text}</p>
              <ul className="tags">
                {c.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
