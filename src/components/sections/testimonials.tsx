import { Quote, ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { testimonials } from "@/data";

export function Testimonials() {
  return (
    <Section id="testimonials">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <SectionHeading
          title={
            <>
              What artists <span className="text-gradient">say</span>
            </>
          }
          subtitle={testimonials.description}
        />

        <Reveal delay={0.1}>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-surface/60 p-8">
            <Quote className="size-10 text-accent/40" />
            <p className="mt-4 font-display text-xl leading-relaxed text-foreground/90">
              Every collaboration is built on trust, clarity, and care for the
              song. The kindest words come straight from the artists — take a
              look for yourself.
            </p>
            <div className="mt-8">
              <ButtonLink href={testimonials.cta.href} variant="outline">
                {testimonials.cta.label}
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
