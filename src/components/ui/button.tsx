import { cn } from "@/lib/utils";
import { type ComponentProps } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // gold gradient pill with soft glow on hover; dark navy text for contrast
  primary:
    "text-[#08121d] font-semibold shadow-[0_0_0_1px_rgba(255,255,255,0.06)] bg-[linear-gradient(100deg,#f6df86,var(--color-accent),var(--color-accent-2))] hover:shadow-[0_8px_40px_-8px_var(--color-accent)] hover:-translate-y-0.5",
  outline:
    "border border-border bg-surface/40 text-foreground hover:border-white/25 hover:bg-surface hover:-translate-y-0.5",
  ghost: "text-muted hover:text-foreground",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: { variant?: Variant } & ComponentProps<"a">) {
  const external = props.href?.startsWith("http");
  return (
    <a
      className={cn(base, variants[variant], className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
