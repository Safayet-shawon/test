"use client";
import { useEffect, useRef, useState } from "react";

// Weighing-scale tape: business names slide right -> left past a fixed red needle.
// `pos` is an ever-increasing step counter; `item(j)` describes the card at position j.
export default function Tape({ pos, item }) {
  const wrap = useRef(null);
  const [m, setM] = useState({ w: 230, px: 150, ready: false });

  useEffect(() => {
    const el = wrap.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const small = r.width < 420;
      setM({ w: small ? 168 : 232, px: r.width * (small ? 0.36 : 0.3), ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tx = m.px - pos * m.w; // item `pos` starts exactly at the needle (a major tick), like a scale reading
  const js = [];
  for (let j = Math.max(0, pos - 2); j <= pos + 4; j++) js.push(j);
  const ease = m.ready ? undefined : { transition: "none" };

  return (
    <div className="tape" ref={wrap} style={{ "--w": `${m.w}px`, "--px": `${m.px}px` }} aria-label="Businesses we build websites for">
      <div className="tape-win">
        <div className="tape-ticks" style={{ backgroundPositionX: `${tx}px`, ...ease }} aria-hidden="true" />
        <div className="tape-track" style={{ transform: `translate3d(${tx}px,0,0)`, ...ease }}>
          {js.map((j) => {
            const it = item(j);
            return (
              <div key={j} className={`t-item ${j === pos ? "on" : j < pos ? "past" : ""}`} style={{ left: j * m.w }}>
                <span className="no">{it.no}</span>
                <b className="cat">{it.cat}</b>
                <small>{it.sub}</small>
              </div>
            );
          })}
        </div>
      </div>
      <div className="needle" aria-hidden="true" />
      <span className="needle-cap" aria-hidden="true">
        now showing
      </span>
    </div>
  );
}
