import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

/**
 * Shared skeleton: geometry, focus ring, disabled + press feedback.
 *
 * Two things worth knowing before editing:
 *  - Hover lift/sheen sit behind `motion-safe:`. globals.css only zeroes
 *    transition *durations* for reduced-motion users, so without the guard the
 *    button would still jump — just instantly instead of smoothly.
 *  - Child SVGs are sized here so callers don't repeat `size-4`. The
 *    `:not([class*='size-'])` guard means an explicit size on the icon still
 *    wins, which a plain `[&_svg]` selector would override.
 */
const base = cn(
  "group relative inline-flex shrink-0 select-none items-center justify-center gap-2",
  "whitespace-nowrap rounded-full font-medium transition duration-300 ease-out",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  "disabled:pointer-events-none disabled:opacity-50",
  "aria-disabled:pointer-events-none aria-disabled:opacity-50",
  "motion-safe:active:translate-y-0 motion-safe:active:scale-[0.98]",
  "[&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
);

/* Fixed heights rather than vertical padding: two buttons sitting side by side
   then line up exactly, whatever their content. `lg` clears the 44px minimum
   touch target. */
const sizes: Record<ButtonSize, string> = {
  sm: "h-9 gap-1.5 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-8 text-base",
};

/**
 * One-pass light sweep on hover. It's a pseudo-element, so the DOM stays flat —
 * which means any variant using it also needs `overflow-hidden` (the ring and
 * outer shadows are unaffected; overflow only clips descendants).
 *
 * Callers pass the whole `before:bg-[...]` utility so each variant can tune the
 * band's strength against its own fill. It has to be a literal at the call
 * site: Tailwind extracts class names from raw source text, so an interpolated
 * colour would compile to no CSS at all.
 */
const sheen = (gradient: string) =>
  cn(
    "overflow-hidden",
    "before:pointer-events-none before:absolute before:inset-y-0 before:-left-full before:w-full before:content-['']",
    gradient,
    "before:transition-transform before:duration-700 before:ease-out",
    "motion-safe:hover:before:translate-x-[200%]",
  );

const variants: Record<ButtonVariant, string> = {
  // Gold gradient pill. Gold is light, so the label is dark navy; the inset
  // highlight + drop glow read as a lit surface.
  primary: cn(
    "font-semibold text-[#08121d]",
    "bg-[linear-gradient(100deg,#f6df86,var(--color-accent)_55%,var(--color-accent-2))]",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45),0_10px_30px_-14px_rgba(238,203,62,0.65)]",
    "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.55),0_16px_44px_-12px_rgba(238,203,62,0.9)]",
    "motion-safe:hover:-translate-y-0.5",
    sheen(
      "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.5),transparent)]",
    ),
  ),
  // Sits on the hero photo, so it needs an edge you can actually see: the
  // `--color-border` token (8% white) disappears against imagery. Hence an
  // explicit 25% edge, a blurred glass fill, and a top highlight for lift.
  outline: cn(
    "border border-white/25 bg-white/8 text-foreground backdrop-blur-md",
    "shadow-[inset_0_1px_0_0_rgba(255,255,255,0.12),0_8px_24px_-12px_rgba(0,0,0,0.7)]",
    // Label stays ivory on hover — the edge and glow carry the state change.
    "hover:border-accent/70 hover:bg-white/12",
    "hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.18),0_12px_32px_-14px_rgba(238,203,62,0.45)]",
    "motion-safe:hover:-translate-y-0.5",
    // Same white glint as `primary`, dialled back: on this dark glass the band
    // has far more contrast to play with than it does over the gold fill.
    sheen(
      "before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.35),transparent)]",
    ),
  ),
  ghost: "text-muted hover:bg-white/5 hover:text-foreground",
};

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

/** Links that look like buttons — `http(s)` targets open in a new tab. */
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href,
  ...props
}: StyleProps & ComponentProps<"a">) {
  const external = href?.startsWith("http") ?? false;
  return (
    <a
      href={href}
      className={cn(base, sizes[size], variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    />
  );
}

/** Same styling for real buttons (form submits, toggles). */
export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: StyleProps & ComponentProps<"button">) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
