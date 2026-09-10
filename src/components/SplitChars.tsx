import { splitChars } from "../lib/splitText";

export default function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span className={`inline-block ${className}`}>
      {splitChars(text).map((c, i) =>
        c.space ? (
          <span key={i}>&nbsp;</span>
        ) : (
          <span key={i} className="inline-block overflow-hidden">
            <span className="split-char inline-block will-change-transform">{c.char}</span>
          </span>
        )
      )}
    </span>
  );
}
