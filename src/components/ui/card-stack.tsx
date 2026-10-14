"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/data";

/**
 * Aceternity's card stack. A short deck sits in one slot and deals its front
 * card to the back on a timer, so several testimonials share the space one
 * card used to take. Cards are absolutely positioned and animate `top` and
 * `scale`, so the wrapper owns the height and the cards all match it.
 */
export function CardStack({
  items,
  /** Vertical peek between cards, in px. */
  offset = 14,
  /** How much each card behind the front one shrinks. */
  scaleFactor = 0.05,
  /** Milliseconds a card stays on top. */
  interval = 5000,
  className,
}: {
  items: Testimonial[];
  offset?: number;
  scaleFactor?: number;
  interval?: number;
  className?: string;
}) {
  const [cards, setCards] = useState(items);
  // Auto-advance stops while the pointer is on the stack, so a visitor
  // reading a quote does not have it pulled out from under them.
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setCards((prev) => {
        const next = [...prev];
        next.unshift(next.pop()!);
        return next;
      });
    }, interval);
    return () => clearInterval(id);
  }, [interval, paused]);

  return (
    <div
      className={cn("relative h-80 w-full", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {cards.map((card, index) => (
        <motion.figure
          key={card.id}
          // Cards behind the front one lift up and shrink, leaving a sliver of
          // each visible above the top edge.
          className="card-fill absolute inset-x-0 flex h-80 flex-col justify-between rounded-3xl border border-border p-7 shadow-xl shadow-black/20 sm:p-8"
          style={{ transformOrigin: "top center" }}
          animate={{
            top: index * -offset,
            scale: 1 - index * scaleFactor,
            zIndex: cards.length - index,
          }}
          transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <div>
            <Quote className="size-8 text-accent/40" />
            <blockquote className="mt-4 font-display text-base leading-snug text-foreground/90 sm:text-lg">
              {card.quote}
            </blockquote>
          </div>
          <figcaption>
            <p className="font-medium text-foreground">{card.name}</p>
            <p className="text-sm text-subtle">{card.role}</p>
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
