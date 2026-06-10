// app/(admin)/admin/(dashboard)/products/page.tsx
import { prisma } from "@/lib/prisma";
import { deleteProductAction } from "./productsActions";
import Link from "next/link";
import DeleteProductButton from "@/components/admin/products/DeleteProductButton";

export default async function ProductsPage() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1
          className="text-2xl font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Manage Menu
        </h1>
        <Link
          href="/admin/products/new"
          className="bg-[#E07A99] hover:bg-[#D4608A] transition-colors text-white px-5 py-2.5 rounded-full text-sm font-medium"
        >
          + Add New Item
        </Link>
      </div>

      <div className="bg-white border border-[#F2E0DA] rounded-2xl shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-[#FAF6F4] border-b border-[#F2E0DA] text-[11px] uppercase font-bold text-[#6B4F44]">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6">Featured</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2E0DA]">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-[#FFFAF8] transition-colors">
                <td className="py-4 px-6 font-semibold text-[#2C1810]">
                  {/* 1. Made the Name clickable with a hover state */}
                  <Link 
                    href={`/admin/products/${p.id}/edit`}
                    className="hover:text-[#E07A99] transition-colors"
                  >
                    {p.name}
                  </Link>
                </td>
                <td className="py-4 px-6 text-[#6B4F44]">
                  Rp {(p.price / 1000).toLocaleString()}k
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    p.isActive ? "bg-[#FDE8EE] text-[#E07A99]" : "bg-gray-100 text-gray-500"
                  }`}>
                    {p.isActive ? "Live" : "Hidden"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${
                    p.isFeatured ? "bg-[#FDE8EE] text-[#E07A99]" : "bg-gray-100 text-gray-500"
                  }`}>
                    {p.isFeatured ? "Featured" : "Not Featured"}
                  </span>
                </td>
                <td className="py-4 px-6">
                  {/* 2. Added Flexbox to align Edit and Delete buttons cleanly */}
                  <div className="flex items-center justify-end gap-4">
                    <Link
                      href={`/admin/products/${p.id}/edit`}
                      className="text-[#6B4F44] hover:text-[#E07A99] text-sm font-medium transition-colors"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={p.id} productName={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}