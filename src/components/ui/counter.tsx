"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { animate, useInView, useReducedMotion } from "motion/react";

const noop = () => () => {};

/**
 * Counts up to `value` when scrolled into view.
 * Handles decimals (e.g. 1.8) by matching the target's precision.
 *
 * The number rendered on the server is the *real* one, not zero: these are
 * credibility claims, and they have to survive a crawler, a failed hydration
 * or a reader that never scrolls. Only once hydrated does it wind back to zero
 * to be counted up, which is also the only place it can honour
 * `prefers-reduced-motion` — the global CSS reset cannot reach a JS animation.
 */
export function Counter({
  value,
  suffix = "",
  suffixClassName,
  duration = 1.6,
}: {
  value: number;
  suffix?: string;
  /** Styles the suffix alone, so it can be sized or coloured apart from the
   *  digits without splitting the accessible value in two. */
  suffixClassName?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduceMotion = useReducedMotion();

  // false while server-rendering and on the hydrating render, true after.
  const hydrated = useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );

  const decimals = value % 1 === 0 ? 0 : 1;
  const format = (v: number) => v.toFixed(decimals);

  const [counted, setCounted] = useState<string | null>(null);

  useEffect(() => {
    if (reduceMotion || !inView) return;
    const controls = animate(0, value, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setCounted(format(v)),
    });
    return () => controls.stop();
    // `format` is derived from value and decimals, both listed here.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, duration, decimals, reduceMotion]);

  const animates = hydrated && !reduceMotion;
  const digits = counted ?? (animates ? format(0) : format(value));

  return (
    <span ref={ref} className="tabular-nums">
      {/* Proportional figures would change width on nearly every frame and
          visibly jitter the number for the whole count. */}
      <span aria-hidden="true">
        {digits}
        {suffix && <span className={suffixClassName}>{suffix}</span>}
      </span>
      <span className="sr-only">{`${format(value)}${suffix}`}</span>
    </span>
  );
}
