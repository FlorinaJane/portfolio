"use client";

import Image from "next/image";
import { motion, type Variants } from "motion/react";
import { Play, SlidersVertical } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { ScrollingWaveform } from "@/components/ui/waveform";
import { VinylRecord } from "@/components/ui/vinyl-record";
import { FlipWords } from "@/components/ui/flip-words";
import { SocialLinks } from "@/components/ui/social-links";
import { profile } from "@/data";

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
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-12 pt-28 text-center sm:px-8 sm:pb-16 sm:pt-32"
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
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent via-background/70 to-background" />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex max-w-4xl flex-col items-center gap-[clamp(1.5rem,3vh,2.5rem)]"
      >
        <motion.div
          variants={item}
          className="relative mb-[clamp(0.25rem,1vh,0.75rem)] w-[min(17rem,30vh)] sm:w-[min(20rem,32vh)] md:w-[min(23rem,34vh)]"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-150 rounded-full bg-[radial-gradient(circle_at_center,var(--color-background)_30%,transparent_70%)]"
          />
          <VinylRecord
            label={profile.logo}
            labelAlt={profile.name}
            priority
            sizes="(max-width: 640px) 224px, (max-width: 768px) 272px, 320px"
          />
        </motion.div>

        {/* The rotation shows one role at a time, so the heading carries both
            for assistive tech and crawlers while the animation is decorative. */}
        <motion.div variants={item} className="flex flex-col items-center">
          <h1 className="sr-only">
            {profile.name} — {profile.role}
          </h1>
          {/* `relative` keeps FlipWords' absolutely-positioned exiting word
              anchored here rather than against the hero wrapper.

              The two arbitrary sizes are deliberate. The intro is 31 characters
              against the role's 27, so the intro decides where the line breaks,
              and a break changes this block's height. text-4xl/text-5xl land
              within a few px of wrapping at those widths; 2rem and 2.5rem clear
              it with ~10% to spare. */}
          <div
            aria-hidden
            className="relative font-display text-2xl font-bold leading-[1.1] tracking-tight sm:text-[2rem] md:text-[2.5rem] lg:text-5xl"
          >
            <span className="block">{profile.heroIntro}</span>
            <FlipWords
              words={profile.roles}
              duration={3200}
              className="px-0 text-accent"
            />
          </div>
          {/* One unit with the role above it, so `mt-3` rather than another
              container gap in an already-tight hero. */}
          <p className="mt-3 max-w-2xl text-balance text-base text-muted sm:text-lg">
            {profile.heroLine}
          </p>
        </motion.div>
        <motion.div variants={item} className="w-full max-w-lg px-2">
          <ScrollingWaveform
            height={32}
            speed={44}
            barWidth={4}
            barGap={3}
            barRadius={2}
            fadeWidth={48}
          />
        </motion.div>

        {/* Full-width stacked buttons below `sm` so neither CTA looks like the
            secondary one on a phone; a row of equal-height pills above it. */}
        <motion.div
          variants={item}
          className="flex w-full max-w-xs flex-col items-stretch justify-center gap-3 sm:max-w-none sm:flex-row sm:items-center sm:gap-4"
        >
          <ButtonLink
            href="#mixes"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto"
          >
            {/* Filled triangle rather than an outline: the solid play mark is
                the universal "listen" cue and holds up at 16px. */}
            <Play className="fill-current" />
            Hear my mixes
          </ButtonLink>
          <ButtonLink
            href="#services"
            variant="outline"
            size="lg"
            className="w-full sm:w-auto"
          >
            {/* Console faders — the services are mixing/mastering work, and it
                pairs with the fader scrollbar. Deliberately not an arrow: this
                is a same-page anchor, not an outbound link. */}
            <SlidersVertical className="motion-safe:transition-transform motion-safe:group-hover:scale-110" />
            View services
          </ButtonLink>
        </motion.div>

        <motion.div variants={item}>
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  );
}
