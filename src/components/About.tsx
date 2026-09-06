import Reveal from "./Reveal";
import Avatar from "./Avatar";
import SectionHeading from "./SectionHeading";
import { bio, education } from "../data/resume";

export default function About() {
  const latest = education[0];

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-28">
      <SectionHeading index="01" title="About Me" kicker="// whoami" />

      <div className="grid gap-12 md:grid-cols-[auto_1fr] md:items-start">
        <Reveal className="mx-auto md:mx-0">
          <Avatar size={200} />
        </Reveal>

        <Reveal delay={100} className="space-y-5">
          <p className="text-lg leading-relaxed text-mist whitespace-pre-line">{bio}</p>

          <div className="glass flex flex-wrap gap-x-8 gap-y-3 rounded-xl p-5 font-mono text-sm">
            <div>
              <p className="text-fog">education</p>
              <p className="text-white">{latest.school}</p>
            </div>
            <div>
              <p className="text-fog">degree</p>
              <p className="text-white">{latest.degree} · CGPA {latest.score.replace("CGPA ", "")}</p>
            </div>
            <div>
              <p className="text-fog">based in</p>
              <p className="text-white">Himachal Pradesh, India</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
