import VideoShot from "./VideoShot";

// A browser window showing a project: crossfading screenshots, or a scroll recording.
export default function Clip({ p, tilt = true }) {
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
          shots.map((src, i) => <div key={src} className="shot" style={{ backgroundImage: `url(${src})`, "--i": i }} />)
        )}
      </div>
    </div>
  );
}
