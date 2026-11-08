import { ChatCircleText, PenNib, Code, RocketLaunch } from "@phosphor-icons/react/dist/ssr";
import { PROCESS } from "@/data/site";
import Reveal from "./Reveal";

const ICONS = { brief: ChatCircleText, design: PenNib, build: Code, launch: RocketLaunch };

export default function Process() {
  return (
    <section className="process" id="process">
      <div className="process-in">
        <Reveal as="h2">How we work</Reveal>
        <ol className="steps4">
          {PROCESS.map((s, i) => {
            const I = ICONS[s.icon];
            return (
              <Reveal as="li" key={s.title} delay={i * 110} className="step4">
                <div className="step-top">
                  <span className="step-ico">
                    <I size={26} weight="regular" aria-hidden="true" />
                  </span>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
