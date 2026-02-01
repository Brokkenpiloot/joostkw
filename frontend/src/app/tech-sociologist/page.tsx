import { LINKEDIN_URL, SITE_URL, TECH_SOCIOLOGIST_TAG, VERSION } from "@/lib/constants";
import { CornerAccents } from "@/components/CornerAccents";
import { PhotoFrame } from "@/components/PhotoFrame";
import { ReturnHomeButton } from "@/components/ReturnHomeButton";
import { StatusLine } from "@/components/StatusLine";
import { UnderConstructionMessage } from "@/components/UnderConstructionMessage";

export default function TechSociologistPage() {
  return (
    <div className="cyber-grid scanlines min-h-screen bg-background text-zinc-200">
      <CornerAccents />

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
              {TECH_SOCIOLOGIST_TAG}
            </p>
          </header>

          <section aria-label="Under construction message">
            <UnderConstructionMessage
              message="Sociologist specialised in societal implications of technological paradigm shifts. Now, in the AI-era, I lead teams to maximize their impact as a dev advocate and team/product lead. Add me on LinkedIn so we can chat about what I can do for your company!"
              footer={
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring text-neon-cyan underline underline-offset-2 outline-none hover:text-neon-cyan/90"
                >
                  {LINKEDIN_URL}
                </a>
              }
            />
          </section>

          <div
            className="h-px w-3/4 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent"
            aria-hidden
          />
        </div>

        <ReturnHomeButton />

        <p className="absolute bottom-6 font-mono text-xs text-zinc-600">
          {SITE_URL} · {VERSION}
        </p>
      </main>
    </div>
  );
}
