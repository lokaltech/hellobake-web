// components/home/sections/FeaturedMenuSection.tsx
import Link from "next/link";

const featuredItems = [
  {
    id: 1,
    name: "Classic Vanilla Birthday Cake",
    description: "Fluffy vanilla layers with cream cheese frosting",
    price: "Rp 280k",
    badge: "Bestseller",
    emoji: "🎂",
  },
  {
    id: 2,
    name: "Strawberry Mille-Feuille",
    description: "Crispy puff pastry with fresh strawberry cream",
    price: "Rp 55k",
    badge: "New",
    emoji: "🍰",
  },
  {
    id: 3,
    name: "Dark Chocolate Tart",
    description: "Rich 70% dark chocolate ganache in a buttery shell",
    price: "Rp 65k",
    badge: "",
    emoji: "🍫",
  },
  {
    id: 4,
    name: "Earl Grey Chiffon",
    description: "Delicate earl grey chiffon with lemon zest",
    price: "Rp 240k",
    badge: "Fan fave",
    emoji: "☕",
  },
];

export default function FeaturedMenuSection() {
  return (
    <section className="py-20 px-6 bg-white border-y border-[#F2E0DA]">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center bg-[#FDE8EE] rounded-full px-4 py-1.5 mb-4">
            <span
              className="text-[11px] font-bold tracking-widest text-[#E07A99] uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Our Menu
            </span>
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-[#2C1810] mb-4"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Fresh from the Oven
          </h2>
          <p
            className="text-[#6B4F44]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Baked every morning — our bestsellers go fast, so order early!
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {featuredItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFAF8] border border-[#F2E0DA] rounded-3xl p-5 flex flex-col hover:shadow-md transition-shadow duration-300"
            >
              {/* Image Area Placeholder */}
              <div className="w-full h-48 bg-[#FDE8EE]/50 rounded-2xl mb-5 flex items-center justify-center relative">
                {item.badge && (
                  <span className="absolute top-3 left-3 bg-white text-[#E07A99] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {item.badge}
                  </span>
                )}
                <span className="text-6xl">{item.emoji}</span>
              </div>

              <h3
                className="font-bold text-[#2C1810] text-[17px] mb-2 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {item.name}
              </h3>
              <p
                className="text-[13px] text-[#6B4F44] mb-6 flex-1"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                {item.description}
              </p>

              <div className="flex items-center justify-between mt-auto">
                <span className="font-bold text-[#2C1810]">{item.price}</span>
                <button className="text-[13px] font-medium border border-[#F2E0DA] text-[#2C1810] px-4 py-2 rounded-full hover:border-[#E07A99] hover:text-[#E07A99] transition-colors">
                  Order
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center">
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-[#E07A99] hover:text-[#D4608A] font-medium transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            View full menu <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
