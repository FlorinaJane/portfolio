import { Marquee } from "@/components/ui/marquee";
import { Reveal } from "@/components/ui/reveal";
import { brands } from "@/data";

export function Brands() {
  return (
    <section className="relative py-16">
      <Reveal className="mx-auto mb-8 max-w-6xl px-5 text-center sm:px-8">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-subtle">
          Brands &amp; studios I’ve worked with
        </p>
      </Reveal>

      <div className="relative">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <Marquee pauseOnHover duration="38s">
          {brands.map((brand) => (
            <a
              key={brand.name}
              href={brand.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface/40 px-6 py-4 transition-colors hover:border-white/20 hover:bg-surface"
            >
              <span className="grid size-8 place-items-center rounded-lg bg-[linear-gradient(120deg,#f6df86,var(--color-accent-2))] text-sm font-bold text-[#08121d]">
                {brand.name.charAt(0)}
              </span>
              <span className="whitespace-nowrap font-display text-lg font-medium text-muted transition-colors group-hover:text-foreground">
                {brand.name}
              </span>
            </a>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
