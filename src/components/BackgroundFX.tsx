export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      <div className="absolute inset-0 grid-bg" />
      <div className="animate-blob absolute -top-40 left-[8%] h-[30rem] w-[30rem] rounded-full bg-cyan/25 blur-[120px]" />
      <div
        className="animate-blob absolute top-[28%] right-[4%] h-[26rem] w-[26rem] rounded-full bg-violet/30 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="animate-blob absolute bottom-0 left-[28%] h-[24rem] w-[24rem] rounded-full bg-pink/20 blur-[130px]"
        style={{ animationDelay: "-11s" }}
      />
      <div
        className="animate-blob absolute bottom-[10%] right-[20%] h-[20rem] w-[20rem] rounded-full bg-amber/15 blur-[130px]"
        style={{ animationDelay: "-3s" }}
      />
      <div className="noise relative h-full w-full" />
    </div>
  );
}
