const ITEMS = ["SaaS", "Websites", "Products", "Landing pages", "Dashboards", "Online stores", "Brand sites", "Web apps"];

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
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
