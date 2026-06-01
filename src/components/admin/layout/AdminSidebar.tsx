// src/components/admin/layout/AdminSidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavigationLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface AdminSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => Promise<void>;
  navLinks: NavigationLink[];
}

export default function AdminSidebar({
  isOpen,
  onClose,
  onSignOut,
  navLinks,
}: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      // CHANGED: replaced md:static with md:sticky md:top-0 to anchor positioning
      className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#F2E0DA] flex flex-col transform transition-transform duration-300 ease-in-out md:translate-x-0 md:sticky md:top-0 md:h-screen ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-[#F2E0DA]">
        <Link
          href="/admin"
          className="text-lg font-semibold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Hello<span className="text-[#E07A99]">Bake</span>{" "}
          <span className="text-[10px] bg-[#FDE8EE] text-[#E07A99] px-2 py-0.5 rounded-md ml-1 font-sans uppercase font-bold tracking-wider">
            Admin
          </span>
        </Link>
        <button
          onClick={onClose}
          className="md:hidden p-1 text-[#6B4F44] hover:bg-[#FDE8EE] rounded-lg"
          aria-label="Close navigation sidebar"
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
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        {navLinks.map(({ label, href, icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] transition-colors duration-150 ${
                isActive
                  ? "bg-[#FDE8EE] text-[#E07A99] font-medium"
                  : "text-[#6B4F44] hover:bg-[#FAF6F4] hover:text-[#2C1810]"
              }`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {icon}
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-[#F2E0DA] flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full border border-[#F2E0DA] hover:border-[#E07A99] text-[#6B4F44] hover:text-[#E07A99] text-[13px] font-medium py-2.5 rounded-xl transition-colors"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          View Live Site
        </Link>

        <button
          onClick={onSignOut}
          className="flex items-center justify-center gap-2 w-full bg-[#FAF6F4] hover:bg-red-50 text-[#6B4F44] hover:text-red-600 text-[13px] font-medium py-2.5 rounded-xl transition-colors duration-150 group"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[#B08A80] group-hover:text-red-500 transition-colors"
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
