"use client";

import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const variants: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

/**
 * Scroll-triggered reveal. Wrap any block to fade + rise it into view.
 * `delay` staggers siblings; `as` lets you keep semantic tags.
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
  as?: "div" | "section" | "li" | "span";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={variants}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.5, 0.31, 1] }}
    >
      {children}
    </MotionTag>
  );
}
