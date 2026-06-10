// components/home/sections/FeaturedMenuSection.tsx
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import AddToCartButton from "@/components/menu/AddToCartButton";
import InstantOrderButton from "@/components/order/InstantOrderButton";

// Force Next.js to run randomization on every single page request
export const dynamic = "force-dynamic";

export default async function FeaturedMenuSection() {
  // 1️⃣ Fetch ALL active featured products from the database
  const allFeaturedItems = await prisma.product.findMany({
    where: {
      isFeatured: true,
      isActive: true,
    },
  });

  // 2️⃣ Shuffle the array randomly in memory and grab the top 4 elements
  const featuredItems = allFeaturedItems
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);

  return (
    <section className="py-20 px-6 bg-white border-y border-[#F2E0DA]">
      <div className="max-w-6xl mx-auto">
        {/* Header content */}
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

        {/* Product Grid Layout */}
        {featuredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#FFFAF8] border border-[#F2E0DA] rounded-3xl p-5 flex flex-col hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-full h-48 bg-[#FDE8EE]/30 rounded-2xl mb-5 flex items-center justify-center relative overflow-hidden">
                  {item.badge && (
                    <span className="absolute top-3 left-3 bg-white text-[#E07A99] text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
                      {item.badge}
                    </span>
                  )}
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                  />
                </div>

                <h3
                  className="font-bold text-[#2C1810] text-[17px] mb-2 leading-snug line-clamp-1"
                  style={{ fontFamily: "var(--font-playfair)" }}
                >
                  {item.name}
                </h3>
                <p
                  className="text-[13px] text-[#6B4F44] mb-6 flex-1 line-clamp-2"
                  style={{ fontFamily: "var(--font-dm-sans)" }}
                >
                  {item.description}
                </p>

                {/* 🟢 CHANGED: Formatted action row with both Add to Cart and Order elements */}
                <div className="flex flex-col gap-2.5 mt-auto pt-2 border-t border-[#F2E0DA]/40">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold tracking-wide uppercase text-[#B08A80]">
                      Price
                    </span>
                    <span className="font-bold text-[#2C1810] text-sm">
                      Rp {(item.price / 1000).toLocaleString()}k
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <AddToCartButton product={item} />
                    <InstantOrderButton product={item} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty Coming Soon Section */
          <div className="max-w-2xl mx-auto bg-[#FFFAF8] border border-dashed border-[#E07A99]/40 rounded-3xl p-10 md:p-16 text-center my-8 flex flex-col items-center justify-center gap-4 shadow-sm">
            <div className="w-16 h-16 bg-[#FDE8EE] rounded-full flex items-center justify-center text-2xl animate-pulse">
              👩‍🍳
            </div>
            <div>
              <h3
                className="text-xl font-bold text-[#2C1810] mb-2"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Our Bakers are Creating Magic!
              </h3>
              <p
                className="text-sm text-[#6B4F44] max-w-md mx-auto leading-relaxed"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                We are currently restructuring our featured collection to bring
                you the freshest seasonal menus. Check back shortly to order!
              </p>
            </div>
            <div className="h-px w-20 bg-[#F2E0DA] my-2" />
          </div>
        )}

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
