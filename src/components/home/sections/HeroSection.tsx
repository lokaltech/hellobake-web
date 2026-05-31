// components/home/sections/HeroSection.tsx
import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
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
              href="/order"
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
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-[#FFFAF8] bg-[#FDE8EE] flex items-center justify-center overflow-hidden"
                >
                  <div className="w-full h-full bg-[#E07A99]/20" />
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
        <div className="flex-1 relative flex justify-center items-center">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-[#FDE8EE] rounded-full relative flex items-center justify-center before:absolute before:-inset-8 before:border before:border-[#F2E0DA] before:rounded-full">
            <div className="w-48 h-48 bg-[#E07A99]/10 rounded-full flex items-center justify-center">
              <span className="text-4xl">🎂</span>
            </div>

            <div className="absolute top-10 -right-4 md:-right-10 bg-white p-3 rounded-2xl shadow-lg border border-[#F2E0DA]">
              <div className="flex items-center gap-1 text-sm font-medium">
                <span className="text-[#E07A99]">★</span> 4.9{" "}
                <span className="text-gray-400 text-xs ml-1 font-normal">
                  200+ reviews
                </span>
              </div>
            </div>

            <div className="absolute bottom-10 -left-4 md:-left-10 bg-white p-4 rounded-2xl shadow-lg border border-[#F2E0DA]">
              <p
                className="text-sm font-bold text-[#2C1810]"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Custom Cakes
              </p>
              <p className="text-xs text-[#6B4F44]">Order yours today</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
