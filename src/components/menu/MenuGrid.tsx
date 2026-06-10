// components/menu/MenuGrid.tsx
import { Prisma } from "@prisma/client";
import AddToCartButton from "./AddToCartButton";

type ProductWithCategory = Prisma.ProductGetPayload<{
  include: { category: true };
}>;

interface MenuGridProps {
  products: ProductWithCategory[];
}

export default function MenuGrid({ products }: MenuGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-20 bg-white border border-[#F2E0DA] rounded-3xl p-8 max-w-xl mx-auto w-full">
        <p className="text-3xl mb-3">🧁</p>
        <h3 className="text-lg font-bold text-[#2C1810] mb-1" style={{ fontFamily: "var(--font-playfair)" }}>
          No bakes found
        </h3>
        <p className="text-xs text-[#6B4F44]" style={{ fontFamily: "var(--font-dm-sans)" }}>
          We couldn't find items fitting that specific search term. Try adjusting your filters!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white border border-[#F2E0DA] rounded-3xl p-5 flex flex-col hover:shadow-md transition-shadow duration-300"
        >
          {/* Card Image Wrapper */}
          <div className="w-full h-44 bg-[#FDE8EE]/30 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
            {item.badge && (
              <span className="absolute top-3 left-3 bg-white text-[#E07A99] text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
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
            className="font-bold text-[#2C1810] text-[16px] mb-1.5 leading-snug line-clamp-1"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            {item.name}
          </h3>
          <p
            className="text-[12px] text-[#6B4F44] mb-5 flex-1 line-clamp-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {item.description}
          </p>

          {/* Action Row */}
          <div className="flex flex-col gap-2.5 mt-auto pt-2 border-t border-[#FFFAF8]">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-wide uppercase text-[#B08A80]">Price</span>
              <span className="font-bold text-[#2C1810] text-sm">
                Rp {(item.price / 1000).toLocaleString()}k
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {/* Trigger local Zustand cart action on implementation */}
              <AddToCartButton product={item} />
              <button className="text-[12px] font-semibold bg-[#E07A99] text-white py-2 rounded-xl hover:bg-[#D4608A] transition-all shadow-sm">
                Order Now
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}