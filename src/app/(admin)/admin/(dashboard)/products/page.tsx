// app/(admin)/admin/(dashboard)/products/page.tsx
import { prisma } from "@/lib/prisma";
import { deleteProductAction } from "./productsActions";
import Link from "next/link";

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

      <div className="bg-white border border-[#F2E0DA] rounded-2xl shadow-sm">
        <table className="w-full text-left">
          <thead className="bg-[#FAF6F4] border-b border-[#F2E0DA] text-[11px] uppercase font-bold text-[#6B4F44]">
            <tr>
              <th className="py-3 px-6">Name</th>
              <th className="py-3 px-6">Price</th>
              <th className="py-3 px-6">Status</th>
              <th className="py-3 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F2E0DA]">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="py-4 px-6 font-semibold text-[#2C1810]">
                  {p.name}
                </td>
                <td className="py-4 px-6">
                  Rp {(p.price / 1000).toLocaleString()}k
                </td>
                <td className="py-4 px-6">{p.isActive ? "Live" : "Hidden"}</td>
                <td className="py-4 px-6 text-right">
                  <form action={deleteProductAction.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="text-red-500 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
