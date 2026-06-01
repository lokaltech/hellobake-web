// src/app/(admin)/admin/(dashboard)/categories/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import CategoryForm from "@/components/admin/categories/CategoryForm";
import { createCategoryAction } from "../categoriesActions";

export default function NewCategoryPage() {
  const router = useRouter();

  async function handleCreate(formData: FormData) {
    const response = await createCategoryAction(formData);

    if (response?.success) {
      router.push("/admin/categories");
      router.refresh();
    }

    return response;
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/categories"
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
            New Category
          </h1>
          <p
            className="text-sm text-[#6B4F44]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Create a new section for your catalog.
          </p>
        </div>
      </div>

      <CategoryForm
        onSubmit={handleCreate}
        submitButtonText="Create Category"
      />
    </div>
  );
}
