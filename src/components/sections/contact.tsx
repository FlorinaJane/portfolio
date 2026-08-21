import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { contact, resources, socials, profile } from "@/data";

export function Contact() {
  return (
    <Section id="contact" className="py-11 sm:py-16">
      {/* Resource cards */}
      <div className="mb-14 grid gap-4 sm:grid-cols-2">
        {resources.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <a
              href={r.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-white/20"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-border bg-background/60 text-2xl">
                {r.emoji}
              </span>
              <div className="flex flex-col">
                <span className="flex items-center gap-1 text-lg font-semibold">
                  {r.title}
                  <ArrowUpRight className="size-4 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
                </span>
                <span className="text-sm text-muted">{r.description}</span>
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      {/* Big CTA */}
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border px-6 py-20 text-center sm:px-12">
          <AuroraBackground />
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {contact.heading}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {contact.description}
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <ButtonLink href={contact.cta.href} variant="primary">
              {contact.cta.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
            {socials.map((s) => (
              <ButtonLink key={s.key} href={s.href} variant="ghost">
                {s.label}
              </ButtonLink>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Footer */}
      <footer className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-sm text-subtle sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name} · {profile.realName}
        </p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </div>
      </footer>
    </Section>
  );
}
