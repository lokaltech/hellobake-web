import { prisma } from "@/lib/prisma";
import MetricsCards from "@/components/admin/overview/MetricsCards";
import LeaderboardTable from "@/components/admin/overview/LeaderboardTable";

export const revalidate = 0;

export default async function AdminDashboardOverview() {
  const products = await prisma.product.findMany({
    orderBy: {
      clicks: "desc",
    },
  });

  const totalProducts = products.length;
  const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
  const mostPopularProduct = products[0]?.name || "No items uploaded yet";
  const activeItemsCount = products.filter((p) => p.isActive).length;

  return (
    <div className="flex flex-col gap-8">
      {/* Page Header */}
      <div>
        <h1
          className="text-3xl font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Dashboard Overview
        </h1>
        <p
          className="text-sm text-[#6B4F44]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Real-time user engagement and product performance metrics for
          HelloBake.
        </p>
      </div>

      <MetricsCards
        totalClicks={totalClicks}
        mostPopularProduct={mostPopularProduct}
        activeItemsCount={activeItemsCount}
        totalProducts={totalProducts}
      />

      <LeaderboardTable products={products} />
    </div>
  );
}
