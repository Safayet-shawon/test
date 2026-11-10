// Hand-drawn symbol doodles for the Services cards. Every line is slightly uneven on purpose, and a
// shared SVG filter (#doodle-rough, rendered once by <DoodleDefs/>) roughens the edges like ink on paper.
// Each stroke has pathLength="1" so CSS can draw it on when the card scrolls into view.

const P = (d, i) => <path key={i} d={d} pathLength="1" style={{ "--i": i }} />;

const SHAPES = {
  // a browser window: frame, top bar, three dots, two lines of content
  browser: [
    "M6.2 9.6C18 8.3 43.5 8.7 57.9 9.8C58.7 20.4 58.3 30.6 57.3 40.3C42.4 41.2 21.6 40.7 6.8 39.9C5.9 30.2 5.6 19.4 6.6 11.2",
    "M6.6 17.2C21.6 16.3 40.2 17.5 57.7 16.7",
    "M10.3 13.1a1.3 1.3 0 1 0 0.2 0M15.2 13a1.3 1.3 0 1 0 0.2 0M20.1 13.2a1.3 1.3 0 1 0 0.2 0",
    "M13.2 25.4C21.8 24.5 30.4 25.6 38.6 24.7",
    "M13.4 31.6C18.7 30.9 23.9 31.5 28.8 31",
  ],
  // a cloud syncing data: one arrow up, one arrow down
  cloud: [
    "M16.4 31.8C8.9 32.4 7.2 23.8 13.8 22.3C13.1 13.6 24.2 10.7 28.3 17.2C31.4 9.6 44.6 10.4 45.2 20.1C52.6 19.3 55.4 29.4 48.1 31.9C37.6 32.7 26.1 32.3 17.8 31.9",
    "M27.1 45.2C27.3 42.1 27.2 39.4 27.3 36.4M24.6 39.1C25.5 38.2 26.3 37.2 27.3 36.3C28.2 37.3 29 38.2 29.9 39",
    "M36.9 36.4C37.1 39.4 36.9 42.2 37.1 45.1M34.5 42.5C35.4 43.4 36.2 44.3 37.1 45.2C38 44.3 38.8 43.4 39.6 42.6",
  ],
  // a phone, with a little spark of activity beside it
  phone: [
    "M22.3 6.6C30.1 5.9 37.8 6.2 42.6 7.1C43.4 18.2 43.1 30.1 42.3 41.6C34.8 42.3 27.9 41.9 22.5 41.2C21.7 30.3 21.5 17.9 22.1 8.2",
    "M29.2 11.3C31.2 10.9 33.1 11.1 35.1 11.2",
    "M29.8 36.9C31.4 36.5 33.2 36.6 34.9 37",
    "M48.2 14.6L52.4 11.3",
    "M49.1 21.4C50.9 21.1 52.6 21.3 54.6 21.2",
    "M48.3 28.1L52.2 31.2",
  ],
  // code: < / >
  code: [
    "M20.4 13.6C17 17.4 13.6 20.9 10.3 24.6C13.7 28.1 17.2 31.7 20.8 35.2",
    "M43.7 14.1C47.1 17.6 50.6 21 54 24.4C50.6 27.9 47.2 31.2 43.5 34.8",
    "M36.4 8.8C33.8 19.1 31.2 29.2 28.4 39.6",
  ],
  // a database: three stacked discs
  database: [
    "M14.2 12.2C14.1 7.1 49.8 7.2 49.9 12.1C50 17.2 14.3 17.3 14.2 12.4",
    "M14.2 12.4C14 20.3 14.3 28.4 14.1 36.1C14.3 41.7 49.6 41.6 49.8 36.2C49.9 28.3 50.1 20.2 49.9 12.2",
    "M14.2 20.4C14.6 25.4 49.4 25.5 49.9 20.3",
    "M14.1 28.4C14.5 33.4 49.5 33.3 49.9 28.2",
  ],
};

export function DoodleDefs() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <filter id="doodle-rough" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n" />
        <feDisplacementMap in="SourceGraphic" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
      </filter>
    </svg>
  );
}

export default function Doodle({ name }) {
  const paths = SHAPES[name] || SHAPES.code;
  return (
    <svg className="doodle" viewBox="0 0 64 48" aria-hidden="true" focusable="false">
      {/* a soft pastel smudge behind the drawing, like a highlighter pass */}
      <path className="doodle-smudge" d="M9 30C8 20 20 14 33 15C47 16 57 22 55 31C53 39 40 42 28 41C16 40 10 37 9 30Z" />
      <g className="doodle-ink">{paths.map(P)}</g>
    </svg>
  );
}
