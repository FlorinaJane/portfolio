"use client";

import { useEffect } from "react";

/**
 * Always open the page at the absolute top.
 *
 * Browsers restore the previous scroll position on reload, and because
 * `html { scroll-behavior: smooth }` is set globally that restoration plays as
 * a visible glide — and hides whatever sits at the top of the hero. Opt out of
 * restoration and snap to 0 with smoothing temporarily disabled.
 */
export function ScrollTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const html = document.documentElement;
    const previous = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto"; // bypass the global smooth scroll
    window.scrollTo(0, 0);
    html.style.scrollBehavior = previous;
  }, []);

  return null;
}
