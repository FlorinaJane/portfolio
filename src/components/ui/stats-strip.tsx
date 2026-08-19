"use client";

import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { stats } from "@/data";

export function StatsStrip() {
  return (
    <div className="relative mt-10 sm:mt-12">
      {/* Ambient gold bloom — the hero's radial glow scaled down to a strip, so
          the row reads as lit rather than boxed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[min(56rem,110%)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_70%)] opacity-80 blur-3xl"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="h-full">
            {/* Padding lives on the content, so the glow below can bleed to
                the card's own edges. */}
            <SpotlightCard className="grid h-full cursor-default bg-surface/40 motion-safe:transition-transform motion-safe:duration-300 motion-safe:hover:-translate-y-1">
              {/* Soft glow under the figure, echoing the hero's radial pools. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 left-1/2 h-32 w-40 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_70%)] blur-2xl"
              />

              <div className="flex h-full flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-9">
                {/* Suffix renders at the digits' own size on the baseline.
                    Shrunk or raised, "k+"/"M" read as an exponent, not a unit. */}
                <span className="text-gradient font-display text-[2.5rem] font-bold leading-none tracking-tight sm:text-5xl md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-3 font-label text-xs font-medium uppercase tracking-[0.14em] text-muted sm:text-sm">
                  {s.label}
                </span>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
