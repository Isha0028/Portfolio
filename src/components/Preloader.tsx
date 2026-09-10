import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      onDone();
      return;
    }

    const obj = { value: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(rootRef.current, {
          yPercent: -100,
          duration: 0.9,
          ease: "power4.inOut",
          delay: 0.15,
          onComplete: onDone,
        });
      },
    });

    tl.to(obj, {
      value: 100,
      duration: 1.6,
      ease: "power2.inOut",
      onUpdate: () => {
        const v = Math.round(obj.value);
        setCount(v);
        if (barRef.current) barRef.current.style.width = `${v}%`;
      },
    });

    return () => {
      tl.kill();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
    >
      <div className="font-display text-lg font-medium tracking-widest text-white">
        ISHA<span className="text-cyan">.</span>
      </div>
      <div className="mt-6 h-px w-40 overflow-hidden bg-line sm:w-56">
        <div ref={barRef} className="h-full w-0 bg-gradient-to-r from-cyan via-violet to-amber" />
      </div>
      <div className="mt-4 font-mono text-xs text-fog">{count}%</div>
    </div>
  );
}
