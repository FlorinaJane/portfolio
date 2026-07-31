"use client";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Canvas-based audio waveform visualisation, following the ElevenLabs UI
 * `waveform` component API (same export names, prop names and defaults) so the
 * official registry version is a drop-in replacement:
 *   npx @elevenlabs/cli@latest components add waveform
 *
 * Themed for this site: bars use the brand gold ramp (--color-accent-2 at the
 * extremes, --color-accent through the middle) rather than --foreground.
 *
 * Implements the data-driven components (`Waveform`, `ScrollingWaveform`,
 * `StaticWaveform`). The microphone/recording variants of the upstream API are
 * intentionally omitted — nothing here captures audio input.
 */

const DEFAULT_HEIGHT = 128;

export interface WaveformProps {
  /** Values between 0 and 1, one per bar */
  data?: number[];
  /** Width of each bar in px. Default: 4 */
  barWidth?: number;
  /** Minimum bar height in px. Default: 4 */
  barHeight?: number;
  /** Gap between bars in px. Default: 2 */
  barGap?: number;
  /** Corner radius of bars. Default: 2 */
  barRadius?: number;
  /** Override the bar fill. Defaults to the brand gold ramp. */
  barColor?: string;
  /** Fade the left/right edges. Default: true */
  fadeEdges?: boolean;
  /** Width of the edge fade in px. Default: 24 */
  fadeWidth?: number;
  /** Height of the waveform. Default: 128 */
  height?: string | number;
  className?: string;
  onBarClick?: (index: number, value: number) => void;
}

/** Resolve a theme token to a concrete colour, with a literal fallback. */
function themeColor(el: HTMLElement, token: string, fallback: string) {
  const value = getComputedStyle(el).getPropertyValue(token).trim();
  return value || fallback;
}

/** Vertical gold ramp: dark gold at the extremes, bright gold through centre. */
function barFill(
  ctx: CanvasRenderingContext2D,
  el: HTMLElement,
  height: number,
  override?: string,
) {
  if (override) return override;
  const accent = themeColor(el, "--color-accent", "#eecb3e");
  const accent2 = themeColor(el, "--color-accent-2", "#d9a52b");
  const gradient = ctx.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, accent2);
  gradient.addColorStop(0.5, accent);
  gradient.addColorStop(1, accent2);
  return gradient;
}

/** Draw vertically-centred, mirrored bars. */
function drawBars(
  ctx: CanvasRenderingContext2D,
  values: number[],
  opts: {
    width: number;
    height: number;
    barWidth: number;
    barGap: number;
    barRadius: number;
    minHeight: number;
    fill: string | CanvasGradient;
    offset?: number;
  },
) {
  const { width, height, barWidth, barGap, barRadius, minHeight, fill } = opts;
  const offset = opts.offset ?? 0;
  const step = barWidth + barGap;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = fill;

  values.forEach((raw, i) => {
    const value = Math.min(1, Math.max(0, raw));
    const barH = Math.max(minHeight, value * height);
    const x = i * step - offset;
    if (x + barWidth < 0 || x > width) return; // cull offscreen bars
    const y = (height - barH) / 2;

    ctx.beginPath();
    if (typeof ctx.roundRect === "function") {
      ctx.roundRect(x, y, barWidth, barH, barRadius);
    } else {
      ctx.rect(x, y, barWidth, barH);
    }
    ctx.fill();
  });
}

/** Size the backing store to the device pixel ratio for crisp bars. */
function useCanvasSetup(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  onResize: (width: number, height: number) => void,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const sync = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.round(rect.width * dpr));
      canvas.height = Math.max(1, Math.round(rect.height * dpr));
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      onResize(rect.width, rect.height);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [canvasRef, onResize]);
}

/** CSS mask for the edge fade — cheaper and smoother than compositing. */
function fadeStyle(fadeEdges: boolean, fadeWidth: number) {
  if (!fadeEdges) return undefined;
  const mask = `linear-gradient(to right, transparent 0, #000 ${fadeWidth}px, #000 calc(100% - ${fadeWidth}px), transparent 100%)`;
  return { maskImage: mask, WebkitMaskImage: mask } as React.CSSProperties;
}

/* ------------------------------- Waveform -------------------------------- */

export function Waveform({
  data = [],
  barWidth = 4,
  barHeight = 4,
  barGap = 2,
  barRadius = 2,
  barColor,
  fadeEdges = true,
  fadeWidth = 24,
  height = DEFAULT_HEIGHT,
  className,
  onBarClick,
}: WaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const render = useCallback(
    (width: number, cssHeight: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;
      drawBars(ctx, data, {
        width,
        height: cssHeight,
        barWidth,
        barGap,
        barRadius,
        minHeight: barHeight,
        fill: barFill(ctx, canvas, cssHeight, barColor),
      });
    },
    [data, barWidth, barGap, barRadius, barHeight, barColor],
  );

  useCanvasSetup(canvasRef, render);

  // Redraw when the data itself changes (resize handles geometry changes)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    render(rect.width, rect.height);
  }, [render]);

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onBarClick) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = event.clientX - canvas.getBoundingClientRect().left;
    const index = Math.floor(x / (barWidth + barGap));
    if (index >= 0 && index < data.length) onBarClick(index, data[index]);
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={handleClick}
      aria-hidden
      className={cn("block w-full", onBarClick && "cursor-pointer", className)}
      style={{ height, ...fadeStyle(fadeEdges, fadeWidth) }}
    />
  );
}

/* --------------------------- ScrollingWaveform ---------------------------- */

export interface ScrollingWaveformProps
  extends Omit<WaveformProps, "data" | "onBarClick"> {
  /** Scroll speed in px per second. Default: 50 */
  speed?: number;
  /** Number of bars to display. Default: 60 */
  barCount?: number;
}

/**
 * Smooth pseudo-audio values: a drifting sine for musical shape plus occasional
 * squared-random spikes for transients. Reads far more like audio than
 * uniform noise does.
 */
function createGenerator() {
  let phase = Math.random() * Math.PI * 2;
  return () => {
    phase += 0.34 + Math.random() * 0.22;
    const swell = (Math.sin(phase) + 1) / 2;
    const transient = Math.random() ** 2;
    return Math.min(1, 0.16 + swell * 0.56 + transient * 0.32);
  };
}

export function ScrollingWaveform({
  speed = 50,
  barCount = 60,
  barWidth = 4,
  barHeight = 4,
  barGap = 2,
  barRadius = 2,
  barColor,
  fadeEdges = true,
  fadeWidth = 24,
  height = DEFAULT_HEIGHT,
  className,
}: ScrollingWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ width: 0, height: 0 });
  const valuesRef = useRef<number[]>([]);
  const offsetRef = useRef(0);
  const nextValue = useMemo(() => createGenerator(), []);

  const onResize = useCallback((width: number, cssHeight: number) => {
    sizeRef.current = { width, height: cssHeight };
  }, []);
  useCanvasSetup(canvasRef, onResize);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const step = barWidth + barGap;

    // Enough bars to cover the canvas plus the one scrolling in off-screen.
    // Topped up before every paint rather than sized once here: the canvas
    // width lives in a ref, so a resize never re-runs this effect. Sizing the
    // array from a stale width leaves the bar field short of the right edge —
    // which, in a centred canvas, reads as the waveform being off-centre.
    const topUp = () => {
      const needed = Math.max(
        barCount,
        Math.ceil(sizeRef.current.width / step) + 2,
      );
      while (valuesRef.current.length < needed) {
        valuesRef.current.push(nextValue());
      }
    };

    const paint = () => {
      topUp();
      drawBars(ctx, valuesRef.current, {
        width: sizeRef.current.width,
        height: sizeRef.current.height,
        barWidth,
        barGap,
        barRadius,
        minHeight: barHeight,
        fill: barFill(ctx, canvas, sizeRef.current.height, barColor),
        offset: offsetRef.current,
      });
    };

    // Honour the same reduced-motion contract as the rest of the site
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) {
      paint();
      return;
    }

    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(now - last, 100); // clamp after tab-away
      last = now;
      offsetRef.current += (speed * delta) / 1000;
      while (offsetRef.current >= step) {
        offsetRef.current -= step;
        valuesRef.current.push(nextValue());
        valuesRef.current.shift();
      }
      paint();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [
    speed,
    barCount,
    barWidth,
    barGap,
    barRadius,
    barHeight,
    barColor,
    nextValue,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={cn("block w-full", className)}
      style={{ height, ...fadeStyle(fadeEdges, fadeWidth) }}
    />
  );
}

/* ---------------------------- StaticWaveform ----------------------------- */

/**
 * Mulberry32 mix as a pure function of (seed, index) — no running state to
 * mutate, so it stays deterministic across SSR and re-renders.
 */
function hash(seed: number, index: number) {
  let t = (seed + 0x6d2b79f5 * (index + 1)) >>> 0;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export interface StaticWaveformProps extends Omit<WaveformProps, "data"> {
  /** Number of bars to generate. Default: 40 */
  bars?: number;
  /** Seed for deterministic output (stable across SSR and re-renders) */
  seed?: number;
}

export function StaticWaveform({
  bars = 40,
  seed = 1,
  ...props
}: StaticWaveformProps) {
  const data = useMemo(
    () => Array.from({ length: bars }, (_, i) => 0.18 + hash(seed, i) * 0.72),
    [bars, seed],
  );

  return <Waveform data={data} {...props} />;
}
