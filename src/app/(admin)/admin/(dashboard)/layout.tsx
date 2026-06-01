// src/app/(admin)/admin/(dashboard)/layout.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MobileHeader from "@/components/admin/layout/MobileHeader";
import AdminSidebar from "@/components/admin/layout/AdminSidebar";
import { signOutAction } from "../login/loginActions";

const adminNavLinks = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="9" rx="1" />
        <rect x="14" y="3" width="7" height="5" rx="1" />
        <rect x="14" y="12" width="7" height="9" rx="1" />
        <rect x="3" y="16" width="7" height="5" rx="1" />
      </svg>
    ),
  },
  {
    label: "Manage Products",
    href: "/admin/products",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  async function handleSignOut() {
    await signOutAction();
    router.refresh();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF6F4]">
      {/* Mobile-Only Navbar Header */}
      <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />

      {/* Dimmed backdrop layer for mobile overlay drawer visibility */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-[#2C1810]/20 backdrop-blur-sm z-45 md:hidden transition-opacity"
        />
      )}

      {/* Modular Navigation Drawer Sidebar */}
      <AdminSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onSignOut={handleSignOut}
        navLinks={adminNavLinks}
      />

      {/* Primary Workspace Panel */}
      <main className="flex-1 p-6 md:p-10 max-w-7xl w-full mx-auto overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
