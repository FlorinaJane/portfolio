"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Scroll-triggered reveal. Wrap any block to fade + rise it into view.
 * `delay` staggers siblings; `as` lets you keep semantic tags.
 *
 * `initial` is skipped under `prefers-reduced-motion`, which also stops the
 * hidden state being written into the server markup for those users. The
 * `data-reveal` hook lets the no-JS fallback in `layout.tsx` unhide everything,
 * since motion writes `opacity:0` inline and nothing would ever clear it.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "dl";
}) {
  const MotionTag = motion[as];
  const reduceMotion = useReducedMotion();

  return (
    <MotionTag
      data-reveal=""
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.5, 0.31, 1] }}
    >
      {children}
    </MotionTag>
  );
}
