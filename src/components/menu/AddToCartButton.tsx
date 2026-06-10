// components/menu/AddToCartButton.tsx
"use client";

import { useCart } from "@/context/CartContext";

interface AddToCartButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    thumbnail: string;
  };
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { cart, addToCart, updateQuantity } = useCart();

  // Find if this specific product is currently sitting inside the global cart
  const cartItem = cart.find((item) => item.id === product.id);
  const currentQuantity = cartItem ? cartItem.quantity : 0;

  const handleInitialAdd = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      thumbnail: product.thumbnail,
    });
  };

  // State A: Item is not in cart yet -> Show default elegant "Add to Cart" button
  if (currentQuantity === 0) {
    return (
      <button
        onClick={handleInitialAdd}
        className="text-[12px] font-semibold border border-[#F2E0DA] text-[#2C1810] py-2 rounded-xl bg-white hover:bg-[#FFFAF8] hover:border-[#E07A99] transition-all w-full h-9.5"
      >
        Add to Cart
      </button>
    );
  }

  // State B: Item is in cart -> Show interactive Plus/Minus Counter row
  return (
    <div className="flex items-center justify-between border border-[#E07A99] bg-[#FDE8EE]/20 rounded-xl w-full h-9.5 overflow-hidden transition-all duration-200">
      <button
        onClick={() => updateQuantity(product.id, currentQuantity - 1)}
        className="px-3 h-full text-[#E07A99] hover:bg-[#FDE8EE] active:scale-95 transition-all font-bold text-sm flex items-center justify-center select-none"
        aria-label="Decrease quantity"
      >
        −
      </button>

      <span
        className="font-bold text-[#2C1810] text-[13px] text-center min-w-5"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {currentQuantity}
      </span>

      <button
        onClick={() => updateQuantity(product.id, currentQuantity + 1)}
        className="px-3 h-full text-[#E07A99] hover:bg-[#FDE8EE] active:scale-95 transition-all font-bold text-sm flex items-center justify-center select-none"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
