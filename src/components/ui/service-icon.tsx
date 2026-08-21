import {
  GraduationCap,
  Handshake,
  Headphones,
  MicVocal,
  Podcast,
  SlidersVertical,
  type LucideProps,
} from "lucide-react";
import type { ServiceIcon as ServiceIconKey } from "@/data";

/**
 * Line glyphs for the service cards, replacing the emoji that used to sit in a
 * boxed tile. These inherit `currentColor`, so they can be tinted with the
 * accent and sit inline with the heading instead of occupying their own row.
 */
const icons: Record<ServiceIconKey, React.ComponentType<LucideProps>> = {
  mixing: SlidersVertical,
  mastering: Headphones,
  vocals: MicVocal,
  mentorship: GraduationCap,
  collab: Handshake,
  podcast: Podcast,
};

export function ServiceIcon({
  name,
  className,
}: {
  name: ServiceIconKey;
  className?: string;
}) {
  const Glyph = icons[name];
  return <Glyph aria-hidden className={className} strokeWidth={1.75} />;
}
