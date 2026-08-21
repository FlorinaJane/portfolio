import { Section, SectionHeading } from "@/components/ui/section";
import { Reveal } from "@/components/ui/reveal";
import { ServicePriceCard } from "@/components/ui/service-price-card";
import { CardDecor, surfaceCardClass } from "@/components/ui/surface-card";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  formatINR,
  serviceInquiryHref,
  services,
  servicesHeading,
  type Service,
} from "@/data";

/**
 * Pricing cards. The per-song services lead as three full cards; the bespoke
 * ones sit in a quieter row underneath.
 *
 * Splitting them is the point: six equally-weighted cards gave a visitor
 * looking for a mix the same visual work as one looking for a podcast booking,
 * and the price was the smallest text on the card rather than the largest.
 */
export function Services() {
  const song = services.filter((s) => s.group === "song");
  const other = services.filter((s) => s.group === "other");

  return (
    <Section id="services" className="py-11 sm:py-16">
      <SectionHeading
        title={
          <>
            What I <span className="text-gradient">Offer</span>
          </>
        }
        subtitle={servicesHeading.description}
        className="max-w-none"
      />

      <div className="mt-12 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {song.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 0.08}
            className={cn(
              "h-full",
              service.featured && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <ServicePriceCard service={service} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-14 flex items-center gap-4">
        <p className="font-label text-sm font-medium uppercase tracking-[0.18em] text-subtle">
          {servicesHeading.moreLabel}
        </p>
        <span
          aria-hidden
          className="h-px flex-1 bg-linear-to-r from-white/12 to-transparent"
        />
      </Reveal>

      <div className="mt-6 grid items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {other.map((service, i) => (
          <Reveal key={service.title} delay={i * 0.08} className="h-full">
            <a
              href={serviceInquiryHref(service.title)}
              className={cn(surfaceCardClass(), "grid h-full")}
            >
              <CardDecor />
              <div className="relative flex h-full flex-col p-5">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{service.icon}</span>
                  <h3 className="font-display text-lg font-semibold">
                    {service.title}
                  </h3>
                </div>
                <CompactPrice price={service.price} />
                <p className="mt-3 text-[15px] leading-relaxed text-subtle">
                  {service.description}
                </p>
                {service.includes && (
                  <ul className="mt-4 flex flex-col gap-1.5">
                    {service.includes.map((line) => (
                      <li
                        key={line}
                        className="text-sm text-foreground/70 before:mr-2 before:text-accent before:content-['·']"
                      >
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </a>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1} className="mt-12 flex justify-center">
        <ButtonLink href={serviceInquiryHref("Custom package")} variant="ghost">
          Need something else? Ask for a custom package
        </ButtonLink>
      </Reveal>
    </Section>
  );
}

/** Price line for the quieter "also available" cards. */
function CompactPrice({ price }: { price: Service["price"] }) {
  if ("onRequest" in price) {
    return (
      <p className="mt-2 font-display text-xl font-semibold text-foreground">
        {price.onRequest}
      </p>
    );
  }

  // A tiered service in this row would show its entry price; the slider only
  // belongs on the lead cards.
  const { amount, prefix, unit } =
    "tiers" in price
      ? { amount: price.tiers[0].amount, prefix: "From", unit: undefined }
      : price;

  return (
    <span className="mt-2 flex items-baseline gap-1.5">
      <span className="text-gradient font-display text-3xl font-bold leading-none tracking-tight">
        {prefix ? `${prefix} ` : ""}₹{formatINR(amount)}
      </span>
      {unit && <span className="text-sm text-muted">{unit}</span>}
    </span>
  );
}
