// app/contact/page.tsx

import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Contact Us | HelloBake",
  description:
    "Get in touch with HelloBake for custom orders, catering, or general questions.",
};

export default async function ContactPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "default" },
  });

  // Provide a reliable backup number if database table row hasn't been seeded yet
  const whatsappNumber = settings?.whatsappNumber || "6285121118121";

  return (
    <main className="min-h-screen bg-[#FFFAF8] pb-20">
      <ContactHero />

      <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="w-full lg:w-1/3">
          <ContactInfo />
        </div>

        <div className="w-full lg:w-2/3">
          <ContactForm whatsappNumber={whatsappNumber} />{" "}
        </div>
      </div>
    </main>
  );
}
