"use client";
import { useEffect, useRef, useState } from "react";

// A conveyor belt in 3D perspective: business tiles ride right -> left and recede into the dark.
// `pos` is an ever-increasing step counter; `item(j)` describes the tile at position j.
export default function Tape({ pos, item }) {
  const wrap = useRef(null);
  const [m, setM] = useState({ w: 236, px: 170, ready: false });

  useEffect(() => {
    const el = wrap.current;
    const measure = () => {
      const r = el.getBoundingClientRect();
      const small = r.width < 460;
      setM({ w: small ? 170 : 240, px: r.width * (small ? 0.3 : 0.3), ready: true });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const tx = m.px - pos * m.w; // tile `pos` rests at the station
  const js = [];
  for (let j = Math.max(0, pos - 3); j <= pos + 4; j++) js.push(j);
  const still = m.ready ? undefined : { transition: "none" };

  return (
    <div className="belt" ref={wrap} style={{ "--w": `${m.w}px` }} aria-label="Businesses we build websites for">
      <div className="belt-3d">
        <div className="belt-band" style={{ backgroundPositionX: `${tx}px`, ...still }} aria-hidden="true" />
        <div className="belt-track" style={{ transform: `translate3d(${tx}px,0,0)`, ...still }}>
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
      <div className="belt-fog" aria-hidden="true" />
    </div>
  );
}
