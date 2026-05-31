// components/home/sections/CtaSection.tsx
import Link from "next/link";

export default function CtaSection() {
  return (
    <section className="bg-[#2C1810] py-24 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center border border-[#4E2E20] bg-[#3D2218] rounded-full px-4 py-1.5 mb-8">
          <span
            className="text-[11px] font-bold tracking-widest text-[#E07A99] uppercase"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Ready to Order?
          </span>
        </div>

        <h2
          className="text-4xl md:text-5xl font-bold text-[#F5E6E0] mb-6 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Something Special <br />
          <span className="text-[#E07A99]">Starts Here</span>
        </h2>

        <p
          className="text-[#C8A898] text-[16px] md:text-[18px] max-w-xl mx-auto mb-10 leading-relaxed"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Whether it's a birthday, a wedding, or just a Tuesday treat — we're
          here to make it delicious.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#E07A99] hover:bg-[#D4608A] text-white text-[15px] font-medium px-8 py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
            </svg>
            Order via WhatsApp
          </a>
          <Link
            href="/menu"
            className="w-full sm:w-auto bg-transparent border border-[#4E2E20] hover:border-[#E07A99] text-[#F5E6E0] hover:text-[#E07A99] text-[15px] font-medium px-8 py-3.5 rounded-full transition-colors duration-200 text-center"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Browse the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
