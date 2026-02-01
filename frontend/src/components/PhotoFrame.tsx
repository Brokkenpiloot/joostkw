import Image from "next/image";

export function PhotoFrame() {
  return (
    <div className="animate-pulse-glow relative overflow-hidden rounded-lg border-2 border-neon-cyan/50 bg-background p-1">
      <div className="relative h-48 w-48 overflow-hidden rounded-md sm:h-56 sm:w-56">
        <Image
          src="/joost.png"
          alt="Joost Kaan"
          fill
          className="object-cover"
          sizes="(max-width: 640px) 192px, 224px"
          priority
        />
      </div>
    </div>
  );
}
