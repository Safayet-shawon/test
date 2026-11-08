import Reveal from "./Reveal";

const ITEMS = [
  ["Maintenance", "Updates, security patches and fixes, with uptime alerts that reach us before your customers notice."],
  ["Traffic", "Caching, a CDN and load balancing, so a busy launch day doesn't take the site down."],
  ["Scaling", "Capacity that grows with demand and shrinks when it's quiet, so you only pay for what you use."],
  ["Databases", "Migrations, tuning and access control for PostgreSQL, MySQL and Redis as your data grows."],
  ["Backups", "Automated, encrypted backups, with restores we test before you ever need one."],
];

export default function Care() {
  return (
    <section id="care" className="aftercare">
      <div className="aftercare-in">
        <Reveal className="aftercare-head">
          <h2>After launch, we keep it running.</h2>
          <p>
            Hosting and the technical upkeep that keeps your site fast, online and safe, so you can focus on your
            customers.
          </p>
        </Reveal>
        <Reveal as="ul" delay={80} className="aftercare-list">
          {ITEMS.map(([t, d]) => (
            <li key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
