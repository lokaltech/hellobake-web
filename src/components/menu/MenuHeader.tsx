// components/menu/MenuHeader.tsx
export default function MenuHeader() {
  return (
    <div className="bg-white border-b border-[#F2E0DA] py-16 px-6 text-center">
      <div className="max-w-3xl mx-auto">
        <span 
          className="text-xs font-bold uppercase tracking-widest text-[#E07A99]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Handcrafted Daily
        </span>
        <h1 
          className="text-4xl md:text-5xl font-bold text-[#2C1810] mt-3 mb-4"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Our Bakery Menu
        </h1>
        <p 
          className="text-[#6B4F44] text-sm md:text-base"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          From organic artisan sourdough to celebratory multi-tiered custom cakes, browse our complete list of fresh bakes.
        </p>
      </div>
    </div>
  );
}