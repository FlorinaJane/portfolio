import { cn } from "@/lib/utils";

/**
 * Ambient aurora glow — animated color blobs behind the hero.
 * Purely decorative; sits at -z-10 and ignores pointer events.
 */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className,
      )}
    >
      {/* animated color blobs */}
      <div className="absolute left-1/2 top-[-15%] h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent),transparent_60%)] opacity-30 blur-3xl animate-aurora" />
      <div className="absolute right-[-10%] top-[10%] h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-2),transparent_60%)] opacity-25 blur-3xl animate-aurora [animation-delay:-6s]" />
      <div className="absolute bottom-[-20%] left-[-5%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-3),transparent_60%)] opacity-20 blur-3xl animate-aurora [animation-delay:-12s]" />

      {/* grid + fade */}
      <div className="absolute inset-0 bg-grid bg-radial-fade opacity-40" />

      {/* bottom fade into page bg */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
    </div>
  );
}
