"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";
import { contact, navLinks, profile } from "@/data";

const MENU_ID = "mobile-menu";

/** Scroll depth at which the bar contracts into its pill form. */
const SHRINK_AT = 80;

/**
 * Bar width, in px, at rest and once contracted. These are animated as
 * `maxWidth` rather than `width`, which means small screens simply ignore them
 * and the bar stays full-width — no viewport querying needed.
 *
 * 1024 keeps the five links as a legible group instead of stringing them across
 * the page; anything wider and the bar reads as scattered parts.
 */
const WIDTH = { rest: 1024, shrunk: 720 };

/** Section ids the nav points at, in document order. */
const sectionIds = navLinks.map((l) => l.href.replace("#", ""));


/**
 * Id of the section currently in reading position, or `null` at the very top
 * (the hero has no nav link, so nothing should be highlighted there).
 */
function useActiveSection() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    // Track every section's state rather than reacting to each entry: the
    // callback only reports what *changed*, so deciding from the full picture
    // is what lets the highlight clear again when we scroll back to the hero.
    const visible = new Map<string, boolean>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set(e.target.id, e.isIntersecting);
        setActive(sectionIds.find((id) => visible.get(id)) ?? null);
      },
      // A band across the upper-middle of the viewport, so a section becomes
      // "current" once its content reaches reading position — not when its top
      // edge first peeks in.
      { rootMargin: "-25% 0px -60% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar() {
  const [shrink, setShrink] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection();
  const reduceMotion = useReducedMotion();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setShrink(window.scrollY > SHRINK_AT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open-menu housekeeping: Escape closes and hands focus back to the toggle,
  // the page behind stops scrolling, and growing past `md` (where the panel is
  // hidden) closes it so it can't be left open off-screen.
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => desktop.matches && setOpen(false);

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-6">
      {/* Keyboard users can jump the nav entirely; targets <main id="content">. */}
      <a
        href="#content"
        className="sr-only rounded-full bg-accent px-4 py-2 text-sm font-semibold text-[#08121d] focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-10"
      >
        Skip to content
      </a>

      <motion.div
        // The resizable-navbar pattern: wide and surfaceless over the hero,
        // contracting into a blurred pill once you scroll. maxWidth is animated
        // by motion, so the CSS transition below must NOT include it — two
        // engines interpolating one property fights and looks laggy.
        animate={{ maxWidth: shrink ? WIDTH.shrunk : WIDTH.rest }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { type: "spring", stiffness: 200, damping: 40 }
        }
        className={cn(
          "relative grid w-full grid-cols-[1fr_auto_1fr] items-center gap-3 rounded-full border pl-2.5 pr-2",
          // Fixed height rather than padding: every item then sits on one
          // baseline grid, which is most of what separates a tidy bar from a
          // lumpy one.
          "transition-[background-color,border-color,box-shadow,height] duration-300",
          // Heights are set by the logo: the mark carries a lot of internal
          // padding, so the bar has to be tall enough for it to read.
          shrink
            ? "h-16 border-white/10 bg-background/80 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.85)] backdrop-blur-xl"
            : "h-18 border-transparent bg-transparent",
        )}
      >
        {/* Scroll position as a thin gold playhead along the bottom of the
            pill. Only shown in the contracted state, where the bar has a
            surface for it to sit on. */}
        <motion.span
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className={cn(
            "absolute inset-x-5 bottom-0 h-px origin-left rounded-full bg-accent/70 transition-opacity duration-300",
            shrink ? "opacity-100" : "opacity-0",
          )}
        />
        {/* Brand — also the way back to the top of the page. */}
        <a
          href="#top"
          aria-label={`${profile.name} — back to top`}
          className="group col-start-1 flex items-center gap-2.5 justify-self-start rounded-full outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-background"
        >
          <Image
            src={profile.logoWhite}
            alt=""
            width={56}
            height={56}
            priority
            // No ring or rounded crop: this mark is full-bleed artwork, so a
            // circle would slice the headphone cups. It also carries its own
            // internal padding, hence the larger box than a tight badge needs.
            className={cn(
              "w-auto object-contain opacity-90 transition-all duration-300 group-hover:opacity-100",
              shrink ? "h-13" : "h-15 sm:h-16",
            )}
          />
          <span className="hidden font-display text-[0.9375rem] font-semibold leading-none tracking-tight text-foreground sm:block">
            {profile.name}
          </span>
        </a>

        {/* `col-start-2` is load-bearing: without it these auto-place into
            column 1 and the links drift off centre. */}
        <nav
          aria-label="Main"
          // Tight gap: the links should read as one group, not five islands.
          className="col-start-2 hidden items-center gap-0.5 justify-self-center md:flex"
        >
          {navLinks.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "rounded-full px-3 py-1.5 text-[0.8125rem] font-medium tracking-tight transition-colors duration-200",
                  "outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  // The label stays ivory when active; the gold-tinted fill
                  // carries the state. No sliding indicator — each link just
                  // owns its own background.
                  isActive
                    ? "bg-accent/12 text-foreground ring-1 ring-accent/25"
                    : "text-muted hover:bg-white/8 hover:text-foreground",
                )}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* CTA on desktop, menu toggle on mobile. */}
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <ButtonLink
            href={contact.cta.href}
            size="sm"
            // Same gold pill, dialled down: at nav scale the variant's drop
            // glow reads as a blob and competes with the hero's CTA, so the
            // glow only appears on hover here.
            className="hidden text-[0.8125rem] shadow-[inset_0_1px_0_0_rgba(255,255,255,0.4)] hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.5),0_8px_24px_-10px_rgba(238,203,62,0.6)] md:inline-flex"
          >
            {contact.cta.label}
          </ButtonLink>
          <button
            ref={toggleRef}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls={MENU_ID}
            className={cn(
              // Lighter treatment than the hero's glass chips: this sits
              // *inside* the bar, where a second heavy surface reads as busy.
              "grid size-10 place-items-center rounded-full border border-white/15 bg-white/5 text-foreground md:hidden",
              "transition duration-300 hover:border-accent/60 hover:bg-white/10",
              "outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "motion-safe:active:scale-95",
            )}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.span
                key={open ? "close" : "open"}
                initial={reduceMotion ? false : { rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={reduceMotion ? undefined : { rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}
                className="grid place-items-center"
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <>
            {/* Dims the page and gives "tap outside to dismiss" for free. */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              aria-hidden
              className="fixed inset-0 bg-background/70 backdrop-blur-sm md:hidden"
            />
            <motion.nav
              key="panel"
              id={MENU_ID}
              aria-label="Mobile"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="glass absolute inset-x-4 top-20 rounded-2xl p-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] sm:top-24 md:hidden"
            >
              {navLinks.map((link) => {
                const isActive = active === link.href.slice(1);
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "true" : undefined}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-3 text-sm transition-colors",
                      "outline-none focus-visible:ring-2 focus-visible:ring-accent",
                      isActive
                        ? "bg-accent/12 text-foreground ring-1 ring-accent/25"
                        : "text-muted hover:bg-white/5 hover:text-foreground",
                    )}
                  >
                    {link.label}
                  </a>
                );
              })}
              <ButtonLink
                href={contact.cta.href}
                onClick={() => setOpen(false)}
                className="w-full"
              >
                {contact.cta.label}
              </ButtonLink>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
