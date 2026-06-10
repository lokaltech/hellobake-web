// src/app/(admin)/admin/(dashboard)/products/[id]/edit/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/products/ProductForm";
import { updateProductAction } from "../../productsActions";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; 
}) {
  const { id } = await params;

  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: id }, 
      include: { category: true }, 
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const updateActionWithId = updateProductAction.bind(null, product.id);

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-[#6B4F44] hover:text-[#E07A99] transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[#2C1810]" style={{ fontFamily: "var(--font-playfair)" }}>
            Edit Menu Item
          </h1>
          <p className="text-sm text-[#6B4F44]" style={{ fontFamily: "var(--font-dm-sans)" }}>
            Updating details for <span className="font-semibold text-[#2C1810]">{product.name}</span>.
          </p>
        </div>
      </div>

      <ProductForm 
        initialData={product}
        categories={categories} 
        onSubmit={updateActionWithId} 
        submitButtonText="Save Changes" 
      />
    </div>
  );
}