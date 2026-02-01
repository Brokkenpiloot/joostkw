import Link from "next/link";

/**
 * Centered "Return to home" button, placed below the dog horizon (fixed, not following the dog).
 */
export function ReturnHomeButton() {
  return (
    <Link
      href="/"
      className="focus-ring fixed left-1/2 z-[9997] -translate-x-1/2 rounded border border-neon-cyan/50 bg-background/90 px-5 py-2.5 font-mono text-sm text-neon-cyan shadow-[0_0_12px_var(--neon-cyan)] backdrop-blur-sm transition hover:border-neon-cyan hover:bg-neon-cyan/10"
      style={{ top: "85vh" }}
    >
      Return to home
    </Link>
  );
}
