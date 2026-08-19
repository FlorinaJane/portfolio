/**
 * ============================================================================
 *  FLO OF MUSIC — SITE CONTENT
 * ============================================================================
 *  This is the single source of truth for everything shown on the website.
 *  To update the site, edit the values below — no need to touch the components.
 *
 *  Tips:
 *   - Add / remove items from any array and the UI updates automatically.
 *   - YouTube mixes only need the share URL; the thumbnail is derived from it.
 *   - Prices are plain strings so you can format them however you like.
 * ============================================================================
 */

/* ----------------------------- Profile ---------------------------------- */

export const profile = {
  name: "Flo of Music",
  realName: "Florina Jane",
  role: "Mixing & Mastering Engineer · Music Educator",
  roles: ["Mixing & Mastering Engineer", "Music Educator", "Podcast Host"],
  tagline:
    "Mixing & mastering engineer helping artists bring their songs to life — clarity, emotion, and balance, release ready.",
  heroIntro: "Hey, I’m Florina Jane and I’m a",
  heroLine: "You know the feeling. I know the frequencies.",
  about:
    "I’m Florina Jane, also known as Flo of Music. I’m a mixing and mastering engineer and educator. Every project starts with the song itself, and my approach adapts to what it needs. I focus on clarity, balance, and depth, handling the technical work so that nothing stands between the listener and the performance. I also teach mixing and mastering to artists and engineers who want to develop the skill themselves. Every record leaves my desk ready for release and still sounding like the artist who made it.",
  portrait: "/portrait.webp" as string,
  logo: "/logo.png",
  logoWhite: "/logo-white.webp",
  heroBg: "/hero-bg.jpg",
};

/* ----------------------------- Socials ---------------------------------- */

export type SocialKey = "instagram" | "youtube" | "gumroad" | "email";

/**
 * Array order is the display order of the social icons in the hero.
 * Each `key` picks the icon in `components/ui/social-links.tsx`, and `label`
 * is both the hover tooltip and the link's accessible name.
 */
export const socials: { key: SocialKey; label: string; href: string }[] = [
  {
    key: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/@floofmusic",
  },
  {
    key: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/flo_of_music/",
  },
  {
    key: "gumroad",
    label: "Gumroad",
    href: "https://floofmusic.gumroad.com/",
  },
  {
    // Keep this address in sync with `contact.email` below.
    key: "email",
    label: "Email",
    href: "mailto:flojane.music@gmail.com",
  },
];

/* --------------------------- Experience stats --------------------------- */

export const stats: {
  value: number;
  suffix: string;
  label: string;
}[] = [
  { value: 50, suffix: "K+", label: "Learners taught" },
  { value: 5, suffix: "+", label: "Years of experience" },
  { value: 2, suffix: "M", label: "Total viewership" },
  { value: 1000, suffix: "+", label: "Tracks mixed" },
];

/* ------------------------------ Services -------------------------------- */

export type Service = {
  icon: string; // emoji
  title: string;
  description: string;
  price: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    icon: "🎚️",
    title: "Mixing",
    description:
      "Professional mixes that enhance clarity, depth, balance, and musical impact.",
    price: "From INR 3,500",
    featured: true,
  },
  {
    icon: "🎧",
    title: "Mastering",
    description:
      "Platform-ready masters optimised for loudness, clarity, and consistent playback across all devices.",
    price: "INR 3,000 / song",
  },
  {
    icon: "🎤",
    title: "Vocal Tuning",
    description:
      "Natural pitch correction that preserves the emotion, tone, and authenticity of every performance.",
    price: "INR 2,500 / vocal track",
  },
  {
    icon: "🎓",
    title: "1:1 Mentorship",
    description:
      "Personalised one-on-one coaching in mixing, mastering, recording, and music production, tailored to your goals.",
    price: "INR 8,000 · 4 classes (1 hr each)",
  },
  {
    icon: "🤝",
    title: "Brand Collaborations",
    description:
      "Educational, engaging content showcasing music software and creative tools through sponsored videos and partnerships.",
    price: "INR 15,000 long-form · INR 8,000 short-form",
  },
  {
    icon: "🎙️",
    title: "Podcast Features",
    description:
      "Thought-provoking conversations with artists and industry professionals on music, creativity, and process.",
    price: "Contact for collaborations",
  },
];

/* -------------------------------- Mixes --------------------------------- */

export type Mix = {
  title: string;
  artist?: string;
  youtubeUrl: string;
};

export const mixes: Mix[] = [
  {
    title: "En Tharagai",
    artist: "GS · Music Video",
    youtubeUrl: "https://youtu.be/Z4rzs17x5Fo",
  },
  {
    title: "Madrashe",
    artist: "Podhaadho? · Official Music Video",
    youtubeUrl: "https://youtu.be/SGE3gIx3C-I",
  },
  {
    title: "Darmiyaan",
    youtubeUrl: "https://youtu.be/n9eSR9K1Uus",
  },
  {
    title: "Vinu Aamani · విను ఆమని",
    artist: "Original Telugu Song · Yamini Gowribhatla",
    youtubeUrl: "https://youtu.be/tNZJqobMEHI",
  },
  {
    title: "Manitho — Intercession to The Theotokos",
    artist: "Basil Jacob ft. The Glorious Voice",
    youtubeUrl: "https://youtu.be/pr8sYnkGXF4",
  },
  {
    title: "Devil Lies",
    youtubeUrl: "https://youtu.be/DgWByBtiHlo",
  },
];

/** Extract a YouTube video id from any common URL shape. */
export function youtubeId(url: string): string {
  const patterns = [
    /youtu\.be\/([\w-]{11})/,
    /[?&]v=([\w-]{11})/,
    /youtube\.com\/embed\/([\w-]{11})/,
    /youtube\.com\/shorts\/([\w-]{11})/,
  ];
  for (const re of patterns) {
    const m = url.match(re);
    if (m) return m[1];
  }
  return "";
}

export const youtubeThumb = (url: string) =>
  `https://i.ytimg.com/vi/${youtubeId(url)}/hqdefault.jpg`;

export const youtubeWatch = (url: string) =>
  `https://www.youtube.com/watch?v=${youtubeId(url)}`;

/* ------------------------------ Courses --------------------------------- */

export const courses = {
  heading: "Learn mixing & mastering with me",
  description:
    "Practical, artist-first courses that turn studio theory into release-ready results. Join 46k+ learners.",
  cta: {
    label: "Browse courses on Gumroad",
    href: "https://floofmusic.gumroad.com/",
  },
};

/* --------------------------- Testimonials ------------------------------- */

export const testimonials = {
  heading: "What artists say",
  description:
    "Real words from the artists I’ve worked with — collected over on Instagram.",
  cta: {
    label: "See Instagram highlights",
    href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTk2OTg3MjgyMjc4NTAw?story_media_id=3932880219023719874&igsh=ZXA5aDJ6OGdmcWlr",
  },
};

/* --------------------------- Brands / clients --------------------------- */

export const brandsHeading = "Brands & studios I’ve worked with";

/**
 * `logo` files live in `public/brands/`, pulled from each company's own site
 * and trimmed to the mark. They are rendered as white silhouettes, so only the
 * alpha channel matters — `width`/`height` are the real pixel dimensions and
 * exist to give `next/image` the aspect ratio.
 *
 * `scale` is optical, not geometric: a long wordmark like Takstar reads far
 * heavier than a compact mark like KR Records at the same height, so each logo
 * gets a multiplier that evens out how large it *looks* on the wall.
 */
export type Brand = {
  name: string;
  href: string;
  logo: string;
  width: number;
  height: number;
  scale?: number;
};

export const brands: Brand[] = [
  {
    name: "Audimee",
    href: "https://audimee.com/",
    logo: "/brands/audimee.webp",
    width: 606,
    height: 160,
  },
  {
    name: "Freebeat AI",
    href: "https://freebeat.ai/",
    logo: "/brands/freebeat-ai.webp",
    width: 1083,
    height: 160,
    scale: 0.9,
  },
  {
    name: "TopMediai",
    href: "https://www.topmediai.com/",
    logo: "/brands/topmediai.webp",
    width: 785,
    height: 160,
  },
  {
    name: "AAFT Online",
    href: "https://aaftonline.com/",
    logo: "/brands/aaft-online.webp",
    width: 354,
    height: 160,
    scale: 1.1,
  },
  {
    name: "Pitch Innovations",
    href: "https://pitchinnovations.com/",
    logo: "/brands/pitch-innovations.webp",
    width: 496,
    height: 160,
    scale: 1.05,
  },
  {
    name: "Takstar",
    href: "https://takstar.com/",
    logo: "/brands/takstar.webp",
    width: 1391,
    height: 160,
    scale: 1.2,
  },
];

/* --------------------------- Resources / links -------------------------- */

export type Resource = {
  emoji: string;
  title: string;
  description: string;
  href: string;
};

export const resources: Resource[] = [
  {
    emoji: "🎁",
    title: "Discounts for you",
    description: "Exclusive deals on the gear and tools I use and recommend.",
    href: "https://floofmusic.my.canva.site/website/discounts",
  },
  {
    emoji: "🛒",
    title: "Products I own",
    description: "My personal studio picks on Amazon (affiliate).",
    href: "https://amzn.in/d/066DkqNi",
  },
];

/* ------------------------------ Contact --------------------------------- */

export const contact = {
  heading: "Let’s make your track release-ready",
  description:
    "Tell me about your song and where you want it to go. I’ll help you get there.",
  email: "flojane.music@gmail.com",
  cta: {
    label: "Get in touch",
    // Opens the visitor's email client addressed to Flo.
    href: "mailto:flojane.music@gmail.com?subject=Project%20Inquiry%20%E2%80%94%20Flo%20of%20Music",
  },
};

/* ------------------------------- Nav ------------------------------------ */

export const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#mixes" },
  { label: "Services", href: "#services" },
  { label: "Learn", href: "#courses" },
  { label: "Contact", href: "#contact" },
];
