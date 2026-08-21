import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { profile } from "@/data";
import { ScrollTopOnLoad } from "@/components/ui/scroll-top-on-load";
import { PageAmbience } from "@/components/ui/page-ambience";

// Headings and body come from the OS system stack (see globals.css) — Apple
// devices render SF Pro, others fall back to Segoe UI / Roboto. The one webfont
// is Space Grotesk, used for small labels where SF Pro has no character at
// 13px; `next/font` self-hosts it, so there is no third-party request.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
  variable: "--font-label-src",
});

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.tagline,
  keywords: [
    "mixing engineer",
    "mastering engineer",
    "music producer",
    "vocal tuning",
    "Flo of Music",
    "Florina Jane",
    profile.name,
  ],
  openGraph: {
    title: `${profile.name} — ${profile.role}`,
    description: profile.tagline,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${spaceGrotesk.variable}`}>
      <head>
        {/* Reveal animations start at opacity:0 and are cleared by JS. Without
            it every wrapped block — including the stats — stays invisible. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;filter:none!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="relative min-h-full">
        <ScrollTopOnLoad />
        <PageAmbience />
        {children}
      </body>
    </html>
  );
}
