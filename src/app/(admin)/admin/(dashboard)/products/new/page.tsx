"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductForm from "@/components/admin/products/ProductForm";
import { createProductAction } from "../productsActions";

export default function NewProductPage() {
  const router = useRouter();

  async function handleCreate(productData: any) {
    await createProductAction(productData);
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <div className="max-w-3xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="text-[#6B4F44] hover:text-[#E07A99] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1
            className="text-2xl font-bold text-[#2C1810]"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Add New Menu Item
          </h1>
          <p
            className="text-sm text-[#6B4F44]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Create a new pastry or cake for the public catalog.
          </p>
        </div>
      </div>

      <ProductForm onSubmit={handleCreate} submitButtonText="Publish Product" />
    </div>
  );
}
