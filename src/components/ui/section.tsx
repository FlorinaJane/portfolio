import { cn } from "@/lib/utils";
import { type ReactNode } from "react";
import { Reveal } from "./reveal";

/** Consistent section shell: id anchor, vertical rhythm, max width. */
export function Section({
  id,
  children,
  className,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28",
        className,
      )}
    >
      {children}
    </section>
  );
}

/** Title + optional subtitle, animated into view. */
export function SectionHeading({
  title,
  subtitle,
  align = "left",
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal
      className={cn(
        "flex max-w-2xl flex-col gap-4",
        align === "center" && "mx-auto items-center text-center",
      )}
    >
      <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base leading-relaxed text-muted sm:text-lg">
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
