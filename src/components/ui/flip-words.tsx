"use client";
import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Aceternity UI's `flip-words` — flips through words in place, blurring each
 * letter in and throwing the outgoing word up and away. Ported from the
 * published registry (`npx shadcn@latest add @aceternity/flip-words`) with
 * three changes:
 *
 *  1. Dropped the upstream `useRef` and `LayoutGroup` imports, which are unused
 *     there and would trip this project's lint.
 *  2. Default colour is `text-foreground`, not `text-neutral-900
 *     dark:text-neutral-100`. This site has no `dark:` variant configured, so
 *     Tailwind resolves `dark:` from `prefers-color-scheme` — the upstream
 *     default renders near-black text on navy whenever the OS is in light mode.
 *  3. Honours `prefers-reduced-motion`: shows every word joined and stops
 *     flipping, matching globals.css and the waveform. Auto-updating text also
 *     needs a stop under WCAG 2.2.2.
 *  4. The character reveal is actually sequential. Upstream animates each word
 *     span *and* each letter inside it, so the two opacities multiply and the
 *     0.3s word fade drowns out the 0.05s letter stagger; worse, its delay
 *     (`wordIndex * 0.3 + letterIndex * 0.05`) restarts per word, so on a
 *     phrase this long the words overlap — "Mastering" runs 0.60-1.00s while
 *     "Engineer" starts at 0.90s. Here the word span is layout only and each
 *     character is delayed by its index in the whole phrase.
 *
 * Only one word is in the DOM at a time, so callers must expose the full text
 * some other way — the hero keeps it in an `sr-only` heading.
 *
 * The exiting word is thrown with `position: absolute`, so keep a `relative`
 * ancestor close by or it will be laid out against a distant one.
 */

export const FlipWords = ({
  words,
  duration = 3000,
  stagger = 0.045,
  className,
}: {
  words: string[];
  duration?: number;
  /** Seconds between each character appearing. */
  stagger?: number;
  className?: string;
}) => {
  const reduced = useReducedMotion();
  const [currentWord, setCurrentWord] = useState(words[0]);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  // thanks for the fix Julian - https://github.com/Julian-AT
  const startAnimation = useCallback(() => {
    const word = words[words.indexOf(currentWord) + 1] || words[0];
    setCurrentWord(word);
    setIsAnimating(true);
  }, [currentWord, words]);

  useEffect(() => {
    if (reduced) return;
    if (!isAnimating)
      setTimeout(() => {
        startAnimation();
      }, duration);
  }, [isAnimating, duration, startAnimation, reduced]);

  if (reduced) {
    return (
      <span className={cn("inline-block px-2 text-foreground", className)}>
        {words.join(" · ")}
      </span>
    );
  }

  // Each character's delay comes from its position in the whole phrase, not its
  // position within its word. Counting the spaces too keeps the rhythm even
  // across word boundaries. Written as a fold rather than a running counter so
  // nothing is reassigned during render.
  const chunks = currentWord.split(" ").reduce<
    { word: string; wordIndex: number; offset: number }[]
  >((acc, word, wordIndex) => {
    const previous = acc[wordIndex - 1];
    const offset = previous
      ? previous.offset + previous.word.length + 1 // + the space between them
      : 0;
    return [...acc, { word, wordIndex, offset }];
  }, []);

  return (
    <AnimatePresence
      onExitComplete={() => {
        setIsAnimating(false);
      }}
    >
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={cn(
          "z-10 inline-block relative text-left text-foreground px-2",
          className,
        )}
        key={currentWord}
      >
        {/* The word span is layout only — no animation. Animating it as well as
            its letters multiplies the two opacities together, and the word-level
            fade then swamps the per-character stagger. */}
        {chunks.map(({ word, wordIndex, offset }) => (
          <span
            key={word + wordIndex}
            className="inline-block whitespace-nowrap"
          >
            {word.split("").map((letter, letterIndex) => (
              <motion.span
                key={word + letterIndex}
                initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{
                  delay: (offset + letterIndex) * stagger,
                  duration: 0.25,
                  ease: "easeOut",
                }}
                className="inline-block"
              >
                {letter}
              </motion.span>
            ))}
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.div>
    </AnimatePresence>
  );
};
