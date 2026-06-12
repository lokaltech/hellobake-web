import CtaSection from "@/components/home/sections/CtaSection";
import FeaturedMenuSection from "@/components/home/sections/FeaturedMenuSection";
import FeaturesSection from "@/components/home/sections/FeaturesSection";
import HeroSection from "@/components/home/sections/HeroSection";
import TestimonialsSection from "@/components/home/sections/TestimonialsSection";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "default" },
  });

  // Provide a reliable backup number if database table row hasn't been seeded yet
  const whatsappNumber = settings?.whatsappNumber || "6285121118121";

  return (
    <div className="w-full flex flex-col">
      <HeroSection whatsappNumber={whatsappNumber} />
      <FeaturedMenuSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
