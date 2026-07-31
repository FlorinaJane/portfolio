import Image from "next/image";
import { Play } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { mixes, youtubeThumb, youtubeWatch } from "@/data";

export function Mixes() {
  return (
    <Section id="mixes">
      <SectionHeading
        title={
          <>
            Mixes I’m <span className="text-gradient">proud of</span>
          </>
        }
        subtitle="A cross-section of releases across languages and genres. Hit play — headphones recommended."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {mixes.map((mix, i) => (
          <Reveal key={mix.youtubeUrl} delay={(i % 3) * 0.08}>
            <a
              href={youtubeWatch(mix.youtubeUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-surface/60 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={youtubeThumb(mix.youtubeUrl)}
                  alt={mix.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                {/* play button */}
                <div className="absolute inset-0 grid place-items-center">
                  <span className="grid size-14 place-items-center rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/30 transition-all duration-300 group-hover:scale-110 group-hover:bg-accent/80">
                    <Play className="size-5 translate-x-0.5 fill-white text-white" />
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 p-5">
                <h3 className="text-lg font-semibold leading-snug">
                  {mix.title}
                </h3>
                {mix.artist && (
                  <p className="text-sm text-muted">{mix.artist}</p>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
