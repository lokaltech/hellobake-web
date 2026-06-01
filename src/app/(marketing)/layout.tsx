// app/(marketing)/layout.tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-full flex flex-col bg-[#FFFAF8] text-[#2C1810]">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
