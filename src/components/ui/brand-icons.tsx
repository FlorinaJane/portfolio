import { type SVGProps } from "react";

/**
 * Brand glyphs for the social links.
 *
 * `lucide-react` v1 dropped its brand icons, so these are hand-drawn on the
 * same 24×24 grid with the same 2px round stroke — they sit next to the real
 * lucide icons used elsewhere without looking out of place.
 *
 * Size them with a `size-*` class; the width/height attributes are only a
 * fallback for when no class is applied.
 */
const stroke = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...stroke} aria-hidden focusable="false" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37Z" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...stroke} aria-hidden focusable="false" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

/** Gumroad's mark: a ring around a lowercase-g style counter. */
export function GumroadIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...stroke} aria-hidden focusable="false" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M14.6 9.4A3.6 3.6 0 1 0 15.6 12h-2.8" />
    </svg>
  );
}
