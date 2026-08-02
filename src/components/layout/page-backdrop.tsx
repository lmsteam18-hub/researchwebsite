/**
 * Fixed, non-interactive decorative backdrop rendered behind all content.
 * Soft gradient orbs + a light grain add depth to otherwise flat white
 * sections. Kept GPU-light (no mix-blend, moderate blur) for mobile.
 */
export function PageBackdrop() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-background" />

      {/* Gradient orbs */}
      <div className="absolute -left-32 top-[-8%] h-80 w-80 rounded-full bg-brand-400/20 blur-3xl dark:bg-brand-600/20 sm:h-[26rem] sm:w-[26rem]" />
      <div className="absolute right-[-12%] top-[18%] h-80 w-80 rounded-full bg-accent-400/20 blur-3xl dark:bg-accent-600/15 sm:h-[28rem] sm:w-[28rem]" />
      <div className="absolute bottom-[-8%] left-1/3 hidden h-80 w-80 rounded-full bg-brand-300/15 blur-3xl dark:bg-brand-500/10 sm:block sm:h-96 sm:w-96" />
    </div>
  );
}
