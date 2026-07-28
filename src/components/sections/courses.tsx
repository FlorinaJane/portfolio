import { ArrowUpRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { courses } from "@/data";

export function Courses() {
  return (
    <Section id="courses">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-14">
          {/* glow bg */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <div className="absolute -left-10 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-accent),transparent_60%)] opacity-25 blur-3xl" />
            <div className="absolute -right-10 bottom-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,var(--color-accent-3),transparent_60%)] opacity-20 blur-3xl" />
            <div className="absolute inset-0 bg-grid opacity-30" />
          </div>

          <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex max-w-xl flex-col gap-4">
              <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
                {courses.heading}
              </h2>
              <p className="text-base leading-relaxed text-muted sm:text-lg">
                {courses.description}
              </p>
            </div>
            <ButtonLink
              href={courses.cta.href}
              variant="primary"
              className="shrink-0"
            >
              {courses.cta.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
