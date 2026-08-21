"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";
import {
  mixes,
  mixesHeading,
  youtubeEmbed,
  youtubeId,
  youtubeThumbMax,
  youtubeThumbSd,
  youtubeThumbSmall,
} from "@/data";

/**
 * Player stage plus a tracklist, rather than a grid of links out to YouTube.
 * Everything plays in place.
 *
 * The `<iframe>` is only mounted once someone presses play — before that the
 * stage is a still image, so the page loads no third-party player and sets
 * nothing. The embed host is `youtube-nocookie.com` for the same reason.
 */
export function Mixes() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(false);
  /** Indices whose 1280×720 thumbnail 404'd; see `youtubeThumbMax`. */
  const [noMaxRes, setNoMaxRes] = useState<Record<number, boolean>>({});

  const mix = mixes[active];

  return (
    <Section id="mixes" className="py-11 sm:py-16">
      <SectionHeading
        title={
          <>
            Mixes I’m <span className="text-gradient">Proud Of</span>
          </>
        }
        subtitle={mixesHeading.description}
      />

      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1.55fr_1fr] lg:gap-8">
        {/* Stage */}
        <Reveal className="min-w-0">
          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/8 bg-background shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
            {playing ? (
              // Remounting on track change is what re-triggers autoplay.
              <iframe
                key={youtubeId(mix.youtubeUrl)}
                src={youtubeEmbed(mix.youtubeUrl)}
                title={mix.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${mix.title}`}
                className="group absolute inset-0 block cursor-pointer"
              >
                <Image
                  src={
                    noMaxRes[active]
                      ? youtubeThumbSd(mix.youtubeUrl)
                      : youtubeThumbMax(mix.youtubeUrl)
                  }
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 62vw"
                  onError={() => setNoMaxRes((m) => ({ ...m, [active]: true }))}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-background via-background/25 to-transparent"
                />
                <span
                  aria-hidden
                  className="absolute inset-0 grid place-items-center"
                >
                  <span className="grid size-16 place-items-center rounded-full bg-white/10 ring-1 ring-inset ring-white/25 backdrop-blur-md transition duration-300 group-hover:bg-accent group-hover:ring-accent">
                    <Play className="size-6 translate-x-0.5 fill-foreground text-foreground transition-colors duration-300 group-hover:fill-[#08121d] group-hover:text-[#08121d]" />
                  </span>
                </span>
                <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-5 text-left sm:p-6">
                  <span className="font-display text-lg font-semibold leading-snug text-foreground sm:text-xl">
                    {mix.title}
                  </span>
                  {mix.artist && (
                    <span className="font-label text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
                      {mix.artist}
                    </span>
                  )}
                </span>
              </button>
            )}
          </div>
        </Reveal>

        {/* Tracklist */}
        <Reveal delay={0.1} className="relative min-w-0">
          <ul className="flex flex-col gap-1.5 lg:absolute lg:inset-0 lg:gap-1 lg:overflow-y-auto">
            {mixes.map((m, i) => {
              const current = i === active;
              return (
                <li key={m.youtubeUrl} className="lg:flex-1">
                  <button
                    type="button"
                    onClick={() => {
                      setActive(i);
                      setPlaying(true);
                    }}
                    aria-current={current || undefined}
                    className={cn(
                      "group flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-left transition-colors duration-200 lg:h-full lg:min-h-[2.75rem] lg:p-1.5",
                      current
                        ? "bg-white/[0.07] ring-1 ring-inset ring-white/10"
                        : "hover:bg-white/[0.05]",
                    )}
                  >
                    <span className="relative aspect-video w-[4.5rem] shrink-0 overflow-hidden rounded-lg sm:w-20 lg:w-16">
                      <Image
                        src={youtubeThumbSmall(m.youtubeUrl)}
                        alt=""
                        fill
                        sizes="80px"
                        className={cn(
                          "object-cover transition-opacity duration-200",
                          current
                            ? "opacity-100"
                            : "opacity-70 group-hover:opacity-100",
                        )}
                      />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "block truncate text-sm font-medium transition-colors duration-200",
                          current
                            ? "text-foreground"
                            : "text-foreground/80 group-hover:text-foreground",
                        )}
                      >
                        {m.title}
                      </span>
                      {m.artist && (
                        <span className="mt-0.5 block truncate text-xs text-subtle">
                          {m.artist}
                        </span>
                      )}
                    </span>

                    {/* Gold only on the selected row — a fill, not a hover. */}
                    <Play
                      aria-hidden
                      className={cn(
                        "mr-1 size-4 shrink-0 transition-colors duration-200",
                        current
                          ? "fill-accent text-accent"
                          : "fill-subtle text-subtle group-hover:fill-foreground group-hover:text-foreground",
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
