import { cn } from "@/lib/utils";

/**
 * Ambient aurora glow. Purely decorative and ignores pointer events.
 *
 * `variant` picks the implementation:
 *
 *  - "aurora" is Aceternity's: two layered repeating-linear-gradients whose
 *    `background-position` sweeps across the box, with a `mix-blend-difference`
 *    copy on the ::after cutting the streaks into it. The motion lives in the
 *    background, not in a transform, so it stays visible at any box size.
 *  - "blobs" is the older effect — three drifting radial blobs. Kept because
 *    the hero is built around it. Note it animates `rotate()` on circles, so
 *    it reads as motion only at page scale, where the translate and scale have
 *    room to show.
 */
export function AuroraBackground({
  className,
  variant = "blobs",
  grid = true,
  fade = true,
}: {
  className?: string;
  variant?: "aurora" | "blobs";
  /** The faint ruled grid over the effect. */
  grid?: boolean;
  /** Bottom fade into the page background — only meaningful full-bleed. */
  fade?: boolean;
}) {
  const blobs = variant === "blobs";

  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        // Full-bleed use sits behind the section's own content; inside a panel
        // it has to stay in flow, or it drops behind the panel's background.
        blobs ? "-z-10" : "z-0",
        className,
      )}
    >
      {blobs ? (
        <>
          <div className="animate-aurora-blobs absolute left-1/2 top-[-15%] h-[45rem] w-[45rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent),transparent_60%)] opacity-30 blur-3xl" />
          <div className="animate-aurora-blobs absolute right-[-10%] top-[10%] h-[35rem] w-[35rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-2),transparent_60%)] opacity-25 blur-3xl [animation-delay:-6s]" />
          <div className="animate-aurora-blobs absolute bottom-[-20%] left-[-5%] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle_at_center,var(--color-accent-3),transparent_60%)] opacity-20 blur-3xl [animation-delay:-12s]" />
        </>
      ) : (
        <div
          className={cn(
            // Overhanging the box keeps the blur from showing a seam at the
            // edges. Aceternity ships this at opacity-50 with a 10px blur,
            // which reads as a light show at this size — heavier blur and a
            // third of the opacity turn the same sweep into ambience.
            "pointer-events-none absolute -inset-[20px] opacity-[0.45] blur-[26px] will-change-transform",
            // Brand palette in place of Aceternity's blues, weighted towards
            // the steel blue so the gold arrives as occasional warmth rather
            // than as bands. The dark stripes are the page navy, which is what
            // the difference blend below carves the colour out of.
            "[--aurora:repeating-linear-gradient(100deg,var(--color-accent-3)_10%,var(--color-accent-2)_16%,var(--color-accent-3)_22%,var(--color-accent)_26%,var(--color-accent-3)_32%)]",
            "[--stripes:repeating-linear-gradient(100deg,var(--color-background)_0%,var(--color-background)_7%,transparent_10%,transparent_12%,var(--color-background)_16%)]",
            "[background-image:var(--stripes),var(--aurora)]",
            "[background-size:300%,_200%]",
            "[background-position:50%_50%,50%_50%]",
            "after:absolute after:inset-0 after:content-['']",
            "after:[background-image:var(--stripes),var(--aurora)]",
            "after:[background-size:200%,_100%]",
            "after:animate-aurora after:mix-blend-difference",
            // Concentrated behind her head and gone by the lower corners, so
            // the panel still ends in flat navy rather than in a sweep.
            "[mask-image:radial-gradient(ellipse_at_50%_20%,black_15%,transparent_85%)]",
          )}
        />
      )}

      {/* grid + fade */}
      {grid && (
        <div className="bg-grid bg-radial-fade absolute inset-0 opacity-40" />
      )}

      {/* bottom fade into page bg */}
      {fade && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      )}
    </div>
  );
}
