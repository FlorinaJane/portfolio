import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { contact, services } from "@/data";

export function Services() {
  return (
    <Section id="services">
      <SectionHeading
        title={
          <>
            Everything your track needs to{" "}
            <span className="text-gradient">sound its best</span>
          </>
        }
        subtitle="From a first rough mix to a platform-ready master — pick what you need, or reach out for a custom package."
      />

      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={(i % 3) * 0.08}
            className={cn(service.featured && "sm:col-span-2 lg:col-span-1")}
          >
            <SpotlightCard className="flex h-full flex-col gap-4 p-6">
              {service.featured && (
                <span className="absolute right-4 top-4 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-0.5 text-[11px] font-medium text-accent">
                  Most popular
                </span>
              )}
              <span className="grid size-12 place-items-center rounded-xl border border-border bg-background/60 text-2xl">
                {service.icon}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-display text-xl font-semibold">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">
                  {service.description}
                </p>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="text-sm font-medium text-foreground">
                  {service.price}
                </span>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-10 flex justify-center">
        <ButtonLink href={contact.cta.href} variant="primary">
          Book a service
        </ButtonLink>
      </Reveal>
    </Section>
  );
}
