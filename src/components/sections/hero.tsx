"use client";

import { Fragment } from "react";
import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { ArrowUpRight, Headphones } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollingWaveform } from "@/components/ui/waveform";
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

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-28 text-center sm:px-8 sm:pb-20 sm:pt-32"
    >
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        <Image
          src={profile.heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="scale-100 object-cover brightness-70 saturate-75"
        />
        <div className="absolute inset-0 bg-background/45" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_center,var(--color-background)_0%,transparent_75%)] opacity-20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,var(--color-background)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent to-background" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-3xl flex-col items-center gap-[clamp(1.5rem,4vh,2.5rem)]"
      >
        <motion.div
          variants={item}
          className="relative mb-[clamp(0.25rem,1vh,0.75rem)] flex items-center justify-center"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle_at_center,var(--color-background)_30%,transparent_70%)]"
          />
          <div className="relative size-[min(15rem,28vh)] overflow-hidden rounded-full shadow-[0_24px_70px_-12px_rgba(0,0,0,0.9)] sm:size-[min(18rem,30vh)] md:size-[min(21rem,32vh)]">
            <Image
              src={profile.logo}
              alt={profile.name}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 768px) 288px, 336px"
              priority
              className="scale-[1.208] object-cover contrast-105 saturate-110"
            />
          </div>
        </motion.div>

        <motion.h1
          variants={item}
          className="flex flex-col items-center gap-6 font-display text-2xl font-semibold leading-[1.1] sm:flex-row sm:gap-10 sm:text-3xl md:gap-2 md:text-4xl"
        >
          <span className="sr-only">{profile.name} — </span>
          {profile.roles.map((role, i) => (
            <Fragment key={role}>
              {i > 0 && (
                <span
                  aria-hidden
                  className="h-px w-20 bg-accent/50 sm:h-auto sm:w-px sm:self-stretch"
                />
              )}
              <span className="max-w-[10ch] text-balance text-center">
                {role}
              </span>
            </Fragment>
          ))}
        </motion.h1>
        <motion.div variants={item} className="w-full max-w-lg px-2">
          <ScrollingWaveform
            height={64}
            speed={44}
            barWidth={4}
            barGap={3}
            barRadius={2}
            fadeWidth={48}
          />
        </motion.div>

        <motion.div
          variants={item}
          className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5"
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
          className="mt-1 flex items-center gap-6 text-sm text-subtle"
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
