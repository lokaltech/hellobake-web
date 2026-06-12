// components/menu/CartDrawer.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  whatsAppNumber: string;
}

export default function CartDrawer({
  isOpen,
  onClose,
  whatsAppNumber,
}: CartDrawerProps) {
  const pathname = usePathname();
  const { cart, cartCount, removeFromCart, clearCart } = useCart();

  // Calculate Subtotal dynamically
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {/* Drawer Backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-60 bg-[#2C1810]/30 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      />

      {/* Cart Container Slider */}
      <aside
        className={`fixed top-0 right-0 z-70 h-full w-full max-w-sm bg-[#FFFAF8] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Shopping Cart Overlay"
      >
        {/* Cart Header */}
        <div className="flex items-center justify-between px-6 h-17 border-b border-[#F2E0DA] bg-white">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛒</span>
            <h2
              className="text-[17px] font-bold text-[#2C1810]"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Your Sweet Cart ({cartCount})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#FDE8EE] transition-colors text-[#6B4F44]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Live Items Listing Area */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-3.5 bg-white border border-[#F2E0DA] p-3 rounded-2xl shadow-xs relative group"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#FDE8EE]/40 shrink-0">
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 pr-6">
                  <h4
                    className="text-[13.5px] font-bold text-[#2C1810] truncate"
                    style={{ fontFamily: "var(--font-playfair)" }}
                  >
                    {item.name}
                  </h4>
                  <p
                    className="text-[11px] text-[#6B4F44] mt-0.5"
                    style={{ fontFamily: "var(--font-dm-sans)" }}
                  >
                    Qty:{" "}
                    <span className="font-semibold text-[#2C1810]">
                      {item.quantity}
                    </span>
                  </p>
                  <p className="text-[12px] font-semibold text-[#E07A99] mt-1">
                    Rp {((item.price * item.quantity) / 1000).toLocaleString()}k
                  </p>
                </div>

                {/* Remove button element */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="absolute right-3 top-3 text-[#C8B4AC] hover:text-red-500 transition-colors p-1"
                  aria-label="Remove item"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))
          ) : (
            /* Empty State Layout */
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 gap-3 my-auto">
              <span className="text-4xl animate-bounce duration-1000">🧁</span>
              <h3
                className="text-base font-bold text-[#2C1810]"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                Your cart is empty
              </h3>
              <p
                className="text-xs text-[#6B4F44] max-w-50"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Looks like you haven't added any baked goods yet!
              </p>
              <button
                onClick={() => {
                  onClose();
                  pathname !== "/menu" && window.location.assign("/menu");
                }}
                className="mt-2 text-xs font-semibold text-[#E07A99] border border-[#E07A99]/30 bg-[#FDE8EE]/40 px-4 py-2 rounded-full hover:bg-[#FDE8EE] transition-colors"
              >
                Browse Our Menu
              </button>
            </div>
          )}
        </div>

        {/* Sticky Drawer Checkout Summary Footer */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-[#F2E0DA] bg-white flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[#6B4F44]">Subtotal</span>
              <span className="font-bold text-[#2C1810] text-[16px]">
                Rp {(cartSubtotal / 1000).toLocaleString()}k
              </span>
            </div>

            <div className="flex flex-col gap-2">
              {/* 🟢 CHANGED: Intercept with interactive click handler instead of a Link page route */}
              <button
                onClick={() => {
                  onClose();
                  window.open(
                    getWhatsAppOrderLink(cart, whatsAppNumber), // Pass the cart and WhatsApp number to generate the link
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
                className="flex items-center justify-center w-full bg-[#E07A99] hover:bg-[#D4608A] text-white text-[13.5px] font-medium py-3 rounded-xl transition-colors duration-200 shadow-sm"
                style={{ fontFamily: "var(--font-dm-sans)" }}
              >
                Proceed to Checkout →
              </button>

              <button
                onClick={clearCart}
                className="text-[11px] font-medium text-[#B08A80] hover:text-red-500 transition-colors py-1"
              >
                Clear All Items
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
