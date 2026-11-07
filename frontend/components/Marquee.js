const DEFAULT = ["SaaS", "Websites", "Products", "Landing pages", "Dashboards", "Online stores", "Brand sites", "Web apps"];

export default function Marquee({ items = DEFAULT, className = "" }) {
  const row = [...items, ...items];
  return (
    <div className={`marquee ${className}`} aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-row" key={k}>
            {row.map((t, i) => (
              <span key={i}>
                {t} <em>✦</em>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
