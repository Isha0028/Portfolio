export default function SplitChars({ text, className = "" }: { text: string; className?: string }) {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.flatMap((word, wi) => {
        const wordSpan = (
          <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
            {word.split("").map((char, ci) => (
              <span key={ci} className="inline-block overflow-hidden">
                <span className="split-char inline-block will-change-transform">{char}</span>
              </span>
            ))}
          </span>
        );
        return wi < words.length - 1 ? [wordSpan, <span key={`sp-${wi}`}> </span>] : [wordSpan];
      })}
    </span>
  );
}
