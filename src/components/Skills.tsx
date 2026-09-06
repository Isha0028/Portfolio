import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { skills } from "../data/resume";

const groups = Array.from(new Set(skills.map((s) => s.group)));

export default function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="02" title="Skills" kicker="// tools I reach for" />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {groups.map((group, gi) => (
          <Reveal key={group} delay={gi * 60} className="glass rounded-2xl p-6">
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-cyan">{group}</p>
            <div className="flex flex-wrap gap-2">
              {skills
                .filter((s) => s.group === group)
                .map((s) => (
                  <span
                    key={s.name}
                    className="rounded-full border border-line bg-surface-2 px-3 py-1.5 text-sm text-mist transition-colors hover:border-cyan/40 hover:text-white"
                  >
                    {s.name}
                  </span>
                ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
