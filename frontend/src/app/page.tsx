import { SITE_URL, UNDER_CONSTRUCTION_TAG, VERSION } from "@/lib/constants";
import { CornerAccents } from "@/components/CornerAccents";
import { PhotoFrame } from "@/components/PhotoFrame";
import { StatusLine } from "@/components/StatusLine";
import { UnderConstructionMessage } from "@/components/UnderConstructionMessage";

export default function Home() {
  return (
    <div className="cyber-grid scanlines min-h-screen bg-background text-zinc-200">
      <CornerAccents />

      <a
        href="#main-content"
        className="focus-ring absolute left-4 top-4 z-10 -translate-y-full rounded bg-background px-3 py-2 font-mono text-xs text-neon-cyan transition-transform focus:translate-y-0 focus:outline-none"
      >
        Skip to content
      </a>

      <main
        id="main-content"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16"
      >
        <StatusLine />

        <div className="flex max-w-2xl flex-col items-center gap-10 text-center">
          <PhotoFrame />

          <header className="space-y-2">
            <h1 className="font-mono text-2xl font-bold tracking-[0.3em] text-neon-cyan sm:text-3xl neon-text">
              JOOST KAAN
            </h1>
            <p className="font-mono text-sm tracking-widest text-neon-magenta/90">
              {UNDER_CONSTRUCTION_TAG}
            </p>
          </header>

          <section aria-label="Under construction message">
            <UnderConstructionMessage />
          </section>

          <div
            className="h-px w-3/4 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
            aria-hidden
          />
        </div>

        <p className="absolute bottom-6 font-mono text-xs text-zinc-600">
          {SITE_URL} · {VERSION}
        </p>
      </main>
    </div>
  );
}
