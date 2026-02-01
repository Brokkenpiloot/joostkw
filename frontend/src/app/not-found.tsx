import Link from "next/link";
import { SITE_URL } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="cyber-grid scanlines min-h-screen bg-background text-zinc-200">
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-mono text-2xl font-bold tracking-widest text-neon-cyan sm:text-3xl">
          404
        </h1>
        <p className="mt-4 font-mono text-sm text-zinc-400">
          [ PAGE_NOT_FOUND ]
        </p>
        <p className="mt-6 max-w-md text-zinc-300">
          This page doesn’t exist or has been moved.
        </p>
        <Link
          href="/"
          className="focus-ring mt-8 rounded border border-neon-cyan/50 px-6 py-3 font-mono text-sm text-neon-cyan transition-colors hover:bg-neon-cyan/10"
        >
          Back to {SITE_URL}
        </Link>
      </main>
    </div>
  );
}
