import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHead from "@/components/PageHead";
import Cta from "@/components/Cta";
import { SERVICES, ALL_WORK, type WorkItem } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Websites, SaaS products, apps, custom software and management systems (ERP, CRM, staff portals), designed and built by one team in Dhaka.",
  alternates: { canonical: "/services" },
};

// A few real projects per service, to show rather than tell.
const EXAMPLES: Record<string, string[]> = {
  websites: ["singledot", "moonstar", "kolpo", "tomadachis"],
  saas: ["microservice"],
  apps: ["turf", "architect"],
  custom: ["singledot", "moonstar-portal"],
  systems: ["winner-erp", "sohrab-crm", "moonstar-portal"],
};

export default function ServicesPage() {
  return (
    <>
      <PageHead
        kicker="Services"
        title={
          <>
            What we <em>build.</em>
          </>
        }
        lede="Five kinds of software, designed and built by the same team, and looked after once they are live."
      />
      <section className="tone" data-tone="light" aria-label="Service details">
        <div className="wrap" style={{ paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
          {SERVICES.map((s, i) => {
            const ex = (EXAMPLES[s.id] || []).map((id) => ALL_WORK.find((w) => w.id === id)).filter((w): w is WorkItem => Boolean(w));
            return (
              <article key={s.id} id={s.id} className="svc-detail" style={{ scrollMarginTop: "6rem" }}>
                <div>
                  <span className="label label-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h2 data-split="lines">{s.title}</h2>
                </div>
                <div data-reveal="up">
                  <p>{s.text}</p>
                  <div className="svc-tags" style={{ marginBottom: "1.5rem" }}>
                    {s.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                  {ex.length > 0 && (
                    <p className="label" style={{ fontSize: "0.72rem" }}>
                      Examples:{" "}
                      {ex.map((w, j) => (
                        <span key={w.id}>
                          {j > 0 && ", "}
                          <Link href="/work" className="link-u" style={{ color: "var(--fg)" }}>
                            {w.title}
                          </Link>
                        </span>
                      ))}
                    </p>
                  )}
                </div>
              </article>
            );
          })}
          <p data-reveal="up" style={{ marginTop: "2rem" }}>
            <Link href="/process" className="btn btn-ghost">
              How we work <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </p>
        </div>
      </section>
      <Cta />
    </>
  );
}
