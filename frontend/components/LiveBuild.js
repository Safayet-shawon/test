"use client";
import { useEffect, useRef, useState } from "react";

// A small "code in, product out" loop for the Services grid: four lines of code type themselves,
// a build line appears, then the window turns into the page that code describes (title, a small
// chart, a button). It holds, then starts again. Runs only while on screen; with reduced motion
// it simply shows the finished page.
const LINES = ['<Page title="Bookings">', "  <Chart data={sales} />", "  <Button>Book now</Button>", "</Page>"];
const TOTAL = LINES.reduce((n, l) => n + l.length, 0);
const BARS = [42, 64, 50, 82, 70, 94];

// light syntax colouring: tags, attribute names, strings and braces
function paint(text) {
  const out = [];
  const re = /(<\/?|\/?>)|([A-Z][A-Za-z]*)|("[^"]*"?)|(\{[^}]*\}?)|([a-z]+(?==))/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const cls = m[1] ? "lb-p" : m[2] ? "lb-tag" : m[3] ? "lb-str" : m[4] ? "lb-var" : "lb-attr";
    out.push(
      <span key={m.index} className={cls}>
        {m[0]}
      </span>
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function LiveBuild() {
  const box = useRef(null);
  const [n, setN] = useState(0); // characters typed
  const [phase, setPhase] = useState("code"); // code -> built -> product

  useEffect(() => {
    const el = box.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setN(TOTAL);
      setPhase("product");
      return;
    }
    let timer;
    let visible = false;
    let state = { n: 0, phase: "code" };
    const set = (s) => {
      state = { ...state, ...s };
      if ("n" in s) setN(s.n);
      if ("phase" in s) setPhase(s.phase);
    };
    const step = () => {
      if (!visible) return;
      if (state.phase === "code") {
        if (state.n < TOTAL) {
          set({ n: state.n + 1 });
          timer = setTimeout(step, 34 + Math.random() * 46);
        } else {
          set({ phase: "built" });
          timer = setTimeout(step, 900);
        }
      } else if (state.phase === "built") {
        set({ phase: "product" });
        timer = setTimeout(step, 3600);
      } else {
        set({ phase: "code", n: 0 });
        timer = setTimeout(step, 700);
      }
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      clearTimeout(timer);
      if (visible) timer = setTimeout(step, 500);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  // split the typed characters across the lines
  let left = n;
  const shown = LINES.map((l) => {
    const t = l.slice(0, Math.max(0, left));
    left -= l.length;
    return t;
  });
  const caretLine = Math.min(
    LINES.length - 1,
    shown.findIndex((t, i) => t.length < LINES[i].length) === -1 ? LINES.length - 1 : shown.findIndex((t, i) => t.length < LINES[i].length)
  );

  return (
    <div className="lb" ref={box} data-phase={phase} aria-hidden="true">
      <div className="lb-bar">
        <i />
        <i />
        <i />
        <span className="lb-tab">{phase === "product" ? "bookings.app" : "page.jsx"}</span>
      </div>
      <div className="lb-body">
        <pre className="lb-code">
          {shown.map((t, i) => (
            <span key={i} className="lb-line">
              <span className="lb-num">{i + 1}</span>
              {paint(t)}
              {phase === "code" && i === caretLine && <span className="lb-caret" />}
              {"\n"}
            </span>
          ))}
          <span className={`lb-built${phase !== "code" ? " on" : ""}`}>✓ built in 1.2s</span>
        </pre>
        <div className="lb-app">
          <div className="lb-app-head">
            <b>Bookings</b>
            <span className="lb-btn">Book now</span>
          </div>
          <div className="lb-chart">
            {BARS.map((h, i) => (
              <i key={i} style={{ "--h": `${h}%`, "--k": i }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
