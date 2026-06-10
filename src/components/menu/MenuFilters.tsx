// components/menu/MenuFilters.tsx
"use client";

import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuFiltersProps {
  categories: Category[];
  currentCategory: string;
  currentSearch: string;
}

export default function MenuFilters({ categories, currentCategory, currentSearch }: MenuFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchVal, setSearchVal] = useState(currentSearch);

  // Sync state if input updates from outside sources
  useEffect(() => {
    setSearchVal(currentSearch);
  }, [currentSearch]);

  // Helper utility to update URL parameters fluidly
  const updateQueryParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    params.delete("page"); // Reset pagination back to page 1 on active filter changes
    
    if (!value || value === "all") {
      params.delete(key);
    }
    
    router.push(`/menu?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-white border border-[#F2E0DA] p-6 rounded-2xl shadow-sm">
      {/* Category Tabs Wrapper */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
        <button
          onClick={() => updateQueryParams("category", "all")}
          className={cn(
            "px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all whitespace-nowrap",
            currentCategory === "all"
              ? "bg-[#E07A99] border-[#E07A99] text-white"
              : "border-[#F2E0DA] text-[#6B4F44] bg-white hover:bg-[#FFFAF8]"
          )}
        >
          ALL ITEMS
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => updateQueryParams("category", cat.slug)}
            className={cn(
              "px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all whitespace-nowrap uppercase",
              currentCategory === cat.slug
                ? "bg-[#E07A99] border-[#E07A99] text-white"
                : "border-[#F2E0DA] text-[#6B4F44] bg-white hover:bg-[#FFFAF8]"
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Input Search Element */}
      <div className="relative w-full md:w-72">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchVal}
          onChange={(e) => setSearchVal(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && updateQueryParams("search", searchVal)}
          className="w-full pl-10 pr-4 py-2.5 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder-[#C8B4AC] focus:outline-none focus:border-[#E07A99] transition-colors"
        />
        <Search className="absolute left-3.5 top-3 size-4 text-[#C8B4AC]" />
      </div>
    </div>
  );
}