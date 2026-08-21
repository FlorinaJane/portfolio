"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { CardDecor, surfaceCardClass } from "@/components/ui/surface-card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatINR, serviceInquiryHref, type Service } from "@/data";

/**
 * A lead pricing card. When the service is priced in tiers it renders a slider
 * and the figure tracks it; otherwise the figure is static.
 *
 * Client-side because of that slider. Server-rendered HTML shows the first
 * tier, which is also the "from" price, so the card is correct before hydration
 * and for anyone without JS.
 */

/** Half the slider thumb's width, from `.slider` in globals.css. */
const THUMB = 22;

/**
 * Where stop `i` sits along the track. A range input's thumb centre runs from
 * `THUMB/2` to `width - THUMB/2`, so plain percentages drift by up to half a
 * thumb at the ends and the tick marks stop lining up with the handle.
 */
function stopOffset(i: number, count: number) {
  const fraction = count > 1 ? i / (count - 1) : 0;
  return `calc(${THUMB / 2}px + ${fraction} * (100% - ${THUMB}px))`;
}

export function ServicePriceCard({ service }: { service: Service }) {
  const tiers = "tiers" in service.price ? service.price.tiers : null;
  const [index, setIndex] = useState(0);
  const tier = tiers?.[index];

  return (
    <div className={cn(surfaceCardClass(service.featured), "grid h-full")}>
      <CardDecor featured={service.featured} />
      <div className="relative flex h-full flex-col p-6 sm:p-7">
        <div className="flex items-center justify-between gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-2xl">
            {service.icon}
          </span>
          {service.featured && (
            <span className="font-label rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-accent">
              Most popular
            </span>
          )}
        </div>

        <h3 className="mt-5 font-display text-2xl font-semibold">
          {service.title}
        </h3>

        {/* The prefix line is rendered even when empty so the figures in the
            row share a baseline. */}
        <span className="font-label mt-4 block h-5 text-sm font-semibold uppercase leading-5 tracking-[0.12em] text-foreground">
          {tiers
            ? tier?.label
            : "prefix" in service.price
              ? service.price.prefix
              : ""}
        </span>

        <span className="flex items-baseline gap-1.5">
          <span className="text-gradient font-display text-5xl font-bold leading-none tracking-tight sm:text-[3.25rem]">
            {"onRequest" in service.price
              ? service.price.onRequest
              : `₹${formatINR(tier ? tier.amount : (service.price as { amount: number }).amount)}`}
          </span>
          {!tiers && "unit" in service.price && (
            <span className="text-base text-muted">{service.price.unit}</span>
          )}
        </span>

        {tiers && tier && (
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={tiers.length - 1}
              step={1}
              value={index}
              onChange={(e) => setIndex(Number(e.target.value))}
              aria-label={`${service.title} track count`}
              aria-valuetext={`${tier.label}, ₹${formatINR(tier.amount)}`}
              // Drives the filled portion of the groove; see `.slider` in
              // globals.css. Expressed as the thumb's centre rather than a flat
              // percentage, so the fill ends exactly under the thumb.
              style={
                {
                  "--slider-fill": stopOffset(index, tiers.length),
                } as React.CSSProperties
              }
              className="slider"
            />

            {/* One marker per stop, positioned at the same percentage the fill
                uses, so a tick always sits under the thumb. Two end labels
                ("below 10" / "above 100") gave no sense of the steps between. */}
            <div aria-hidden className="relative mt-1 h-7">
              {tiers.map((t, i) => (
                <span
                  key={t.label}
                  style={{ left: stopOffset(i, tiers.length) }}
                  className="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5"
                >
                  <span
                    className={cn(
                      "block w-px",
                      i === index ? "h-2 bg-accent" : "h-1.5 bg-white/20",
                    )}
                  />
                  <span
                    className={cn(
                      "font-label text-[11px] tabular-nums transition-colors",
                      i === index
                        ? "font-medium text-foreground"
                        : "text-subtle",
                    )}
                  >
                    {t.tick}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-4 text-base leading-relaxed text-muted">
          {service.description}
        </p>

        {service.includes && (
          <ul className="mt-5 flex flex-col gap-2.5">
            {service.includes.map((line) => (
              <li key={line} className="flex items-start gap-2.5">
                <Check
                  aria-hidden
                  className="mt-0.5 size-[18px] shrink-0 text-accent"
                />
                <span className="text-[15px] text-foreground/80">{line}</span>
              </li>
            ))}
          </ul>
        )}

        {/* `mt-auto` keeps the buttons on one line across the row even when the
            cards' copy runs to different lengths. */}
        <div className="mt-auto pt-7">
          <ButtonLink
            href={serviceInquiryHref(service.title)}
            variant={service.featured ? "primary" : "outline"}
            className="w-full justify-center"
          >
            {tiers ? "Book the bundle" : `Book ${service.title.toLowerCase()}`}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
