import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { SocialLinks } from "@/components/ui/social-links";
import {
  affiliateDisclaimer,
  contact,
  resources,
  socials,
  profile,
} from "@/data";

export function Contact() {
  return (
    <Section id="contact" className="py-11 sm:py-16">
      {/* Resource banners, built like the Courses card so the two read as a
          pair. */}
      <div className="mb-14 flex flex-col gap-4">
        {resources.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <div className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-14">
              {/* glow bg */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 -z-10"
              >
                <div className="bg-grid absolute inset-0 opacity-30" />
                <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_60%)] opacity-25 blur-3xl" />
                <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-accent-3),transparent_60%)] opacity-20 blur-3xl" />
              </div>

              <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex max-w-xl flex-col gap-4">
                  <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                    {r.title}
                  </h2>
                  <p className="text-base leading-relaxed text-muted sm:text-lg">
                    {r.description}
                  </p>
                </div>
                <ButtonLink
                  href={r.cta.href}
                  variant="primary"
                  className="shrink-0"
                >
                  {r.cta.label}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </ButtonLink>
              </div>
            </div>
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
      <footer className="mt-14 border-t border-border pt-8 text-sm text-subtle">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.realName}
          </p>
          <SocialLinks size="sm" />
        </div>
        <p className="mt-6 text-center text-xs leading-relaxed sm:text-left">
          {affiliateDisclaimer}
        </p>
      </footer>
    </Section>
  );
}
