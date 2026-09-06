export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 grid-bg" />
      <div className="animate-blob absolute -top-40 left-[8%] h-[28rem] w-[28rem] rounded-full bg-cyan/20 blur-[120px]" />
      <div
        className="animate-blob absolute top-[30%] right-[4%] h-[24rem] w-[24rem] rounded-full bg-violet/20 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-[30%] h-[22rem] w-[22rem] rounded-full bg-amber/10 blur-[130px]"
        style={{ animationDelay: "-11s" }}
      />
      <div className="noise relative h-full w-full" />
    </div>
  );
}
