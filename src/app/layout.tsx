import type { Metadata } from "next";
import "./globals.css";
import { profile } from "@/data";
import { ScrollTopOnLoad } from "@/components/ui/scroll-top-on-load";

// No webfonts: typography comes from the OS system stack (see globals.css).
// Apple devices render SF Pro; other platforms fall back to Segoe UI / Roboto.

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full">
        <ScrollTopOnLoad />
        {children}
      </body>
    </html>
  );
}
