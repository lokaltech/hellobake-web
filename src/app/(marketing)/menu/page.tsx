// app/menu/page.tsx
import MenuFilters from "@/components/menu/MenuFilters";
import MenuGrid from "@/components/menu/MenuGrid";
import MenuHeader from "@/components/menu/MenuHeader";
import MenuPagination from "@/components/menu/MenuPagination";
import { prisma } from "@/lib/prisma";

interface MenuPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function MenuPage({ searchParams }: MenuPageProps) {
  // 1. Unwrapped async search parameters
  const resolvedParams = await searchParams;
  const searchString = resolvedParams.search || "";
  const currentCategorySlug = resolvedParams.category || "all";
  const currentPage = parseInt(resolvedParams.page || "1", 10);
  
  const itemsPerPage = 8; // Adjust layout capacity here

  // 2. Formulate database where queries dynamically
  const whereClause: any = { isActive: true };
  
  if (searchString) {
    whereClause.name = {
      contains: searchString,
      mode: "insensitive", // Case-insensitive matching
    };
  }
  
  if (currentCategorySlug !== "all") {
    whereClause.category = {
      slug: currentCategorySlug,
    };
  }

  // 3. Parallelize database queries for peak execution speed
  const [products, totalItems, categories] = await Promise.all([
    prisma.product.findMany({
      where: whereClause,
      skip: (currentPage - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.product.count({ where: whereClause }),
    prisma.category.findMany({ orderBy: { name: "asc" } }),
  ]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="bg-[#FFFAF8] min-h-screen pb-20">
      <MenuHeader />

      <div className="max-w-6xl mx-auto px-6 mt-12 flex flex-col gap-8">
        <MenuFilters 
          categories={categories} 
          currentCategory={currentCategorySlug} 
          currentSearch={searchString} 
        />

        <MenuGrid products={products} />

        {totalPages > 1 && (
          <MenuPagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
          />
        )}
      </div>
    </div>
  );
}