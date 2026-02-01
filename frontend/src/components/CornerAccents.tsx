export function CornerAccents() {
  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 h-32 w-32 border-l-2 border-t-2 border-neon-cyan opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed right-0 top-0 h-32 w-32 border-r-2 border-t-2 border-neon-cyan opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 h-32 w-32 border-b-2 border-l-2 border-neon-cyan opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 right-0 h-32 w-32 border-b-2 border-r-2 border-neon-cyan opacity-60"
        aria-hidden
      />
    </>
  );
}
