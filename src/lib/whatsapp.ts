// lib/whatsapp.ts
import { CartItem } from "@/context/CartContext";

export function getWhatsAppOrderLink(
  cartItems: CartItem[],
  adminPhone: string,
): string {
  // Case A: Cart is empty -> Generate a warm, friendly default message
  if (!cartItems || cartItems.length === 0) {
    const defaultText =
      "Hi HelloBake! 👩‍🍳 I'm looking at your menu today and would love to know what fresh pastries you have available!";

    return `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(defaultText)}`;
  }

  // Case B: Cart has goodies -> Format a clean itemized receipt
  let message = "Hi HelloBake! 👩‍🍳✨\n\nI want to order:\n";

  cartItems.forEach((item, index) => {
    const itemTotal = (item.price * item.quantity) / 1000;
    message += `${index + 1}. 🍰 ${item.quantity}x *${item.name}* (Rp ${itemTotal.toLocaleString()}k)\n`;
  });

  const grandTotal =
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) / 1000;

  message += `\n✨ *Total Price:* Rp ${grandTotal.toLocaleString()}k\n`;
  message += `\nCan you please confirm my order? Thank you! ❤️`;

  return `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(message)}`;
}

export function getWhatsAppContactLink(
  name: string,
  type: string,
  message: string,
  adminPhone: string, // Passed in dynamically now
): string {
  const emoWave = "\u{1F44B}"; // 👋
  const emoPin = "\u{1F4CC}"; // 📌
  const emoMsg = "\u{1F4AC}"; // 💬

  let text = `Hi HelloBake! ${emoWave}\n\n`;
  text += `My name is *${name}*.\n\n`;
  text += `${emoPin} *Inquiry Type:* ${type}\n`;
  text += `${emoMsg} *Message:*\n${message}\n`;

  return `https://api.whatsapp.com/send?phone=${adminPhone}&text=${encodeURIComponent(text)}`;
}
