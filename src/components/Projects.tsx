import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { projects } from "../data/resume";

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="04" title="Projects" kicker="// things I've built" />

      <div className="grid gap-6 sm:grid-cols-2">
        {projects.map((project, i) => (
          <Reveal
            key={project.name}
            delay={(i % 2) * 80}
            className={`glass group flex flex-col rounded-2xl p-6 transition-transform hover:-translate-y-1 ${
              project.featured ? "sm:col-span-2 lg:col-span-1" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold text-white group-hover:text-cyan transition-colors">
                {project.name}
              </h3>
              <div className="flex shrink-0 gap-3 text-lg text-mist">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${project.name} on GitHub`}
                  className="transition-colors hover:text-cyan"
                >
                  <FiGithub />
                </a>
                {project.live && (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} live site`}
                    className="transition-colors hover:text-cyan"
                  >
                    <FiExternalLink />
                  </a>
                )}
              </div>
            </div>

            <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span key={tech} className="rounded-full bg-surface-2 px-2.5 py-1 font-mono text-xs text-fog">
                  {tech}
                </span>
              ))}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
