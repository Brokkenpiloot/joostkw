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

type NavButtonPageProps = {
  /** Button label (e.g. "Tech Sociologist", "AI Advocate"). */
  label: string;
  /** Page to navigate to after dog jump. */
  href?: string;
};

/**
 * Floating nav button: dog bone + label. Triggers dog jump then navigates to the given page.
 */
export function NavButtonTechSociologist({
  label,
  href = "/tech-sociologist",
}: NavButtonPageProps) {
  const router = useRouter();
  const pixelDogRef = usePixelDogRef();

  const handleClick = () => {
    if (!pixelDogRef?.current) {
      router.push(href);
      return;
    }
    const centerY = typeof window !== "undefined" ? window.innerHeight * 0.4 : 300;
    pixelDogRef.current.triggerJumpThen(centerY, () => {
      router.push(href);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus-ring flex flex-col items-center gap-1.5 rounded-lg border border-neon-cyan/40 bg-background/80 px-3 py-2 shadow-[0_0_12px_var(--neon-cyan)] backdrop-blur-sm transition hover:border-neon-cyan hover:bg-neon-cyan/10 sm:gap-2 sm:px-4 sm:py-3"
      aria-label={`Go to ${label} page`}
    >
      <DogBoneIcon className="h-6 w-6 shrink-0 text-neon-cyan sm:h-8 sm:w-8" />
      <span className="font-mono text-[0.65rem] tracking-wider text-neon-cyan sm:text-xs">
        {label}
      </span>
    </button>
  );
}
