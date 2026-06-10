"use client";

import Link from "next/link";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

export default function HeroSection() {
  const avatarUrls = [
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80", // Woman smiling
    "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&h=150&q=80", // Man smiling
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80", // Woman smiling
    "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&h=150&q=80", // Man smiling
  ];

  const { cart } = useCart();
  const currentWhatsAppUrl = getWhatsAppOrderLink(cart);

  return (
    // Added bg-[#FFFAF8] here
    <section className="relative bg-[#FFFAF8] overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-8">
        {/* Left Content */}
        <div className="flex-1 text-center md:text-left z-10">
          <div className="inline-flex items-center bg-[#FDE8EE] rounded-full px-4 py-1.5 mb-6">
            <span
              className="text-[11px] font-bold tracking-widest text-[#E07A99] uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Freshly Baked Daily · Jakarta
            </span>
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#2C1810] leading-[1.1] mb-6 tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Baked Fresh, <br />
            <span className="text-[#E07A99]">Made with Love</span>
          </h1>

          <p
            className="text-[16px] md:text-[18px] text-[#6B4F44] max-w-md mx-auto md:mx-0 mb-8 leading-relaxed"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Artisan cakes, pastries, and baked goods handcrafted from the finest
            ingredients. Every bite tells a story.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start mb-10">
            <Link
              href={currentWhatsAppUrl}
              className="w-full sm:w-auto bg-[#E07A99] hover:bg-[#D4608A] text-white text-[15px] font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-center"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Order Now
            </Link>
            <Link
              href="/menu"
              className="w-full sm:w-auto bg-transparent border border-[#F2E0DA] hover:border-[#E07A99] text-[#2C1810] text-[15px] font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-center"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Menu
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center md:justify-start gap-4">
            <div className="flex -space-x-3">
              {avatarUrls.map((url, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full border-2 border-[#FFFAF8] bg-[#FDE8EE] flex items-center justify-center overflow-hidden relative shadow-sm"
                >
                  {/* 2️⃣ Real person face image replacement */}
                  <img
                    src={url}
                    alt={`Happy HelloBake Customer ${index + 1}`}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-200"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
            <p
              className="text-sm text-[#6B4F44]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <span className="font-bold text-[#2C1810]">500+</span> happy
              customers
            </p>
          </div>
        </div>

        {/* Right Graphic */}
        <div className="flex-1 relative flex justify-center items-center mt-12 md:mt-0">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-[#FDE8EE] rounded-full relative flex items-center justify-center before:absolute before:-inset-8 before:border before:border-[#F2E0DA] before:rounded-full">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-[#E07A99]/10 rounded-full flex items-center justify-center relative">
              <img
                src="/hero-product.png"
                alt="Freshly baked artisan bread"
                className="w-[85%] h-[85%] object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Review Badge */}
            <div className="absolute top-10 -right-2 md:-right-10 bg-white p-3 rounded-2xl shadow-lg border border-[#F2E0DA] z-20">
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className="text-[#E07A99]">★</span> 4.9{" "}
                <span className="text-gray-400 text-xs ml-1 font-normal">
                  200+ reviews
                </span>
              </div>
            </div>

            {/* Floating CTA Badge */}
            <div className="absolute bottom-8 -left-2 md:-left-10 bg-white p-4 rounded-2xl shadow-lg border border-[#F2E0DA] z-20">
              <p
                className="text-sm font-bold text-[#2C1810]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Artisan Breads
              </p>
              <p className="text-xs text-[#6B4F44]">Baked fresh daily</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
