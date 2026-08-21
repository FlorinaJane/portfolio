/**
 * Site-wide ambient background: pools of light sitting in the page itself,
 * behind the content at `-z-10`.
 *
 * Positioned `absolute` against `body` (which carries `relative`), not `fixed`,
 * so the pools belong to the document and scroll away with the sections above
 * them. Fixed to the viewport they read as a smear stuck to the glass.
 *
 * Everything here is near the threshold of visibility: pools are 13-28% colour
 * under a `blur-3xl` and the grain is 3%. Individually neither is noticeable;
 * together they stop long stretches of navy reading as a dead fill.
 *
 * The hero covers the top of this with its own photograph, so in practice it is
 * what you see from the About section down.
 */

/** Where each pool sits down the page, and what colour it is. */
const pools = [
  {
    top: "13%",
    side: "left",
    offset: "-14%",
    size: "44rem",
    tone: "accent-3",
    mix: 28,
  },
  {
    top: "20%",
    side: "right",
    offset: "-12%",
    size: "38rem",
    tone: "accent",
    mix: 14,
  },
  {
    top: "35%",
    side: "left",
    offset: "-10%",
    size: "40rem",
    tone: "accent-3",
    mix: 24,
  },
  {
    top: "52%",
    side: "right",
    offset: "-14%",
    size: "42rem",
    tone: "accent-3",
    mix: 26,
  },
  {
    top: "68%",
    side: "left",
    offset: "-8%",
    size: "36rem",
    tone: "accent",
    mix: 13,
  },
  {
    top: "84%",
    side: "right",
    offset: "-10%",
    size: "40rem",
    tone: "accent-3",
    mix: 24,
  },
] as const;

export function PageAmbience() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_0,transparent_105vh,black_190vh)]"
    >
      {/* Steel blue carries the depth; gold appears twice and weakly, so the
          warmth reads as a reflection rather than another accent. */}
      {pools.map((pool, i) => (
        <div
          key={i}
          style={{
            top: pool.top,
            [pool.side]: pool.offset,
            width: pool.size,
            height: pool.size,
            background: `radial-gradient(circle at center, color-mix(in oklab, var(--color-${pool.tone}) ${pool.mix}%, transparent), transparent 65%)`,
          }}
          className="absolute rounded-full blur-3xl"
        />
      ))}

      {/* Grain over the top, so the gradients above never band. */}
      <div className="bg-noise absolute inset-0 opacity-[0.03]" />
    </div>
  );
}
