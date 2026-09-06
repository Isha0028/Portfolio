import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FiAward, FiUsers } from "react-icons/fi";
import { achievements, leadership } from "../data/resume";

export default function Achievements() {
  return (
    <section id="achievements" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="06" title="Achievements & Leadership" kicker="// beyond the code" />

      <div className="grid gap-8 lg:grid-cols-2">
        <Reveal className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <FiAward className="text-cyan" /> Certifications &amp; Awards
          </h3>
          <ul className="space-y-4">
            {achievements.map((a) => (
              <li key={a.title} className="flex items-start justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-white sm:text-base">{a.title}</p>
                  <p className="mt-1 font-mono text-xs text-fog">{a.org}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-cyan">{a.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={100} className="glass rounded-2xl p-6 sm:p-8">
          <h3 className="mb-5 flex items-center gap-2 font-display text-lg font-semibold text-white">
            <FiUsers className="text-cyan" /> Positions of Responsibility
          </h3>
          <ul className="space-y-4">
            {leadership.map((l) => (
              <li key={l.title} className="flex items-start justify-between gap-4 border-b border-line pb-4 last:border-0 last:pb-0">
                <div>
                  <p className="text-sm text-white sm:text-base">{l.title}</p>
                  <p className="mt-1 font-mono text-xs text-fog">{l.org}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-cyan">{l.year}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
