import { STATUS_LABEL } from "@/lib/constants";

export function StatusLine() {
  return (
    <div
      className="animate-flicker absolute left-6 top-6 font-mono text-xs tracking-widest text-neon-cyan opacity-80"
      aria-hidden
    >
      {STATUS_LABEL}
    </div>
  );
}
