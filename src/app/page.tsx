import CtaSection from "@/components/home/sections/CtaSection";
import FeaturedMenuSection from "@/components/home/sections/FeaturedMenuSection";
import FeaturesSection from "@/components/home/sections/FeaturesSection";
import HeroSection from "@/components/home/sections/HeroSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <HeroSection />
      <FeaturedMenuSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
