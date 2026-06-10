// components/menu/MenuPagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface MenuPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function MenuPagination({ currentPage, totalPages }: MenuPaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (targetPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", targetPage.toString());
    router.push(`/menu?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center gap-4 mt-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => handlePageChange(currentPage - 1)}
        className="px-4 py-2 text-xs font-semibold border border-[#F2E0DA] bg-white rounded-xl text-[#2C1810] disabled:opacity-40 disabled:hover:bg-white hover:bg-[#FFFAF8] transition-colors"
      >
        ← Previous
      </button>
      
      <span className="text-xs text-[#6B4F44] font-medium" style={{ fontFamily: "var(--font-dm-sans)" }}>
        Page <span className="font-bold text-[#2C1810]">{currentPage}</span> of {totalPages}
      </span>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        className="px-4 py-2 text-xs font-semibold border border-[#F2E0DA] bg-white rounded-xl text-[#2C1810] disabled:opacity-40 disabled:hover:bg-white hover:bg-[#FFFAF8] transition-colors"
      >
        Next →
      </button>
    </div>
  );
}