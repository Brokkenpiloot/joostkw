import Image from "next/image";

export default function Home() {
  return (
    <div className="cyber-grid scanlines min-h-screen bg-[#0a0a0f] text-zinc-200">
      {/* Corner accents */}
      <div className="pointer-events-none fixed left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-[#00f5ff] opacity-60" />
      <div className="pointer-events-none fixed right-0 top-0 h-32 w-32 border-r-2 border-t-2 border-[#00f5ff] opacity-60" />
      <div className="pointer-events-none fixed bottom-0 left-0 h-32 w-32 border-b-2 border-l-2 border-[#00f5ff] opacity-60" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-[#00f5ff] opacity-60" />

      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16">
        {/* Status line */}
        <div className="animate-flicker absolute left-6 top-6 font-mono text-xs tracking-widest text-[#00f5ff] opacity-80">
          [ SYSTEM: STANDBY ]
        </div>

        <div className="flex max-w-2xl flex-col items-center gap-10 text-center">
          {/* Photo with neon frame */}
          <div className="animate-pulse-glow relative overflow-hidden rounded-lg border-2 border-[#00f5ff]/50 bg-[#0a0a0f] p-1">
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

          {/* Headline */}
          <div className="space-y-2">
            <h1 className="font-mono text-2xl font-bold tracking-[0.3em] text-[#00f5ff] sm:text-3xl neon-text">
              JOOST KAAN
            </h1>
            <p className="font-mono text-sm tracking-widest text-[#ff00aa]/90">
              {"< UNDER_CONSTRUCTION />"}
            </p>
          </div>

          {/* Message */}
          <div className="space-y-4 border border-[#00f5ff]/30 bg-[#0a0a0f]/80 px-6 py-6 backdrop-blur-sm neon-border">
            <p className="text-base leading-relaxed text-zinc-300 sm:text-lg">
              This page will be live soon. Here you’ll find more about{" "}
              <span className="text-[#00f5ff]">what I do</span>, my{" "}
              <span className="text-[#00f5ff]">career</span>, and where to{" "}
              <span className="text-[#00f5ff]">follow me</span> on social media.
            </p>
            <p className="font-mono text-sm text-zinc-500">
              [ EST. COMING_SOON ]
            </p>
          </div>

          {/* Decorative line */}
          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-[#00f5ff]/50 to-transparent" />
        </div>

        {/* Bottom tag */}
        <p className="absolute bottom-6 font-mono text-xs text-zinc-600">
          joostkw.nl · v0.1
        </p>
      </main>
    </div>
  );
}
