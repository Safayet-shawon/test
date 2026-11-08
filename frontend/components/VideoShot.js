"use client";
import { useEffect, useRef, useState } from "react";

// A scroll recording of a live site. Loads when it first comes into view, plays while visible,
// and rewinds to the first frame (the site's hero) when it leaves. Falls back to the poster.
export default function VideoShot({ id, poster, title }) {
  const ref = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && e.intersectionRatio > 0.35) {
          if (!v.getAttribute("src")) v.src = `/video/${id}.mp4`;
          if (!reduce) v.play().catch(() => {});
        } else {
          v.pause();
          try {
            v.currentTime = 0;
          } catch {}
        }
      },
      { threshold: [0, 0.35, 0.6] }
    );
    io.observe(v);
    return () => io.disconnect();
  }, [id]);

  if (failed) return <img className="shot-media" src={poster} alt={`${title}: first screen`} />;
  return (
    <video
      ref={ref}
      className="shot-media"
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      aria-label={`${title}: screen recording of the site`}
      onError={() => setFailed(true)}
    />
  );
}
