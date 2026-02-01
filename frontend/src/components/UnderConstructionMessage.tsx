import { COMING_SOON_LABEL } from "@/lib/constants";

export function UnderConstructionMessage() {
  return (
    <div className="space-y-4 border border-neon-cyan/30 bg-background/80 px-6 py-6 backdrop-blur-sm neon-border">
      <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
        I&apos;m working on this page as we speak. Bowie is ready to help you
        navigate the pages, but there&apos;s not much content on the pages yet.
        Keep checking in in the coming weeks to see Bowie (and the page)
        evolve!
      </p>
      <p className="font-mono text-sm text-zinc-500">{COMING_SOON_LABEL}</p>
    </div>
  );
}
