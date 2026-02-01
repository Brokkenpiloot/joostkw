import { SITE_URL, UNDER_CONSTRUCTION_TAG, VERSION } from "@/lib/constants";
import { CornerAccents } from "@/components/CornerAccents";
import { NavButtonTechSociologist } from "@/components/NavButtonTechSociologist";
import { PhotoFrame } from "@/components/PhotoFrame";
import { StatusLine } from "@/components/StatusLine";
import { UnderConstructionMessage } from "@/components/UnderConstructionMessage";

export default function Home() {
  return (
    <div className="cyber-grid scanlines min-h-screen bg-background text-zinc-200">
      <CornerAccents />

      <main
        id="main-content"
        className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16"
      >
        <StatusLine />

        <div className="flex max-w-2xl flex-col items-center gap-10 text-center">
          <div className="flex min-w-0 flex-row flex-nowrap items-center justify-center gap-2 px-2 sm:gap-4 sm:px-4 md:gap-6 md:px-6">
            <div className="shrink-0">
              <NavButtonTechSociologist label="Tech Sociologist" />
            </div>
            <div className="aspect-square w-[max(3.5rem,min(14rem,calc(100vw-20rem)))] shrink-0 overflow-hidden">
              <PhotoFrame fillContainer />
            </div>
            <div className="shrink-0">
              <NavButtonTechSociologist label="AI Advocate" />
            </div>
          </div>

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
