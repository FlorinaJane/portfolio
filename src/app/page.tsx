import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Brands } from "@/components/sections/brands";
import { Services } from "@/components/sections/services";
import { Mixes } from "@/components/sections/mixes";
import { Courses } from "@/components/sections/courses";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import { FaderScrollbar } from "@/components/ui/fader-scrollbar";
import { SectionDivider } from "@/components/ui/section-divider";

export default function Home() {
  return (
    <>
      <Navbar />
      <FaderScrollbar />
      <main id="content">
        <Hero />
        <About />
        <Brands />
        <Mixes />
        <SectionDivider />
        <Services />
        <Courses />
        <Testimonials />
        <Contact />
      </main>
    </>
  );
}
