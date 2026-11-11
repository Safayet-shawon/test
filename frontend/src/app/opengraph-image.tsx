import { ImageResponse } from "next/og";
import { SITE } from "@/data/site";

export const alt = "zerosoft · Software for any business";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview: ink background, a band of sand grains, the brand line.
export default function OpengraphImage() {
  const grains = Array.from({ length: 900 }, (_, i) => {
    const x = (i * 97.13) % 1200;
    const row = Math.floor(i / 60);
    const y = 430 + row * 13 + Math.sin(x / 90 + row) * 22;
    const c = ["#E6D3B6", "#D6BF98", "#C99B61", "#A96D37"][i % 4];
    return { x, y, c, r: 1.5 + (i % 3) };
  });
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#141311", color: "#F1E8D8", padding: "64px 72px", position: "relative" }}>
        {grains.map((g, i) => (
          <div key={i} style={{ position: "absolute", left: g.x, top: g.y, width: g.r * 2, height: g.r * 2, borderRadius: 99, background: g.c, opacity: 0.85 }} />
        ))}
        <div style={{ display: "flex", fontSize: 34, letterSpacing: -1 }}>
          <span style={{ fontWeight: 700 }}>zero</span>
          <span style={{ fontWeight: 300 }}>soft</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -3 }}>Software for</div>
          <div style={{ fontSize: 96, lineHeight: 1.05, letterSpacing: -3, color: "#C99B61", fontStyle: "italic" }}>any business.</div>
          <div style={{ fontSize: 26, marginTop: 28, color: "#A89F92" }}>{"Websites, web apps, SaaS and management systems · " + SITE.address.city}</div>
        </div>
      </div>
    ),
    size
  );
}
