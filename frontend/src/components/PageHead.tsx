import type { ReactNode } from "react";

export default function PageHead({ kicker, title, lede, tone = "light" }: { kicker: string; title: ReactNode; lede?: ReactNode; tone?: string }) {
  return (
    <header className="tone" data-tone={tone}>
      <div className="wrap page-head">
        <p className="label label-accent eyebrow" data-reveal="fade">
          {kicker}
        </p>
        <h1 className="display h-xl" data-split="lines">
          {title}
        </h1>
        {lede && (
          <p className="lede" data-reveal="up" data-delay="0.15">
            {lede}
          </p>
        )}
      </div>
    </header>
  );
}
