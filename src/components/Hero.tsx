import { lazy, Suspense, useEffect, useRef } from "react";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { gsap } from "../lib/gsap";
import { profile } from "../data/resume";
import SplitChars from "./SplitChars";
import Magnetic from "./Magnetic";

const AIOrb = lazy(() => import("./AIOrb"));

export default function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.15, defaults: { ease: "power4.out" } });

      tl.set(".hero-mask .split-char", { yPercent: 130 })
        .to(".hero-greet", { opacity: 1, y: 0, duration: 0.7 })
        .to(".hero-name .split-char", { yPercent: 0, duration: 1.1, stagger: 0.035 }, "-=0.35")
        .to(".hero-role .split-char", { yPercent: 0, duration: 0.9, stagger: 0.018 }, "-=0.75")
        .to(".hero-tagline", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5")
        .to(".hero-cta", { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, "-=0.5")
        .to(".hero-social", { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 }, "-=0.45")
        .to(".hero-orb-wrap", { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" }, "-=0.8")
        .to(".hero-bubble", { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
        .to(".hero-scrollcue", { opacity: 1, duration: 0.8 }, "-=0.3");

      gsap.to(".scroll-dot", {
        y: 26,
        repeat: -1,
        yoyo: true,
        duration: 1.4,
        ease: "power1.inOut",
      });

      gsap.to(".hero-bubble", {
        y: -8,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 pt-28 pb-16"
    >
      <div className="animate-blob absolute -z-20 top-1/3 left-1/2 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-violet/15 blur-[140px]" />

      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
        <div>
          <p className="hero-greet translate-y-4 font-mono text-cyan opacity-0">Hey, I'm</p>

          <h1 className="hero-name hero-mask font-display mt-3 text-5xl font-extrabold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
            <SplitChars text={`${profile.name}.`} />
          </h1>

          <h2 className="hero-role hero-mask font-display mt-3 text-2xl font-semibold leading-snug text-mist sm:text-3xl lg:text-4xl">
            <SplitChars text="I turn ideas into shipped products." />
          </h2>

          <p className="hero-tagline mt-7 max-w-lg translate-y-4 text-base leading-relaxed text-mist opacity-0 sm:text-lg">
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
            <Magnetic className="hero-cta translate-y-3 opacity-0" strength={0.4}>
              <a
                href="#projects"
                className="inline-block rounded-full bg-gradient-to-r from-cyan via-violet to-pink px-7 py-3 font-mono text-sm font-medium text-ink"
              >
                View my work
              </a>
            </Magnetic>
            <Magnetic className="hero-cta translate-y-3 opacity-0" strength={0.4}>
              <a
                href="#contact"
                className="inline-block rounded-full border border-line px-7 py-3 font-mono text-sm text-white transition-colors hover:border-cyan/50 hover:text-cyan"
              >
                Get in touch
              </a>
            </Magnetic>
          </div>

          <div className="mt-10 flex items-center gap-5">
            {[
              { icon: <FiGithub />, href: profile.github, label: "GitHub" },
              { icon: <FiLinkedin />, href: profile.linkedin, label: "LinkedIn" },
              { icon: <FiMail />, href: `mailto:${profile.email}`, label: "Email" },
            ].map((s) => (
              <Magnetic key={s.label} className="hero-social translate-y-3 opacity-0" strength={0.5}>
                <a
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
                >
                  {s.icon}
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        <div className="relative mx-auto h-[280px] w-full max-w-md sm:h-[380px] lg:h-[520px]">
          <div className="hero-orb-wrap h-full w-full scale-90 opacity-0">
            <Suspense fallback={null}>
              <AIOrb />
            </Suspense>
          </div>

          <div className="hero-bubble glass absolute right-2 top-2 max-w-[190px] translate-y-3 rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-mist opacity-0 sm:top-6 sm:right-0">
            <p>
              <span className="text-cyan">Hey 👋</span> I'm <span className="font-semibold text-white">ORB</span>, Isha's AI
              sidekick. She builds the backend, I just float here looking cool.
            </p>
          </div>
        </div>
      </div>

      <div className="hero-scrollcue absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 opacity-0 sm:flex">
        <span className="font-mono text-[11px] tracking-[0.3em] text-fog">SCROLL</span>
        <span className="relative h-14 w-px overflow-hidden bg-line">
          <span className="scroll-dot absolute left-0 top-0 h-3 w-px bg-cyan" />
        </span>
      </div>
    </section>
  );
}
