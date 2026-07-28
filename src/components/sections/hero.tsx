"use client";

import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Headphones } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ButtonLink } from "@/components/ui/button";
import { profile, socials } from "@/data";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: [0.21, 0.5, 0.31, 1] },
  },
};

/** Animated equalizer bars — a subtle nod to the craft. */
function Equalizer() {
  const bars = Array.from({ length: 28 });
  return (
    <div
      aria-hidden
      className="flex h-16 items-end justify-center gap-1 sm:gap-1.5"
    >
      {bars.map((_, i) => (
        <motion.span
          key={i}
          className="w-1 rounded-full bg-[linear-gradient(to_top,var(--color-accent-2),var(--color-accent))] sm:w-1.5"
          initial={{ height: "15%" }}
          animate={{ height: ["18%", "95%", "35%", "70%", "20%"] }}
          transition={{
            duration: 1.4 + (i % 5) * 0.25,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: (i % 7) * 0.09,
          }}
        />
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 text-center"
    >
      <AuroraBackground />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex max-w-3xl flex-col items-center gap-7"
      >
        <motion.h1
          variants={item}
          className="font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl md:text-8xl"
        >
          <span className="text-gradient">Flo</span>{" "}
          <span className="text-foreground">of Music</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="max-w-xl text-balance text-base leading-relaxed text-muted sm:text-lg"
        >
          {profile.tagline}
        </motion.p>

        <motion.div variants={item}>
          <Equalizer />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col items-center gap-3 sm:flex-row"
        >
          <ButtonLink href="#mixes" variant="primary">
            <Headphones className="size-4" />
            Hear my mixes
          </ButtonLink>
          <ButtonLink href="#services" variant="outline">
            View services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </ButtonLink>
        </motion.div>

        <motion.div
          variants={item}
          className="mt-2 flex items-center gap-4 text-sm text-subtle"
        >
          {socials.map((s) => (
            <a
              key={s.key}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
