import Image from "next/image";
import { Reveal } from "@/components/ui/reveal";
import { brands, brandsHeading } from "@/data";

/**
 * Logo wall. Each mark is rendered as a white silhouette (`brightness-0 invert`
 * flattens any source colour to white) at partial opacity, brightening on
 * hover — so seven logos in seven different palettes read as one row instead of
 * seven competing brand colours on the navy.
 */
export function Brands() {
  return (
    <section className="relative pb-20 pt-0 sm:pb-24">
      {/* Only a closing rule at the bottom. A matching one at the top read as a
          divider from the About block above, which is the join we want hidden —
          the wall should feel like the tail of that block, not a new band. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/12 to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* A short centred rule rather than a full-width one: enough to mark the
            join with the About block, without drawing a line across the page.
            The space below it is kept equal to About's bottom padding, so the
            rule sits centred in the gap between the two sections. */}
        <Reveal className="flex justify-center">
          <span
            aria-hidden
            className="h-px w-48 bg-linear-to-r from-transparent via-accent/70 to-transparent sm:w-80"
          />
        </Reveal>

        <Reveal delay={0.05} className="mt-14 text-center sm:mt-16">
          <p className="font-label text-sm font-medium uppercase tracking-[0.18em] text-muted sm:text-base">
            {brandsHeading}
          </p>
        </Reveal>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-9 sm:mt-14 sm:gap-x-16 sm:gap-y-11">
          {brands.map((brand, i) => (
            <Reveal
              key={brand.name}
              delay={i * 0.06}
              className="flex basis-[42%] justify-center sm:basis-[21%]"
            >
              <a
                href={brand.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  width={brand.width}
                  height={brand.height}
                  /* Height is set inline from the optical scale in `data.ts`;
                     the width follows the aspect ratio. */
                  style={{ height: `${1.75 * (brand.scale ?? 1)}rem` }}
                  className="w-auto max-w-[9rem] object-contain opacity-60 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100 sm:max-w-[11rem]"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
