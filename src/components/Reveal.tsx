import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "../lib/gsap";

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
  y = 40,
  staggerChildren = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: Element[] = staggerChildren ? Array.from(el.children) : [el];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          delay: delay / 1000,
          stagger: staggerChildren ? 0.1 : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, y, staggerChildren]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
