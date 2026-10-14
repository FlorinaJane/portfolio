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
    "I’m Florina Jane, also known as Flo of Music. I’m a mixing and mastering engineer and educator. I focus on clarity, balance, and depth, handling the technical work so that nothing stands between the listener and the performance. I also teach mixing and mastering to artists and engineers who want to develop the skill themselves. A record is finished when three people are happy: me, the artist, and the listener.",
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

/**
 * `heading` is the plain-text mirror of the JSX title in `services.tsx`, which
 * splits the line so the last word takes the gold gradient — same arrangement
 * as `mixesHeading`, `courses` and `testimonials`.
 */
export const servicesHeading = {
  heading: "What I Offer",
  moreLabel: "Also available",
  description:
    "From a full mix to a single fix, here’s how I can help your song.",
};

/** A price the card can typeset, rather than a pre-formatted sentence. */
/** One stop on a tiered service's slider. */
export type ServiceTier = {
  /** Full, unambiguous phrasing shown above the price. */
  label: string;
  /** Short form for the stop marker under the slider. */
  tick: string;
  amount: number;
};

export type ServicePrice =
  | { amount: number; prefix?: string; unit?: string }
  | { tiers: ServiceTier[] }
  | { onRequest: string };

/**
 * Picks the glyph in `components/ui/service-icon.tsx`. A key rather than an
 * emoji: emoji render as a different typeface on every OS and cannot inherit
 * the accent colour. Same arrangement as `SocialKey`.
 */
export type ServiceIcon =
  "mixing" | "mastering" | "vocals" | "mentorship" | "collab" | "podcast";

export type Service = {
  icon: ServiceIcon;
  title: string;
  description: string;
  price: ServicePrice;
  /** Bullet lines under the price. Detail that used to be crammed into the
   *  price string lives here, where it is scannable. */
  includes?: string[];
  /** "song" services are per-track and priced simply, so they lead. "other"
   *  services have bespoke scope and sit in a quieter row underneath. */
  group: "song" | "other";
  featured?: boolean;
};

export const services: Service[] = [
  {
    icon: "mixing",
    title: "Mixing & Mastering Bundle",
    description:
      "Mixing and mastering handled together, so the mix is built with the master in mind. Slide to match your track count.",
    // Tiers, not one figure: the card renders a slider and the price follows it.
    // The first tier is what server-rendered HTML shows before hydration.
    price: {
      tiers: [
        { label: "Under 3 tracks", tick: "3", amount: 3500 },
        { label: "Up to 10 tracks", tick: "10", amount: 7000 },
        { label: "Up to 30 tracks", tick: "30", amount: 8000 },
        { label: "Up to 50 tracks", tick: "50", amount: 11000 },
        { label: "Up to 100 tracks", tick: "100", amount: 15000 },
        { label: "More than 100 tracks", tick: "100+", amount: 17000 },
      ],
    },
    includes: ["Mixing and mastering together", "Revisions included"],
    group: "song",
    featured: true,
  },
  {
    icon: "mastering",
    title: "Mastering",
    description:
      "Platform-ready masters optimised for loudness, clarity, and consistent playback across all devices.",
    price: { amount: 3000, unit: "per song" },
    includes: [
      "Optimised for streaming loudness",
      "Consistent on every device",
    ],
    group: "song",
  },
  {
    icon: "vocals",
    title: "Vocal Tuning",
    description:
      "Natural pitch correction that preserves the emotion, tone, and authenticity of every performance.",
    price: { amount: 1500, unit: "per vocal track" },
    includes: ["Natural, transparent correction", "Keeps the original emotion"],
    group: "song",
  },
  {
    icon: "mentorship",
    title: "Private Lessons",
    description:
      "Personalised online one-on-one coaching in mixing, mastering, recording, and music production, tailored to your goals.",
    price: { amount: 8000, unit: "for 4 classes" },
    group: "other",
  },
  {
    icon: "collab",
    title: "Brand Collaborations",
    description:
      "Educational, engaging content showcasing music software and creative tools through sponsored videos and partnerships.",
    price: { amount: 8000, prefix: "From" },
    group: "other",
  },
  {
    icon: "podcast",
    title: "Podcast Features",
    description:
      "Thought-provoking conversations with artists and industry professionals on music, creativity, and process.",
    price: { onRequest: "On Request" },
    group: "other",
  },
];

/** Indian digit grouping, so 15000 reads as 15,000 not 15.000. */
export const formatINR = (amount: number) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(amount);

/* -------------------------------- Mixes --------------------------------- */

/**
 * `heading` is the plain-text mirror of the JSX title in `mixes.tsx`, which
 * splits the line so the last words take the gold gradient — same arrangement
 * as `courses` and `testimonials`.
 */
export const mixesHeading = {
  heading: "Mixes I’m Proud Of",
  description: "Songs I’ve mixed and mastered. Headphones recommended.",
};

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
    title: "Manitho - Intercession to The Theotokos",
    artist: "Basil Jacob ft. The Glorious Voice",
    youtubeUrl: "https://youtu.be/pr8sYnkGXF4",
  },
  {
    title: "Devil Lies",
    youtubeUrl: "https://youtu.be/DgWByBtiHlo",
  },
  {
    title: "Alai",
    artist: "Shanleo Studio",
    youtubeUrl: "https://youtu.be/CaMrt6I3xAM",
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

/**
 * 1280×720, but YouTube only generates it for some uploads — one of the mixes
 * below 404s on it. Callers must fall back to `youtubeThumbSd`.
 */
export const youtubeThumbMax = (url: string) =>
  `https://i.ytimg.com/vi/${youtubeId(url)}/maxresdefault.jpg`;

/**
 * 640×480 and always present. It is the 16:9 frame letterboxed into 4:3, so
 * under `object-cover` in a 16:9 box the bars crop away exactly.
 */
export const youtubeThumbSd = (url: string) =>
  `https://i.ytimg.com/vi/${youtubeId(url)}/sddefault.jpg`;

/** 320×180 — true 16:9, always present. For the small tracklist rows. */
export const youtubeThumbSmall = (url: string) =>
  `https://i.ytimg.com/vi/${youtubeId(url)}/mqdefault.jpg`;

/**
 * Privacy-preserving embed host, so nothing is set until a visitor actually
 * presses play — the player is not mounted before that either.
 */
export const youtubeEmbed = (url: string) =>
  `https://www.youtube-nocookie.com/embed/${youtubeId(url)}` +
  `?autoplay=1&rel=0&modestbranding=1&playsinline=1`;

/* ------------------------------ Courses --------------------------------- */

export const courses = {
  heading: "Learn mixing & mastering with me",
  description:
    "Practical courses that turn studio theory into release-ready results. Join 50k+ learners.",
  cta: {
    label: "Browse courses on Gumroad",
    href: "https://floofmusic.gumroad.com/",
  },
};

/* --------------------------- Testimonials ------------------------------- */

/** One card in the stack. `id` keys the reorder animation, so it must be
 *  stable and unique rather than the array index. */
export type Testimonial = {
  id: string;
  quote: string;
  /** Artist or client, credited the way they want to be. */
  name: string;
  /** Release, project, or role the quote came out of. */
  role: string;
};

export const testimonials = {
  heading: "What artists say",
  description:
    "Real words from the artists I’ve worked with — collected over on Instagram.",
  cta: {
    label: "See Instagram highlights",
    href: "https://www.instagram.com/s/aGlnaGxpZ2h0OjE3OTk2OTg3MjgyMjc4NTAw?story_media_id=3185626903160178866&stkn=ZXA5aDJ6OGdmcWlr",
  },
  /**
   * Trimmed from the messages and comments collected in the Instagram
   * highlight and on YouTube. Only the testimonial itself is kept, with
   * spelling and stretched-out letters tidied; the wording is otherwise
   * theirs. Anyone who did not give a name is credited by what they came for.
   */
  items: [
    {
      id: "first-master",
      quote:
        "It’s my very first time getting a song mixed and mastered, and I " +
        "couldn’t be happier with the results. You brought out the best in my " +
        "vocals and lifted the whole sound. Your attention to detail made the " +
        "process smooth.",
      name: "Independent artist",
      role: "First single, mix and master",
    },
    {
      id: "youtube-saikiran",
      quote:
        "Every topic is explained in a way that is clear, practical, and easy " +
        "to understand. From plugin usage to mixing and mastering, it is all " +
        "presented with real knowledge. Valuable for beginners and experienced " +
        "producers alike.",
      name: "Chilumoju Saikiran",
      role: "Music director, JSK Musical Studio",
    },
    {
      id: "revisions",
      quote:
        "You help an artist get the sound they want. You never hesitate to " +
        "revise until the artist is a hundred percent satisfied. I like that. " +
        "You are an original gem.",
      name: "Independent artist",
      role: "Mix project",
    },
    {
      id: "bass",
      quote:
        "The final version sounds great and the bass is exactly the way I " +
        "wanted. You have been great with communication and timelines. Very " +
        "professional.",
      name: "Independent artist",
      role: "Mix and master",
    },
    {
      id: "workshop",
      quote:
        "I somehow made it to your session and it was very informative. Your " +
        "knowledge of the topics and the way you articulated everything so " +
        "simply is commendable. Keep up the great work.",
      name: "Workshop attendee",
      role: "Mixing workshop",
    },
  ] satisfies Testimonial[],
};

/* --------------------------- Brands / clients --------------------------- */

export const brandsHeading = "Trusted by";

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
    name: "Kali Audio",
    href: "https://www.kaliaudio.com/",
    logo: "/brands/kali-audio.webp",
    width: 139,
    height: 160,
    scale: 1.25,
  },
  {
    name: "The Inventory",
    href: "https://theinventory.in/",
    logo: "/brands/the-inventory.webp",
    width: 536,
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
    name: "AAFT Online",
    href: "https://aaftonline.com/",
    logo: "/brands/aaft-online.webp",
    width: 354,
    height: 160,
    scale: 1.1,
  },
  {
    name: "Audimee",
    href: "https://audimee.com/?ref=florinajane",
    logo: "/brands/audimee.webp",
    width: 606,
    height: 160,
  },
  {
    name: "Freebeat AI",
    href: "https://freebeat.ai/#via=floofmusic",
    logo: "/brands/freebeat-ai.webp",
    width: 1083,
    height: 160,
    scale: 0.9,
  },
  {
    name: "TopMediai",
    href: "https://www.topmediai.com/app/ai-music/?custom=imf_17509226421419",
    logo: "/brands/topmediai.webp",
    width: 785,
    height: 160,
  },
  {
    name: "Takstar",
    href: "https://takstar.com/",
    logo: "/brands/takstar.webp",
    width: 1391,
    height: 160,
    scale: 1.2,
  },
  {
    name: "MusicCreator AI",
    href: "https://www.musiccreator.ai/?ref=FLOOFMUSIC",
    logo: "/brands/musiccreator-ai.webp",
    width: 1109,
    height: 160,
    scale: 0.9,
  },
];

/* --------------------------- Resources / links -------------------------- */

export type Resource = {
  title: string;
  description: string;
  cta: { label: string; href: string };
};

export const resources: Resource[] = [
  {
    title: "Products I Own",
    description: "My personal studio picks on Amazon.",
    cta: { label: "See my picks on Amazon", href: "https://amzn.in/d/0ceYT2M8" },
  },
];

/** Fine print in the footer, covering the Amazon picks and the referral links
 *  in the brand wall. */
export const affiliateDisclaimer =
  "A few links on this site are affiliate links, which means I may earn a " +
  "small commission if you purchase through them, at no extra cost to you. " +
  "Thanks for supporting the channel! ❤️";

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

/** Pre-fills the subject line so an enquiry arrives already labelled. */
export const serviceInquiryHref = (service: string) =>
  `mailto:${contact.email}?subject=${encodeURIComponent(
    `${service} enquiry (Flo of Music)`,
  )}`;

/* ------------------------------- Nav ------------------------------------ */

export const navLinks: { label: string; href: string }[] = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#mixes" },
  { label: "Services", href: "#services" },
  { label: "Learn", href: "#courses" },
  { label: "Contact", href: "#contact" },
];
