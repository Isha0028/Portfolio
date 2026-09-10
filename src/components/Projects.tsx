import { useEffect, useRef } from "react";
import { FiGithub, FiExternalLink } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import SectionHeading from "./SectionHeading";
import { projects } from "../data/resume";

const artGradients = [
  "from-cyan/30 via-violet/20 to-transparent",
  "from-violet/30 via-amber/15 to-transparent",
  "from-amber/25 via-cyan/15 to-transparent",
  "from-cyan/25 via-transparent to-violet/20",
  "from-violet/25 via-transparent to-cyan/20",
];

export default function Projects() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        const distance = () => track.scrollWidth - wrap.clientWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    }, wrap);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" className="relative">
      <div className="mx-auto max-w-6xl px-6 pt-28">
        <SectionHeading index="04" title="Projects" kicker="// things I've built" />
      </div>

      <div ref={wrapRef} className="relative overflow-x-auto lg:h-screen lg:overflow-hidden">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-6 px-6 pb-10 lg:h-full lg:snap-none lg:items-center lg:pb-0 lg:will-change-transform"
        >
          {projects.map((project, i) => (
            <article
              key={project.name}
              className="glass group relative flex h-[62vh] w-[86vw] shrink-0 snap-center flex-col justify-between overflow-hidden rounded-3xl p-7 sm:w-[60vw] sm:p-9 lg:h-[68vh] lg:w-[38vw]"
            >
              <div
                className={`pointer-events-none absolute -inset-1 bg-gradient-to-br ${artGradients[i % artGradients.length]} opacity-70 transition-transform duration-700 group-hover:scale-110`}
              />

              <div className="relative flex items-start justify-between gap-4">
                <span className="font-mono text-sm text-fog">
                  0{i + 1} / 0{projects.length}
                </span>
                <div className="flex gap-3 text-lg text-mist">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${project.name} on GitHub`}
                    className="rounded-full border border-line bg-ink/50 p-2 transition-colors hover:border-cyan/50 hover:text-cyan"
                  >
                    <FiGithub />
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${project.name} live site`}
                      className="rounded-full border border-line bg-ink/50 p-2 transition-colors hover:border-cyan/50 hover:text-cyan"
                    >
                      <FiExternalLink />
                    </a>
                  )}
                </div>
              </div>

              <div className="relative">
                <h3 className="font-display text-3xl font-semibold text-white sm:text-4xl">{project.name}</h3>
                <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist sm:text-base">
                  {project.description}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line bg-ink/50 px-2.5 py-1 font-mono text-xs text-fog"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
