import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { StatsStrip } from "@/components/ui/stats-strip";
import { profile } from "@/data";

export function About() {
  return (
    <Section id="about" className="pt-8">
      <div className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Text */}
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="max-w-[54ch] text-base leading-relaxed text-foreground/75 sm:text-lg">
            {profile.about}
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface">
            <AuroraBackground variant="aurora" grid={false} fade={false} />
            {profile.portrait ? (
              <Image
                src={profile.portrait}
                alt={profile.realName}
                fill
                sizes="400px"
                className="object-cover object-[63%_50%] scale-115"
              />
            ) : (
              <PortraitPlaceholder />
            )}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
        </Reveal>
      </div>

      <StatsStrip />
    </Section>
  );
}

function PortraitPlaceholder() {
  return (
    <div className="grid h-full place-items-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--color-accent)_35%,transparent),transparent_60%),radial-gradient(circle_at_80%_80%,color-mix(in_oklab,var(--color-accent-3)_30%,transparent),transparent_55%)]">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-6xl">🎧</span>
        <span className="max-w-[12rem] text-xs text-muted">
          Add a portrait: set{" "}
          <code className="rounded bg-black/40 px-1">profile.portrait</code> in
          data.ts
        </span>
      </div>
    </div>
  );
}
