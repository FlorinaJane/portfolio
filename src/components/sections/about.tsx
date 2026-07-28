import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { Counter } from "@/components/ui/counter";
import { profile, stats } from "@/data";

export function About() {
  return (
    <Section id="about" className="pt-8">
      <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Text */}
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            Hi, I’m{" "}
            <span className="text-gradient">{profile.realName}</span>
          </h2>
          <p className="text-base leading-relaxed text-muted sm:text-lg">
            {profile.about}
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {profile.genres.map((g) => (
              <span
                key={g}
                className="rounded-full border border-border bg-surface/50 px-3 py-1.5 text-sm text-foreground/80"
              >
                {g}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Portrait / visual */}
        <Reveal delay={0.15} className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface">
            {profile.portrait ? (
              <Image
                src={profile.portrait}
                alt={profile.realName}
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
            ) : (
              <PortraitPlaceholder />
            )}
            <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/10" />
          </div>
          {/* floating badge */}
          <div className="glass absolute -bottom-4 -left-4 hidden rounded-2xl px-4 py-3 sm:block animate-float">
            <p className="font-display text-lg font-semibold">Release ready</p>
            <p className="text-xs text-muted">technical precision · musical intuition</p>
          </div>
        </Reveal>
      </div>

      {/* Stats strip */}
      <div className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.08}
            className="flex flex-col items-center gap-1 bg-surface/60 px-4 py-8 text-center"
          >
            <span className="font-display text-4xl font-bold text-gradient sm:text-5xl">
              <Counter value={s.value} suffix={s.suffix} />
            </span>
            <span className="text-sm text-muted">{s.label}</span>
          </Reveal>
        ))}
      </div>
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
