import Link from "next/link";
import { CARE } from "@/data/site";

export default function Care({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const H = heading;
  return (
    <section className="tone section" data-tone="dark" aria-labelledby="care-title">
      <div className="wrap care-grid">
        <div className="care-sticky">
          <p className="label label-accent eyebrow" data-reveal="fade">
            After launch
          </p>
          <H id="care-title" className="display h-lg" data-split="lines" style={{ margin: "1.25rem 0 1.5rem" }}>
            After launch, we keep it <em>running.</em>
          </H>
          <p className="lede" data-reveal="up">
            Hosting and the technical upkeep that keeps your site fast, online and safe, so you can focus on your
            customers.
          </p>
          {heading === "h2" && (
            <p data-reveal="up" data-delay="0.1" style={{ marginTop: "1.75rem" }}>
              <Link href="/after-launch" className="link-u label label-accent">
                How we look after it →
              </Link>
            </p>
          )}
        </div>
        <ol className="care-list" data-stagger>
          {CARE.map(([t, d], i) => (
            <li key={t} className="care-item">
              <span className="label label-accent">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3>{t}</h3>
                <p>{d}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
