import { useEffect, useRef } from "react";
import { createTimeline, stagger } from "animejs";
import { FiArrowDown, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "../data/resume";

const codeLines = [
  { indent: 0, tokens: [{ t: "const ", c: "text-violet" }, { t: "isha", c: "text-cyan" }, { t: " = {", c: "text-mist" }] },
  { indent: 1, tokens: [{ t: "role", c: "text-cyan" }, { t: ": ", c: "text-mist" }, { t: "\"Software Developer\"", c: "text-amber" }, { t: ",", c: "text-mist" }] },
  { indent: 1, tokens: [{ t: "focus", c: "text-cyan" }, { t: ": ", c: "text-mist" }, { t: "\"Backend + Full-Stack\"", c: "text-amber" }, { t: ",", c: "text-mist" }] },
  { indent: 1, tokens: [{ t: "stack", c: "text-cyan" }, { t: ": [", c: "text-mist" }, { t: "\"Node\"", c: "text-amber" }, { t: ", ", c: "text-mist" }, { t: "\"React\"", c: "text-amber" }, { t: ", ", c: "text-mist" }, { t: "\"MongoDB\"", c: "text-amber" }, { t: "],", c: "text-mist" }] },
  { indent: 1, tokens: [{ t: "building", c: "text-cyan" }, { t: ": ", c: "text-mist" }, { t: "\"feryrides.co.in\"", c: "text-amber" }, { t: ",", c: "text-mist" }] },
  { indent: 1, tokens: [{ t: "available", c: "text-cyan" }, { t: ": ", c: "text-mist" }, { t: "true", c: "text-violet" } ] },
  { indent: 0, tokens: [{ t: "};", c: "text-mist" }] },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const tl = createTimeline({ defaults: { ease: "outQuart" } });
    tl.add(".hero-greet", { opacity: [0, 1], y: [16, 0], duration: 600 })
      .add(".hero-name", { opacity: [0, 1], y: [24, 0], duration: 800 }, "-=350")
      .add(".hero-role", { opacity: [0, 1], y: [20, 0], duration: 700 }, "-=450")
      .add(".hero-tagline", { opacity: [0, 1], y: [16, 0], duration: 700 }, "-=400")
      .add(".hero-cta", { opacity: [0, 1], y: [14, 0], duration: 600, delay: stagger(90) }, "-=380")
      .add(".hero-social", { opacity: [0, 1], x: [-10, 0], duration: 500, delay: stagger(70) }, "-=380")
      .add(".code-card", { opacity: [0, 1], x: [40, 0], rotateZ: [3, 0], duration: 900 }, "-=700")
      .add(".code-line", { opacity: [0, 1], x: [-12, 0], duration: 400, delay: stagger(80) }, "-=500");

    return () => {
      tl.pause();
    };
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-screen flex-col justify-center px-6 pt-28 pb-16"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="hero-greet font-mono text-cyan">Hi, my name is</p>
          <h1 className="hero-name font-display mt-2 text-5xl font-bold text-white sm:text-6xl lg:text-7xl">
            {profile.name}.
          </h1>
          <h2 className="hero-role font-display mt-1 text-3xl font-semibold text-mist sm:text-4xl lg:text-5xl">
            I build for the <span className="text-gradient">backend</span> out.
          </h2>
          <p className="hero-tagline mt-6 max-w-lg text-base leading-relaxed text-mist sm:text-lg">
            {profile.tagline} Currently engineering the backend and dashboards for{" "}
            <a
              href="https://feryrides.co.in/"
              target="_blank"
              rel="noreferrer"
              className="text-cyan underline decoration-cyan/30 underline-offset-4 hover:decoration-cyan"
            >
              Fery Rides
            </a>
            , a live ride-hailing platform.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="hero-cta rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
            >
              View my work
            </a>
            <a
              href="#contact"
              className="hero-cta rounded-full border border-line px-7 py-3 font-mono text-sm text-white transition-colors hover:border-cyan/50 hover:text-cyan"
            >
              Get in touch
            </a>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {[
              { icon: <FiGithub />, href: profile.github, label: "GitHub" },
              { icon: <FiLinkedin />, href: profile.linkedin, label: "LinkedIn" },
              { icon: <FiMail />, href: `mailto:${profile.email}`, label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                aria-label={s.label}
                className="hero-social flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="code-card glass hidden rounded-2xl p-5 shadow-2xl shadow-black/40 sm:block">
          <div className="mb-4 flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
            <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
            <span className="ml-3 font-mono text-xs text-fog">profile.ts</span>
          </div>
          <pre className="font-mono text-sm leading-7">
            {codeLines.map((line, i) => (
              <div key={i} className="code-line" style={{ paddingLeft: line.indent * 20 }}>
                {line.tokens.map((tok, j) => (
                  <span key={j} className={tok.c}>
                    {tok.t}
                  </span>
                ))}
              </div>
            ))}
          </pre>
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce text-mist sm:block"
      >
        <FiArrowDown />
      </a>
    </section>
  );
}
