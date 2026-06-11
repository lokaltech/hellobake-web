// src/app/(admin)/admin/(dashboard)/categories/page.tsx
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { deleteCategoryAction } from "./categoriesActions";
import DeleteCategoryButton from "@/components/admin/categories/DeleteCategoryButton";

export default async function CategoriesPage() {
  // Fetch categories and count the related products!
  const categories = await prisma.category.findMany({
    include: {
      _count: {
        select: { products: true },
      },
    },
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <div>
          <h1
            className="text-2xl font-bold text-[#2C1810]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Manage Categories
          </h1>
          <p
            className="text-sm text-[#6B4F44]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Organize your menu for the public catalog.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="bg-[#E07A99] hover:bg-[#D4608A] transition-colors text-white px-5 py-2.5 rounded-full text-sm font-medium"
        >
          + Add Category
        </Link>
      </div>

      <div className="bg-white border border-[#F2E0DA] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead
              className="bg-[#FAF6F4] border-b border-[#F2E0DA] text-[11px] uppercase font-bold text-[#6B4F44]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              <tr>
                <th className="py-3 px-6">Category Name</th>
                <th className="py-3 px-6">URL Slug</th>
                <th className="py-3 px-6 text-center">Items Assigned</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody
              className="divide-y divide-[#F2E0DA] text-sm text-[#2C1810]"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="py-12 text-center text-sm text-[#B08A80]"
                  >
                    No categories created yet.
                  </td>
                </tr>
              ) : (
                categories.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-[#FFFAF8] transition-colors"
                  >
                    <td className="py-4 px-6 font-semibold">{c.name}</td>
                    <td className="py-4 px-6 text-[#B08A80] font-mono text-xs">
                      /{c.slug}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className="bg-[#FDE8EE] text-[#E07A99] px-2.5 py-1 rounded-full font-bold text-xs">
                        {c._count.products}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <DeleteCategoryButton
                        categoryId={c.id}
                        categoryName={c.name}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
