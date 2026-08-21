/**
 * Full-bleed hairline between two sections, fading out at both ends so it
 * reads as a seam rather than a line ruled across the page.
 *
 * Kept in flow rather than absolutely positioned inside a section, because
 * `Section` is width-constrained (`max-w-6xl`) — anchoring it there would make
 * it stop short of the viewport edges and not match the brands band's rule.
 */
export function SectionDivider() {
  return (
    <div
      aria-hidden
      className="h-px w-full bg-linear-to-r from-transparent via-white/12 to-transparent"
    />
  );
}
