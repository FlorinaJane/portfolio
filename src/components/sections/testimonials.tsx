import { ArrowUpRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";
import { CardStack } from "@/components/ui/card-stack";
import { testimonials } from "@/data";

export function Testimonials() {
  return (
    <Section id="testimonials" className="pt-11 pb-4 sm:pt-16 sm:pb-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div className="flex flex-col gap-6">
          <SectionHeading
            title={
              <>
                What artists <span className="text-gradient">say</span>
              </>
            }
            subtitle={testimonials.description}
          />
          <Reveal delay={0.1}>
            <ButtonLink href={testimonials.cta.href} variant="outline">
              {testimonials.cta.label}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </ButtonLink>
          </Reveal>
        </div>

        {/* The stack peeks above its own top edge, so it needs a little room. */}
        <Reveal delay={0.1} className="pt-6">
          <CardStack items={testimonials.items} />
        </Reveal>
      </div>
    </Section>
  );
}
