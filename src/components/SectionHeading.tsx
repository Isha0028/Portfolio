import Reveal from "./Reveal";

interface SectionHeadingProps {
  index: string;
  title: string;
  kicker?: string;
}

export default function SectionHeading({ index, title, kicker }: SectionHeadingProps) {
  return (
    <Reveal className="mb-12">
      <div className="flex items-baseline gap-3">
        <span className="section-heading-num text-sm">/{index}</span>
        <h2 className="font-display text-3xl font-semibold text-white sm:text-4xl">{title}</h2>
        <span className="h-px flex-1 bg-line" />
      </div>
      {kicker && <p className="mt-3 max-w-xl font-mono text-sm text-fog">{kicker}</p>}
    </Reveal>
  );
}
