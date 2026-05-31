// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

const navLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b border-[#F2E0DA] ${
          scrolled
            ? "bg-[rgba(255,250,248,0.92)] backdrop-blur-md shadow-sm"
            : "bg-[#FFFAF8]"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-17 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9.5 h-9.5 rounded-full bg-[#FDE8EE] flex items-center justify-center overflow-hidden">
              <Image
                src="/logo.png"
                alt="HelloBake logo"
                width={38}
                height={38}
                className="object-cover"
              />
            </div>
            <span
              className="text-[20px] font-semibold text-[#2C1810] tracking-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Hello<span className="text-[#E07A99]">Bake</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8 list-none m-0 p-0">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`text-[14px] transition-colors duration-200 relative pb-0.5 ${
                      isActive
                        ? "text-[#E07A99] font-medium after:absolute after:bottom-0.5 after:left-0 after:right-0 after:h-[1.5px] after:bg-[#E07A99] after:rounded-full"
                        : "text-[#6B4F44] hover:text-[#E07A99] font-normal"
                    }`}
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Cart icon — always visible */}
            <Link
              href="/cart"
              className="relative text-[#6B4F44] hover:text-[#E07A99] transition-colors"
              aria-label="View cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              <span className="absolute -top-1.5 -right-1.5 w-3.75 h-3.75 bg-[#E07A99] text-white text-[9px] font-semibold rounded-full flex items-center justify-center">
                2
              </span>
            </Link>

            {/* CTA — hidden on mobile */}
            <Link
              href="/order"
              className="hidden sm:inline-flex items-center bg-[#E07A99] hover:bg-[#D4608A] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-full transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Order Now
            </Link>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 rounded-lg hover:bg-[#FDE8EE] transition-colors"
              aria-label="Open menu"
            >
              <span className="w-5 h-[1.5px] bg-[#2C1810] rounded-full block" />
              <span className="w-5 h-[1.5px] bg-[#2C1810] rounded-full block" />
              <span className="w-3.5 h-[1.5px] bg-[#2C1810] rounded-full block self-start ml-0.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Backdrop */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-60 bg-[#2C1810]/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-0 right-0 z-70 h-full w-70 bg-[#FFFAF8] shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile navigation"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-17 border-b border-[#F2E0DA]">
          <span
            className="text-[18px] font-semibold text-[#2C1810] tracking-tight"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hello<span className="text-[#E07A99]">Bake</span>
          </span>
          <button
            onClick={() => setMenuOpen(false)}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-[#FDE8EE] transition-colors text-[#6B4F44]"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navLinks.map(({ label, href }, i) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] transition-colors duration-150 ${
                  isActive
                    ? "bg-[#FDE8EE] text-[#E07A99] font-medium"
                    : "text-[#6B4F44] hover:bg-[#FDF3F6] hover:text-[#E07A99] font-normal"
                }`}
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  animationDelay: `${i * 40}ms`,
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer CTA */}
        <div className="px-6 py-6 border-t border-[#F2E0DA]">
          <Link
            href="/order"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-full bg-[#E07A99] hover:bg-[#D4608A] text-white text-[14px] font-medium py-3 rounded-full transition-colors duration-200"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Order Now
          </Link>
          <p
            className="text-center text-[12px] text-[#B08A80] mt-3"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Fresh baked daily in Jakarta 🎂
          </p>
        </div>
      </aside>
    </>
  );
}
