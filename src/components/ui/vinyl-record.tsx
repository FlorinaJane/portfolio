import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * A vinyl record with the brand mark as its label. Static and decorative — no
 * rotation, no tonearm — so this stays a Server Component.
 *
 * The record reads as a record because of the groove band between the label and
 * the rim, so `labelRatio` is the dial that matters: raise it to give the brand
 * mark more room, lower it for a wider, more obviously grooved ring.
 */

export interface VinylRecordProps {
  /** Image used as the record label — the brand mark. */
  label: string;
  labelAlt: string;
  /** Label diameter as a fraction of the record's. */
  labelRatio?: number;
  /** Forwarded to the label's `next/image` for correct srcset selection. */
  sizes?: string;
  /** Set when the record is above the fold. */
  priority?: boolean;
  className?: string;
}

export function VinylRecord({
  label,
  labelAlt,
  labelRatio = 0.74,
  sizes = "(max-width: 640px) 224px, (max-width: 768px) 272px, 320px",
  priority = false,
  className,
}: VinylRecordProps) {
  return (
    <div
      className={cn(
        "relative aspect-square w-full overflow-hidden rounded-full shadow-[0_24px_70px_-12px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      {/* Vinyl body */}
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_50%,#16171b_0%,#0b0c0f_62%,#06070a_100%)]" />

      {/* Grooves. The pitch stays at 4px — tighter than that aliases into
          moiré at the sizes this renders at. */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full opacity-70"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0 1px, rgba(0,0,0,0) 1px 4px)",
        }}
      />

      {/* Wider lands at intervals, as between tracks on a real pressing */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full opacity-50"
        style={{
          background:
            "repeating-radial-gradient(circle at 50% 50%, rgba(0,0,0,0.55) 0 2px, rgba(0,0,0,0) 2px 26px)",
        }}
      />

      {/* Specular sheen, angled across the disc */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.07)_46%,rgba(255,255,255,0.02)_52%,transparent_68%)]"
      />

      {/* Label. `scale-[1.208]` matches the rest of the site: the artwork's
          disc is only 82.8% of its canvas, so it needs scaling to sit flush
          inside a round crop rather than floating in dead space. */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full ring-1 ring-black/40"
        style={{
          width: `${labelRatio * 100}%`,
          height: `${labelRatio * 100}%`,
        }}
      >
        <Image
          src={label}
          alt={labelAlt}
          fill
          sizes={sizes}
          priority={priority}
          className="scale-[1.208] object-cover"
        />
      </div>
    </div>
  );
}
