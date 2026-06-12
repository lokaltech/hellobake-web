// app/(marketing)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "default" },
  });

  const whatsappNumber = settings?.whatsappNumber || "6285121118121";
  return (
    <div className="min-h-full flex flex-col bg-[#FFFAF8] text-[#2C1810]">
      <Navbar whatsappNumber={whatsappNumber} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
