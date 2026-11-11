import Link from "next/link";

export default function NotFound() {
  return (
    <section className="tone" data-tone="dark" style={{ minHeight: "100svh", display: "grid", placeItems: "center" }}>
      <div className="wrap" style={{ paddingTop: "var(--nav-h)" }}>
        <p className="label label-accent">404</p>
        <h1 className="display h-xl" style={{ margin: "1rem 0 1.5rem" }}>
          This page has <em>blown away.</em>
        </h1>
        <p className="lede">The link may be old, or the page may have moved.</p>
        <p style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn">
            Back to the home page
          </Link>
        </p>
      </div>
    </section>
  );
}
