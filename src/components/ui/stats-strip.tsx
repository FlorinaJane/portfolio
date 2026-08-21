"use client";

import { Counter } from "@/components/ui/counter";
import { Reveal } from "@/components/ui/reveal";
import { stats } from "@/data";

export function StatsStrip() {
  return (
    <div className="relative mt-10 sm:mt-12">
      {/* Ambient gold bloom — the hero's radial glow scaled down to a strip, so
          the row reads as lit rather than boxed. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[min(56rem,100%)] -translate-x-1/2 -translate-y-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_22%,transparent),transparent_70%)] opacity-80 blur-3xl"
      />

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="h-full">
            {/* A plain card, not `SpotlightCard` — that primitive exists to
                paint a cursor-tracked gold glow, which is what we don't want
                here. Padding lives on the content so the glows below can bleed
                to the card's own edges.

                The surface is a gradient rather than a flat fill, and the
                `inset 0 1px 0` in the shadow is a hairline of light along the
                top inside edge. Together they read as a pane catching light
                from above; a flat box with a 1px border is what looked dated.

                `transition` lists `translate`, not `transform` — Tailwind v4's
                translate utilities set the standalone `translate` property. */}
            <div className="group relative grid h-full cursor-default overflow-hidden rounded-2xl border border-white/8 bg-linear-to-b from-surface/75 via-surface/45 to-surface/25 shadow-[0_14px_34px_-16px_rgba(0,0,0,0.85),inset_0_1px_0_0_rgba(255,255,255,0.08)] transition-[border-color,translate,box-shadow] duration-300 ease-out hover:border-white/20 hover:shadow-[0_20px_44px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.14)] motion-safe:hover:-translate-y-1">
              {/* Soft glow under the figure, echoing the hero's radial pools. */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 left-1/2 h-32 w-40 -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,color-mix(in_oklab,var(--color-accent)_18%,transparent),transparent_70%)] blur-2xl"
              />

              <div className="flex h-full flex-col items-center justify-center px-4 py-7 text-center sm:px-6 sm:py-9">
                {/* Suffix renders at the digits' own size on the baseline.
                    Shrunk or raised, "k+"/"M" read as an exponent, not a unit. */}
                <span className="text-gradient font-display text-[2.5rem] font-bold leading-none tracking-tight [filter:drop-shadow(0_0_20px_color-mix(in_oklab,var(--color-accent)_28%,transparent))] sm:text-5xl md:text-6xl">
                  <Counter value={s.value} suffix={s.suffix} />
                </span>
                <span className="mt-3 font-label text-xs font-medium uppercase tracking-[0.14em] text-muted sm:text-sm lg:text-xs xl:text-sm">
                  {s.label}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
