// components/menu/InstantOrderButton.tsx
"use client";

import { useCart } from "@/context/CartContext";
import { getWhatsAppOrderLink } from "@/lib/whatsapp";

interface InstantOrderButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
}

export default function InstantOrderButton({
  product,
}: InstantOrderButtonProps) {
  const { cart, addToCart } = useCart();

  const handleInstantOrder = () => {
    // 1. Locate item or simulate updated cart structure
    const exists = cart.some((item) => item.id === product.id);
    let finalCart = [...cart];

    if (!exists) {
      const newItem = { ...product, quantity: 1 };
      finalCart.push(newItem);
      // Keep state in sync behind the scenes
      addToCart(product);
    }

    // 2. Generate custom WhatsApp receipt link and redirect user
    const targetUrl = getWhatsAppOrderLink(finalCart);
    window.open(targetUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      onClick={handleInstantOrder}
      className="text-[12px] font-semibold bg-[#E07A99] text-white py-2 rounded-xl hover:bg-[#D4608A] transition-all shadow-sm w-full h-9.5"
    >
      Order
    </button>
  );
}
