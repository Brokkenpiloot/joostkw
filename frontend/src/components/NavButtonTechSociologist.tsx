"use client";

import { useRouter } from "next/navigation";
import { usePixelDogRef } from "@/contexts/PixelDogRefContext";

/**
 * Dog bone icon (simple SVG).
 */
function DogBoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      aria-hidden
    >
      <path d="M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM20 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM4 6h16M8 2l2 4-2 4M16 2l-2 4 2 4" />
    </svg>
  );
}

/**
 * Floating nav button: dog bone + "Tech Sociologist". Triggers dog jump then navigates to /tech-sociologist.
 */
export function NavButtonTechSociologist() {
  const router = useRouter();
  const pixelDogRef = usePixelDogRef();

  const handleClick = () => {
    if (!pixelDogRef?.current) {
      router.push("/tech-sociologist");
      return;
    }
    const centerY = typeof window !== "undefined" ? window.innerHeight * 0.4 : 300;
    pixelDogRef.current.triggerJumpThen(centerY, () => {
      router.push("/tech-sociologist");
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-ring flex flex-col items-center gap-2 rounded-lg border border-neon-cyan/40 bg-background/80 px-4 py-3 shadow-[0_0_12px_var(--neon-cyan)] backdrop-blur-sm transition hover:border-neon-cyan hover:bg-neon-cyan/10"
      aria-label="Go to Tech Sociologist page"
    >
      <DogBoneIcon className="h-8 w-8 text-neon-cyan" />
      <span className="font-mono text-xs tracking-wider text-neon-cyan">
        Tech Sociologist
      </span>
    </button>
  );
}
