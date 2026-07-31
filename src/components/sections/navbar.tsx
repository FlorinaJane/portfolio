"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { contact, navLinks } from "@/data";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5 sm:pt-7">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        // 3-column grid with equal side columns -> nav links land at the true
        // page center and the CTA pins to the right end. The left column is
        // now an empty spacer; it still has to be 1fr to balance the right.
        className="grid w-full max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-2"
      >
        {/* Nav links — centered with respect to the page. `col-start-2` is
            load-bearing now the left column is empty: without it these
            auto-place into column 1 and the pill drifts off centre. */}
        <nav
          className={cn(
            "col-start-2 hidden items-center gap-1 justify-self-center rounded-full px-3 py-2.5 transition-all duration-300 md:flex",
            scrolled
              ? "glass shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
              : "border border-transparent",
          )}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right column — CTA on desktop, menu toggle on mobile. Previously the
            CTA sat inside the centre pill, leaving this column empty on
            desktop and the whole bar visually lopsided. */}
        <div className="col-start-3 flex items-center gap-2 justify-self-end">
          <a
            href={contact.cta.href}
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:-translate-y-0.5 md:block"
          >
            {contact.cta.label}
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid size-10 place-items-center rounded-full border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass absolute inset-x-4 top-20 rounded-2xl p-2 sm:top-24 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-sm text-muted transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
            <a
              href={contact.cta.href}
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-xl bg-foreground px-4 py-3 text-center text-sm font-medium text-background"
            >
              {contact.cta.label}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
