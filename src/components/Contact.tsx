import Reveal from "./Reveal";
import { FiGithub, FiLinkedin, FiMail, FiPhone } from "react-icons/fi";
import { profile } from "../data/resume";

export default function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-4xl px-6 py-28 text-center">
      <Reveal>
        <p className="section-heading-num text-sm">/07</p>
        <h2 className="font-display mt-3 text-4xl font-bold text-white sm:text-5xl">
          Let's build something <span className="text-gradient">worth shipping</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-mist">
          I'm open to backend and full-stack roles. Reach out and I'll get back to you as soon as I can.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan to-violet px-7 py-3 font-mono text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            <FiMail /> {profile.email}
          </a>
          <a
            href="tel:+918091104896"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3 font-mono text-sm text-white transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <FiPhone /> {profile.phone}
          </a>
        </div>

        <div className="mt-8 flex items-center justify-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <FiGithub />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-lg text-mist transition-colors hover:border-cyan/50 hover:text-cyan"
          >
            <FiLinkedin />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
