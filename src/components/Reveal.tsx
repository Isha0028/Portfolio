import { useEffect, useRef, type ReactNode } from "react";
import { animate, stagger } from "animejs";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  staggerChildren?: boolean;
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element | Element[] = staggerChildren ? Array.from(el.children) : el;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          animate(targets, {
            opacity: [0, 1],
            y: [y, 0],
            duration: 900,
            delay: staggerChildren ? stagger(90, { start: delay }) : delay,
            ease: "outQuart",
          });
          io.unobserve(el);
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delay, y, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
