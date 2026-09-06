interface AvatarProps {
  size?: number;
  className?: string;
}

export default function Avatar({ size = 220, className = "" }: AvatarProps) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="absolute -inset-3 animate-blob rounded-full bg-gradient-to-br from-cyan/40 via-violet/30 to-amber/30 blur-2xl" />
      <div className="glass relative flex h-full w-full items-center justify-center overflow-hidden rounded-full border-2 border-line">
        <span
          className="font-display text-gradient font-bold"
          style={{ fontSize: size * 0.4 }}
        >
          I
        </span>
        <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-white/10" />
      </div>
      <span className="absolute bottom-2 right-2 flex h-5 w-5 items-center justify-center rounded-full border-2 border-ink bg-cyan">
        <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      </span>
    </div>
  );
}
