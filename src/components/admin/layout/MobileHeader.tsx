// src/components/admin/layout/MobileHeader.tsx
"use client";

import Link from "next/link";

interface MobileHeaderProps {
  onOpenSidebar: () => void;
}

export default function MobileHeader({ onOpenSidebar }: MobileHeaderProps) {
  return (
    <header className="md:hidden flex items-center justify-between bg-white border-b border-[#F2E0DA] px-6 h-16 sticky top-0 z-40">
      <Link
        href="/admin"
        className="text-md font-semibold text-[#2C1810]"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Hello<span className="text-[#E07A99]">Bake</span>{" "}
        <span className="text-xs bg-[#FDE8EE] text-[#E07A99] px-2 py-0.5 rounded-md ml-1 font-sans uppercase font-bold">
          Admin
        </span>
      </Link>
      <button
        onClick={onOpenSidebar}
        className="p-2 -mr-2 text-[#6B4F44] hover:bg-[#FDE8EE] rounded-lg transition-colors"
        aria-label="Open navigation sidebar"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        >
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
    </header>
  );
}
