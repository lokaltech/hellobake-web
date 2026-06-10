"use client";

import { useTransition } from "react";
import { deleteProductAction } from "@/app/(admin)/admin/(dashboard)/products/productsActions";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({ productId, productName }: DeleteProductButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = window.confirm(`Are you sure you want to delete "${productName}"? This will permanently remove its image from storage too.`);
    
    if (!confirmed) return;

    // startTransition handles the async server action and gives us a loading state
    startTransition(async () => {
      const result = await deleteProductAction(productId);
      
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