// app/contact/page.tsx

import ContactForm from "@/components/contact/ContactForm";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";

export const metadata = {
  title: "Contact Us | HelloBake",
  description:
    "Get in touch with HelloBake for custom orders, catering, or general questions.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FFFAF8] pb-20">
      <ContactHero />

      <div className="max-w-6xl mx-auto px-6 mt-16 flex flex-col lg:flex-row gap-12 lg:gap-20">
        <div className="w-full lg:w-1/3">
          <ContactInfo />
        </div>

        <div className="w-full lg:w-2/3">
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
