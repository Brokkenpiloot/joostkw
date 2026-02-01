import { COMING_SOON_LABEL } from "@/lib/constants";

export function UnderConstructionMessage() {
  return (
    <div className="space-y-4 border border-neon-cyan/30 bg-background/80 px-6 py-6 backdrop-blur-sm neon-border">
      <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
        This page will be live soon. Here you’ll find more about{" "}
        <span className="text-neon-cyan">what I do</span>, my{" "}
        <span className="text-neon-cyan">career</span>, and where to{" "}
        <span className="text-neon-cyan">follow me</span> on social media.
      </p>
      <p className="font-mono text-sm text-zinc-500">{COMING_SOON_LABEL}</p>
    </div>
  );
}
