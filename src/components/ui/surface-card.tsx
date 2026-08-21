import { cn } from "@/lib/utils";

/**
 * The site's card surface, shared by the pricing rows.
 *
 * Deliberately not `SpotlightCard` — that primitive exists to paint a
 * cursor-tracked gold glow, which is the effect we do not want here.
 *
 * What makes it read as a made object rather than a filled rectangle: the fill
 * is a gradient rather than one flat tint, `inset 0 1px 0` puts a hairline of
 * light along the top inside edge, the shadow lifts it off the page and opens
 * up on hover, and `CardDecor` adds grain plus a soft pool of light at the top.
 */
export function surfaceCardClass(featured = false) {
  return cn(
    "group relative overflow-hidden rounded-2xl border transition-[border-color,translate,box-shadow] duration-300 ease-out",
    // `translate`, not `transform` — Tailwind v4's translate utilities set the
    // standalone `translate` property, so transitioning `transform` animates
    // nothing and the lift snaps.
    "motion-safe:hover:-translate-y-1",
    featured
      ? [
          "border-accent/35 bg-linear-to-b from-accent/[0.10] via-accent/[0.04] to-surface/25",
          "shadow-[0_18px_44px_-18px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.12)]",
          "hover:border-accent/55 hover:shadow-[0_26px_56px_-18px_rgba(0,0,0,0.95),inset_0_1px_0_0_rgba(255,255,255,0.18)]",
        ]
      : [
          "border-white/8 bg-linear-to-b from-surface/75 via-surface/45 to-surface/25",
          "shadow-[0_14px_34px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)]",
          "hover:border-white/20 hover:shadow-[0_22px_48px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.14)]",
        ],
  );
}

/**
 * The decorative layers. Rendered as siblings of the card content so they can
 * bleed to the card's own edges rather than sitting inside its padding.
 */
export function CardDecor({ featured = false }: { featured?: boolean }) {
  return (
    <>
      <span
        aria-hidden
        className="bg-noise pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
      />
      {/* Light pooling in from above, so the top of the card is where the
          surface is brightest. Gold on the lead card, white on the rest. */}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute -top-24 left-1/2 h-48 w-[130%] -translate-x-1/2 rounded-[50%] blur-2xl",
          featured
            ? "bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_20%,transparent),transparent_70%)]"
            : "bg-[radial-gradient(ellipse_at_center,rgb(255_255_255_/_0.07),transparent_70%)]",
        )}
      />
    </>
  );
}
