import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/data/site";

// Closing invitation, shown at the end of every page except the quotation form itself.
export default function Cta({ title = "Have a business that needs software?" }: { title?: string }) {
  return (
    <section className="cta tone" data-tone="dark" aria-labelledby="cta-title">
      <div className="cta-in wrap">
        <p className="label label-accent eyebrow" data-reveal="fade">
          Start a project
        </p>
        <h2 id="cta-title" className="cta-title display h-xl" data-split="lines" style={{ maxWidth: "15ch" }}>
          {title}
        </h2>
        <div className="hero-ctas" data-reveal="up" style={{ animation: "none" }}>
          <Link href="/quote" className="btn">
            Get a quotation <ArrowRight size={18} aria-hidden="true" />
          </Link>
          <a href={`mailto:${SITE.email}`} className="btn btn-ghost">
            {SITE.email}
          </a>
        </div>
        <p className="lede" data-reveal="fade" data-delay="0.2" style={{ marginTop: "1.75rem", fontSize: "0.95rem" }}>
          Five short steps, about two minutes. You get an itemised scope by email, then a detailed quotation within one
          business day.
        </p>
      </div>
    </section>
  );
}
