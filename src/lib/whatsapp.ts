// lib/whatsapp.ts
import { CartItem } from "@/context/CartContext";

export function getWhatsAppOrderLink(cartItems: CartItem[]): string {
  // const ADMIN_PHONE = "6281290298121";
  const ADMIN_PHONE = "6285710338981";

  const emoCook = "\u{1F469}\u{200D}\u{1F373}"; // 👩‍🍳
  const emoSpar = "\u{2728}"; // ✨
  const emoHeart = "\u{2764}\u{FE0F}"; // ❤️
  const emoCake = "\u{1F370}"; // 🍰

  // Case A: Cart is empty -> Generate a warm, friendly default message
  if (!cartItems || cartItems.length === 0) {
    const defaultText =
      "Hi HelloBake! 👩‍🍳 I'm looking at your menu today and would love to know what fresh pastries you have available!";

    // 🟢 CHANGED: Using direct api.whatsapp.com endpoint
    return `https://api.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(defaultText)}`;
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

  // 🟢 CHANGED: Using direct api.whatsapp.com endpoint to preserve emoji bytes
  return `https://api.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(message)}`;
}

export function getWhatsAppContactLink(
  name: string,
  type: string,
  message: string,
): string {
  const ADMIN_PHONE = "6285710338981"; // Your WhatsApp Number

  // Emojis
  const emoWave = "\u{1F44B}"; // 👋
  const emoPin = "\u{1F4CC}"; // 📌
  const emoMsg = "\u{1F4AC}"; // 💬

  let text = `Hi HelloBake! ${emoWave}\n\n`;
  text += `My name is *${name}*.\n\n`;
  text += `${emoPin} *Inquiry Type:* ${type}\n`;
  text += `${emoMsg} *Message:*\n${message}\n`;

  return `https://api.whatsapp.com/send?phone=${ADMIN_PHONE}&text=${encodeURIComponent(text)}`;
}
