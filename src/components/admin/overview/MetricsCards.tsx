// src/components/admin/overview/MetricsCards.tsx

interface MetricsCardsProps {
  totalClicks: number;
  mostPopularProduct: string;
  activeItemsCount: number;
  totalProducts: number;
}

export default function MetricsCards({
  totalClicks,
  mostPopularProduct,
  activeItemsCount,
  totalProducts,
}: MetricsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {/* Metric 1: Total Engagement */}
      <div className="bg-white border border-[#F2E0DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider text-[#B08A80]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Total Order Clicks
          </span>
          <span className="text-lg bg-[#FDE8EE] text-[#E07A99] size-8 rounded-xl flex items-center justify-center">
            📈
          </span>
        </div>
        <p
          className="text-3xl font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {totalClicks.toLocaleString()}
        </p>
        <p
          className="text-xs text-[#6B4F44] mt-1"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Total intent interactions across all items
        </p>
      </div>

      {/* Metric 2: Star Bestseller */}
      <div className="bg-white border border-[#F2E0DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider text-[#B08A80]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Most Popular Item
          </span>
          <span className="text-lg bg-yellow-50 text-yellow-600 size-8 rounded-xl flex items-center justify-center">
            👑
          </span>
        </div>
        <p
          className="text-lg font-bold text-[#2C1810] truncate mt-1"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {mostPopularProduct}
        </p>
        <p
          className="text-xs text-[#6B4F44] mt-1.5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Highest click volume item
        </p>
      </div>

      {/* Metric 3: Active Menu Items */}
      <div className="bg-white border border-[#F2E0DA] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider text-[#B08A80]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Live Menu Size
          </span>
          <span className="text-lg bg-green-50 text-green-600 size-8 rounded-xl flex items-center justify-center">
            🍰
          </span>
        </div>
        <p
          className="text-3xl font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          {activeItemsCount}{" "}
          <span className="text-sm font-normal text-[#6B4F44]">
            / {totalProducts} items
          </span>
        </p>
        <p
          className="text-xs text-[#6B4F44] mt-1"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Currently visible to visitors on site
        </p>
      </div>

      {/* Metric 4: Direct Ordering Route */}
      <div className="bg-[#2C1810] border border-[#3D2218] rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-bold uppercase tracking-wider text-[#C8A898]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Conversion Channel
          </span>
          <span className="text-lg bg-[#3D2218] size-8 rounded-xl flex items-center justify-center">
            💬
          </span>
        </div>
        <p
          className="text-xl font-bold text-[#F5E6E0]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          WhatsApp API
        </p>
        <p
          className="text-xs text-[#A07060] mt-2.5"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Active endpoint handling orders
        </p>
      </div>
    </div>
  );
}
