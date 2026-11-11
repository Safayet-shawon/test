import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/site";

export default function ServicesList() {
  return (
    <section className="tone section" data-tone="ivory" aria-labelledby="svc-title">
      <div className="wrap">
        <div className="svc-head">
          <div>
            <p className="label eyebrow" data-reveal="fade">
              What we build
            </p>
            <h2 id="svc-title" className="display h-xl" data-split="lines" style={{ margin: "1.25rem 0 0" }}>
              Five kinds of <em>software</em>, one team.
            </h2>
          </div>
          <p className="lede" data-reveal="up" data-delay="0.1">
            From a company website to the system that runs the factory floor. Pick one, or let us connect them.
          </p>
        </div>
        <ol className="svc-list" data-stagger>
          {SERVICES.map((s, i) => (
            <li key={s.id} className="svc">
              <Link href={`/services#${s.id}`} className="svc-row wrap" style={{ paddingInline: 0 }}>
                <span className="label svc-index">{String(i + 1).padStart(2, "0")}</span>
                <span className="svc-title">{s.title}</span>
                <span className="svc-body">
                  <span className="svc-desc">{s.line}</span>
                  <span className="svc-tags">
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="svc-arrow" aria-hidden="true">
                  <ArrowRight size={18} />
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
