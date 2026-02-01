import Image from "next/image";

type PhotoFrameProps = {
  /** When true, fills the parent container (e.g. inside a flex row with set size). When false, uses explicit responsive dimensions. */
  fillContainer?: boolean;
};

export function PhotoFrame({ fillContainer = false }: PhotoFrameProps) {
  return (
    <div
      className={
        fillContainer
          ? "animate-pulse-glow relative h-full w-full min-h-0 min-w-0 overflow-hidden rounded-lg border-2 border-neon-cyan/50 bg-background p-1"
          : "animate-pulse-glow relative h-32 w-32 shrink-0 overflow-hidden rounded-lg border-2 border-neon-cyan/50 bg-background p-1 sm:h-48 sm:w-48 md:h-56 md:w-56"
      }
    >
      <div className="relative h-full w-full overflow-hidden rounded-md">
        <Image
          src="/joost.png"
          alt="Joost Kaan"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, 224px"
          priority
        />
      </div>
    </div>
  );
}
