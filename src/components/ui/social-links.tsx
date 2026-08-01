import { type ComponentType } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { socials, type SocialKey } from "@/data";
import { GumroadIcon, InstagramIcon, YoutubeIcon } from "./brand-icons";

/**
 * Icon per social platform. Every `SocialKey` is mapped, so adding a handle to
 * `socials` in data.ts needs no change here — the copy stays in data, the
 * artwork stays in the component layer.
 */
const icons: Record<SocialKey, ComponentType<{ className?: string }>> = {
  instagram: InstagramIcon,
  youtube: YoutubeIcon,
  gumroad: GumroadIcon,
  email: Mail,
};

const sizes = {
  sm: { button: "size-9", icon: "size-[1.15rem]" },
  md: { button: "size-11", icon: "size-5" },
} as const;

export function SocialLinks({
  size = "md",
  className,
}: {
  size?: keyof typeof sizes;
  className?: string;
}) {
  return (
    <ul className={cn("flex items-center gap-2.5", className)}>
      {socials.map((s) => {
        const Icon = icons[s.key];
        const external = s.href.startsWith("http");
        return (
          <li key={s.key}>
            <a
              href={s.href}
              aria-label={s.label}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                // Same glass-and-visible-edge treatment as the outline button,
                // with a gold-tinted icon so these read as live controls on the
                // hero photo rather than dim grey marks. `size-11` is 44px —
                // the minimum comfortable touch target.
                "group relative grid place-items-center rounded-full border border-white/25 bg-white/8 text-accent backdrop-blur-md",
                "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_24px_-12px_rgba(0,0,0,0.7)]",
                "transition duration-300 ease-out",
                // Hover promotes the icon to a lit gold chip — the same
                // gradient + inset highlight as the primary CTA, so the two
                // read as one system. `ring` adds the outer halo; a plain
                // colour swap on its own looked flat.
                "hover:border-accent hover:text-[#08121d]",
                "hover:bg-[linear-gradient(100deg,#f6df86,var(--color-accent)_55%,var(--color-accent-2))]",
                "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_12px_30px_-8px_rgba(238,203,62,0.65)]",
                "hover:ring-4 hover:ring-accent/20",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 motion-safe:active:scale-95",
                sizes[size].button,
              )}
            >
              <Icon
                className={cn(
                  "transition-transform duration-300 ease-out motion-safe:group-hover:scale-110",
                  sizes[size].icon,
                )}
              />
              {/* Label on hover/keyboard focus — rises as it fades in, which
                  is what sells the interaction. Decorative only: the
                  accessible name comes from aria-label above. */}
              <span
                aria-hidden
                className={cn(
                  "pointer-events-none absolute -top-10 left-1/2 whitespace-nowrap rounded-lg border border-white/15 bg-surface px-2.5 py-1 text-xs font-medium text-foreground",
                  "shadow-[0_10px_28px_-10px_rgba(0,0,0,0.9)]",
                  "-translate-x-1/2 opacity-0 transition duration-200 ease-out",
                  "motion-safe:translate-y-1.5 motion-safe:scale-95",
                  "group-hover:opacity-100 group-focus-visible:opacity-100",
                  "motion-safe:group-hover:translate-y-0 motion-safe:group-hover:scale-100",
                  "motion-safe:group-focus-visible:translate-y-0 motion-safe:group-focus-visible:scale-100",
                )}
              >
                {s.label}
              </span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
