"use client";

import { cn } from "@/lib/utils";
import { useRef, useState, type ReactNode } from "react";

/**
 * Card with a cursor-following radial spotlight and gradient border glow
 * (Aceternity-style). The glow tracks the mouse via CSS custom properties.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      style={
        {
          "--x": `${pos.x}px`,
          "--y": `${pos.y}px`,
        } as React.CSSProperties
      }
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-border bg-surface/60 transition-colors duration-300",
        "hover:border-white/20",
        className,
      )}
    >
      {/* spotlight glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          opacity: active ? 1 : 0,
          background:
            "radial-gradient(340px circle at var(--x) var(--y), color-mix(in oklab, var(--color-accent) 22%, transparent), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}
