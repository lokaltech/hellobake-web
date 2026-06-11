// components/admin/DeleteCategoryButton.tsx
"use client";

import { useTransition } from "react";
import { deleteCategoryAction } from "@/app/(admin)/admin/(dashboard)/categories/categoriesActions";

interface DeleteCategoryButtonProps {
  categoryId: string;
  categoryName: string;
}

export default function DeleteCategoryButton({
  categoryId,
  categoryName,
}: DeleteCategoryButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${categoryName}"?`,
    );

    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteCategoryAction(categoryId);

      if (result?.error) {
        alert(`Error: ${result.error}`);
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
