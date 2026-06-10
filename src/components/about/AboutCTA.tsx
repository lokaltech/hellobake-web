// components/about/AboutCTA.tsx
import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-4xl mx-auto bg-[#FDE8EE] rounded-[2.5rem] p-10 md:p-16 text-center relative overflow-hidden shadow-sm">
        {/* Inner Content */}
        <div className="relative z-10 flex flex-col items-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Ready to taste our story?
          </h2>
          <p
            className="text-[#6B4F44] mb-8 max-w-md mx-auto"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Browse our menu of freshly baked goods and find your new favorite
            treat today.
          </p>
          <Link
            href="/menu"
            className="bg-[#E07A99] hover:bg-[#D4608A] text-white px-8 py-3.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Explore the Menu
          </Link>
        </div>

        {/* Subtle decorative circles */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/40 rounded-full" />
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/40 rounded-full" />
      </div>
    </section>
  );
}
