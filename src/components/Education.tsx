import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { education } from "../data/resume";

export default function Education() {
  return (
    <section id="education" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="05" title="Education" kicker="// how I got here" />

      <div className="relative space-y-8 border-l border-line pl-8">
        {education.map((ed) => (
          <Reveal key={ed.school} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-cyan shadow-[0_0_0_4px_rgba(94,234,212,0.15)]" />
            <div className="glass rounded-2xl p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="font-display text-lg font-semibold text-white">{ed.school}</h3>
                <span className="font-mono text-sm text-fog">{ed.year}</span>
              </div>
              <p className="mt-1 text-sm text-mist">
                {ed.degree} · {ed.location}
              </p>
              <p className="mt-2 font-mono text-sm text-cyan">{ed.score}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
