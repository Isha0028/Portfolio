import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FiExternalLink } from "react-icons/fi";
import { experience } from "../data/resume";

export default function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="03" title="Experience" kicker="// where I've worked" />

      <div className="space-y-8">
        {experience.map((job) => (
          <Reveal key={job.company} className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h3 className="font-display text-2xl font-semibold text-white">
                  {job.role} <span className="text-mist">@</span>{" "}
                  <a
                    href={job.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gradient inline-flex items-center gap-1"
                  >
                    {job.company}
                    <FiExternalLink className="text-base text-cyan" />
                  </a>
                </h3>
                <p className="mt-2 font-mono text-sm text-fog">{job.period}</p>
              </div>
            </div>

            <p className="mt-5 max-w-2xl text-mist">{job.summary}</p>

            <ul className="mt-6 space-y-3">
              {job.points.map((point, i) => (
                <li key={i} className="flex gap-3 text-sm leading-relaxed text-mist sm:text-base">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
