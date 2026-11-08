import Image from "next/image";
import { SHOT_SIZES } from "@/data/shotSizes";
import VideoShot from "./VideoShot";

// A browser window showing a project: screenshots (a second one crossfades) or a scroll recording.
// Screenshots go through next/image (resized AVIF/WebP) and pan with a GPU transform.
export default function Clip({ p, tilt = true, sizes = "(max-width: 700px) 86vw, (max-width: 1200px) 60vw, 720px" }) {
  const host = p.link ? p.link.replace(/^https?:\/\//, "").replace(/\/$/, "") : p.title;
  const shots = p.shots || [];
  return (
    <div className="clip has-shot" data-tilt={tilt ? "" : undefined}>
      <div className="chrome">
        <i />
        <i />
        <i />
        <span>{host}</span>
      </div>
      <div className={`shots n${p.video ? 1 : shots.length}`}>
        {p.video ? (
          <VideoShot id={p.video} poster={p.poster} title={p.title} />
        ) : (
          shots.map((src, i) => {
            const [w, h] = SHOT_SIZES[src] || [1200, 2400];
            return (
              <div key={src} className="shot" style={{ "--i": i }}>
                <Image src={src} alt={i === 0 ? `${p.title} website` : ""} width={w} height={h} sizes={sizes} />
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
