// src/components/admin/overview/LeaderboardTable.tsx
import { Product } from "@prisma/client";

interface LeaderboardTableProps {
  products: Product[];
}

export default function LeaderboardTable({ products }: LeaderboardTableProps) {
  return (
    <div className="bg-white border border-[#F2E0DA] rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-5 border-b border-[#F2E0DA]">
        <h3
          className="text-lg font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Menu Item Leaderboard
        </h3>
        <p
          className="text-xs text-[#6B4F44]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Products ranked by customer click frequency.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className="bg-[#FAF6F4] border-b border-[#F2E0DA] text-[11px] font-bold uppercase tracking-wider text-[#6B4F44]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <th className="py-3 px-6">Product Details</th>
              <th className="py-3 px-6">Category</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6 text-center">Status</th>
              <th className="py-3 px-6 text-right">"Order Now" Clicks</th>
            </tr>
          </thead>
          <tbody
            className="divide-y divide-[#F2E0DA] text-sm text-[#2C1810]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {products.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-12 text-center text-sm text-[#B08A80]"
                >
                  No product metrics tracked yet. Create your first product to
                  see data!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-[#FFFAF8] transition-colors"
                >
                  <td className="py-4 px-6 font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold text-[#2C1810]">
                        {product.name}
                      </span>
                      {product.badge && (
                        <span className="inline-self-start text-[10px] bg-[#FDE8EE] text-[#E07A99] px-1.5 py-0.5 rounded-md mt-1 font-bold uppercase tracking-wide">
                          {product.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#6B4F44]">
                    {product.category}
                  </td>
                  <td className="py-4 px-6 font-mono">
                    Rp {(product.price / 1000).toLocaleString()}k
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                        product.isActive
                          ? "bg-green-50 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${product.isActive ? "bg-green-600" : "bg-gray-400"}`}
                      />
                      {product.isActive ? "Live on Site" : "Hidden"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right font-bold text-[15px] text-[#E07A99]">
                    {product.clicks.toLocaleString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
