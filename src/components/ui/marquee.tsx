import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

/**
 * Infinite horizontal marquee (Magic UI style).
 * Renders the children twice so the loop is seamless.
 * Pauses on hover; `reverse` flips direction.
 */
export function Marquee({
  children,
  className,
  reverse,
  pauseOnHover = true,
  duration = "40s",
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  duration?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--marquee-gap:2.5rem]",
        className,
      )}
      style={{ ["--marquee-duration" as string]: duration }}
    >
      {Array.from({ length: 2 }).map((_, i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center gap-[--marquee-gap] pr-[--marquee-gap] animate-marquee",
            reverse && "[animation-direction:reverse]",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
