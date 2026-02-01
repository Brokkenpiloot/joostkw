"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="cyber-grid scanlines min-h-screen bg-background text-zinc-200">
      <main className="relative flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <h1 className="font-mono text-2xl font-bold tracking-widest text-neon-cyan sm:text-3xl">
          [ ERROR ]
        </h1>
        <p className="mt-4 font-mono text-sm text-zinc-400">
          Something went wrong.
        </p>
        <p className="mt-6 max-w-md text-zinc-300">
          We’re sorry. You can try again or go back to the home page.
        </p>
        <button
          type="button"
          onClick={reset}
          className="focus-ring mt-8 rounded border border-neon-cyan/50 px-6 py-3 font-mono text-sm text-neon-cyan transition-colors hover:bg-neon-cyan/10"
        >
          Try again
        </button>
      </main>
    </div>
  );
}
