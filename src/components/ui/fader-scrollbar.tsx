"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A mixing-console channel fader that doubles as the page scrollbar.
 * - The cap's position reflects scroll progress.
 * - Dragging the cap (or clicking the track) scrolls the page; the cap tracks
 *   the cursor directly (optimistic) so dragging is buttery, not laggy.
 * - Arrow / Page / Home / End keys nudge the scroll when focused.
 * Native scrollbar is hidden in globals.css. Shown on md+ screens only.
 */
const CAP = 52; // cap height in px

export function FaderScrollbar() {
  const trackRef = useRef<HTMLDivElement>(null);
  const grabOffset = useRef(CAP / 2);
  const draggingRef = useRef(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const [trackH, setTrackH] = useState(0);

  const getMax = () =>
    document.documentElement.scrollHeight - window.innerHeight;

  // Measure the track height (for a transform-based cap position)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const measure = () => setTrackH(el.clientHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Reflect page scroll (wheel/keys) -> cap position
  useEffect(() => {
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = getMax();
        setScrollable(max > 40);
        // While dragging, the pointer is the single source of truth for the
        // cap position — ignore scroll-driven updates to avoid flicker.
        if (draggingRef.current) return;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Drag: move the cap to the cursor immediately, and scroll the page
  const applyPointer = useCallback((clientY: number) => {
    const track = trackRef.current;
    if (!track) return;
    const rect = track.getBoundingClientRect();
    const usable = rect.height - CAP;
    if (usable <= 0) return;
    const capTop = clientY - grabOffset.current - rect.top;
    const p = Math.min(1, Math.max(0, capTop / usable));
    setProgress(p); // optimistic — cap follows the cursor this frame
    window.scrollTo({ top: p * getMax() });
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track) return;
    e.preventDefault();
    const rect = track.getBoundingClientRect();
    const capTop = rect.top + progress * (rect.height - CAP);
    const onCap = e.clientY >= capTop && e.clientY <= capTop + CAP;
    grabOffset.current = onCap ? e.clientY - capTop : CAP / 2;
    draggingRef.current = true;
    setDragging(true);
    // The page uses smooth scroll globally; force instant while dragging so the
    // page tracks the fader in real time instead of animating/flickering.
    document.documentElement.style.scrollBehavior = "auto";
    applyPointer(e.clientY);
  };

  useEffect(() => {
    if (!dragging) return;
    const move = (e: PointerEvent) => applyPointer(e.clientY);
    const up = () => {
      draggingRef.current = false;
      setDragging(false);
      document.documentElement.style.scrollBehavior = "";
      // Re-sync the cap to the page's actual (clamped) scroll position.
      const max = getMax();
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    const prev = document.body.style.userSelect;
    document.body.style.userSelect = "none";
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
      document.body.style.userSelect = prev;
    };
  }, [dragging, applyPointer]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const vh = window.innerHeight;
    const map: Record<string, number> = {
      ArrowUp: -80,
      ArrowDown: 80,
      PageUp: -vh * 0.9,
      PageDown: vh * 0.9,
    };
    if (e.key in map) {
      e.preventDefault();
      window.scrollBy({ top: map[e.key], behavior: "smooth" });
    } else if (e.key === "Home") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (e.key === "End") {
      e.preventDefault();
      window.scrollTo({ top: getMax(), behavior: "smooth" });
    }
  };

  const capY = progress * Math.max(0, trackH - CAP);
  const ticks = Array.from({ length: 15 });

  return (
    <div
      className={cn(
        "fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 select-none min-[1250px]:block",
        "transition-opacity duration-300",
        scrollable ? "opacity-100" : "pointer-events-none opacity-0",
      )}
    >
      <div
        ref={trackRef}
        role="scrollbar"
        aria-orientation="vertical"
        aria-label="Scroll — mixer fader"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-controls="content"
        tabIndex={0}
        onPointerDown={onPointerDown}
        onKeyDown={onKeyDown}
        className="group relative h-[58vh] max-h-[520px] min-h-[320px] w-10 cursor-pointer touch-none rounded-full outline-none"
      >
        {/* tick marks */}
        <div className="pointer-events-none absolute inset-y-3 left-1/2 flex -translate-x-1/2 flex-col justify-between">
          {ticks.map((_, i) => {
            const unity = i === 3;
            return (
              <span
                key={i}
                className={cn(
                  "block h-px bg-white/20",
                  unity ? "w-5 bg-accent/60" : i % 2 === 0 ? "w-3.5" : "w-2.5",
                )}
              />
            );
          })}
        </div>

        {/* slot / groove — blue above the fader, gold below it */}
        <div className="pointer-events-none absolute inset-y-2 left-1/2 w-[8px] -translate-x-1/2 overflow-hidden rounded-full bg-accent-3/70 shadow-[inset_0_0_6px_rgba(0,0,0,0.5)] ring-1 ring-white/10">
          <div
            className="absolute inset-x-0 bottom-0 bg-accent"
            style={{ top: `${capY + CAP / 2}px` }}
          />
        </div>

        {/* fader cap — positioned with transform for smoothness */}
        <div
          className={cn(
            "absolute left-1/2 top-0 flex flex-col items-center justify-center gap-4 rounded-[7px] will-change-transform",
            "bg-[linear-gradient(180deg,#3a4a5e,#141e29)] shadow-[0_4px_12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.15)]",
            "ring-1 ring-black/60 transition-[box-shadow] duration-150",
            "group-hover:ring-accent/40 group-focus-visible:ring-accent",
            dragging && "ring-accent",
          )}
          style={{
            height: CAP,
            width: 30,
            transform: `translateX(-50%) translateY(${capY}px) scale(${dragging ? 1.04 : 1})`,
          }}
        >
          {/* upper grip ridges */}
          <div className="flex flex-col items-center gap-[3px]">
            <span className="block h-px w-4 bg-white/15" />
            <span className="block h-px w-4 bg-white/15" />
          </div>
          {/* center indicator line (gold) */}
          <span className="absolute inset-x-1 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-[linear-gradient(90deg,#f6df86,#d9a52b)] shadow-[0_0_6px_rgba(238,203,62,0.6)]" />
          {/* lower grip ridges */}
          <div className="flex flex-col items-center gap-[3px]">
            <span className="block h-px w-4 bg-white/15" />
            <span className="block h-px w-4 bg-white/15" />
          </div>
        </div>
      </div>
    </div>
  );
}
