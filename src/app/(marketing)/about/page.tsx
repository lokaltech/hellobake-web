import AboutCTA from "@/components/about/AboutCTA";
import AboutHero from "@/components/about/AboutHero";
import AboutValues from "@/components/about/AboutValues";
import OurStory from "@/components/about/OurStory";

// app/about/page.tsx
export const metadata = {
  title: "About Us | HelloBake",
  description:
    "Learn about the passion and story behind HelloBake's sweet creations.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF8] pb-16">
      <AboutHero />
      <OurStory />
      <AboutValues />
      <AboutCTA />
    </main>
  );
}
