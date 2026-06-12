// components/Navbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/menu/CartDrawer";
import Image from "next/image";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";

const baseNavLinks = [
  { label: "Menu", href: "/menu" },
  { label: "Order", href: "/order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  whatsappNumber: string;
}

export default function Navbar({ whatsappNumber }: NavbarProps) {
  const pathname = usePathname();

  const { cart, cartCount } = useCart();

  // Generate the WhatsApp URL based on the current cart contents
  const currentWhatsAppUrl = getWhatsAppOrderLink(cart, whatsappNumber);

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when either mobile menu or sidebar cart is open
  useEffect(() => {
    document.body.style.overflow = menuOpen || cartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen, cartOpen]);

  // Map links dynamically inside the render method to pass your live WhatsApp URL
  const navLinks = baseNavLinks.map((link) => {
    if (link.label === "Order") {
      return { ...link, href: currentWhatsAppUrl, isExternal: true };
    }
    return { ...link, isExternal: false };
  });

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
          {/* Logo element */}
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
            {navLinks.map(({ label, href, isExternal }) => {
              const isActive = pathname === href;
              return (
                <li key={label}>
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
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

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCartOpen(true)}
              className="relative text-[#6B4F44] hover:text-[#E07A99] transition-colors p-1"
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
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 bg-[#E07A99] text-white text-[9px] px-1 font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            <Link
              href={currentWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center bg-[#E07A99] hover:bg-[#D4608A] text-white text-[13.5px] font-medium px-5 py-2.5 rounded-full transition-colors duration-200"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Order Now
            </Link>

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

      {/* Mobile Drawer Backdrops and Layout */}
      <div
        onClick={() => setMenuOpen(false)}
        className={`fixed inset-0 z-60 bg-[#2C1810]/20 backdrop-blur-sm transition-opacity duration-300 md:hidden ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-hidden="true"
      />
      <aside
        className={`fixed top-0 right-0 z-70 h-full w-70 bg-[#FFFAF8] shadow-xl flex flex-col transition-transform duration-300 ease-in-out md:hidden ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
        aria-label="Mobile navigation"
      >
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
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {navLinks.map(({ label, href, isExternal }) => (
            <Link
              key={label}
              href={href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-[15px] transition-colors ${pathname === href ? "bg-[#FDE8EE] text-[#E07A99] font-medium" : "text-[#6B4F44] hover:bg-[#FDF3F6] font-normal"}`}
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-6 py-6 border-t border-[#F2E0DA]">
          <Link
            href={currentWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="flex items-center justify-center w-full bg-[#E07A99] text-white text-[14px] font-medium py-3 rounded-full"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Order Now
          </Link>
        </div>
      </aside>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        whatsAppNumber={whatsappNumber}
      />
    </>
  );
}
