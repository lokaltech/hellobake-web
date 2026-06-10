// components/contact/ContactForm.tsx
"use client";

import { useState } from "react";
import { getWhatsAppContactLink } from "@/lib/whatsapp";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    type: "General Question",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate the URL based on state
    const targetUrl = getWhatsAppContactLink(
      formData.name,
      formData.type,
      formData.message,
    );

    // Open WhatsApp in a new tab securely
    window.open(targetUrl, "_blank", "noopener,noreferrer");

    // Optional: clear the form after sending
    setFormData({ name: "", type: "General Question", message: "" });
  };

  return (
    <div className="bg-white border border-[#F2E0DA] rounded-3xl p-8 md:p-10 shadow-sm">
      <h2
        className="text-2xl font-bold text-[#2C1810] mb-6"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Send us a Message
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 text-sm"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {/* Name Input */}
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="font-semibold text-[#2C1810]">
            Your Name <span className="text-[#E07A99]">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Jane Doe"
            className="px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99] transition-colors"
          />
        </div>

        {/* Inquiry Type Dropdown */}
        <div className="flex flex-col gap-2">
          <label htmlFor="type" className="font-semibold text-[#2C1810]">
            What is this regarding? <span className="text-[#E07A99]">*</span>
          </label>
          <div className="relative">
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99] appearance-none transition-colors"
            >
              <option value="General Question">General Question</option>
              <option value="Custom Cake Order">Custom Cake Order</option>
              <option value="Event Catering">Event Catering</option>
              <option value="Feedback">Feedback / Suggestions</option>
            </select>
            {/* Custom dropdown arrow for better aesthetics */}
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B4F44]">
              ▼
            </div>
          </div>
        </div>

        {/* Message Textarea */}
        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="font-semibold text-[#2C1810]">
            Your Message <span className="text-[#E07A99]">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us what you need..."
            className="px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99] transition-colors resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 bg-[#E07A99] hover:bg-[#D4608A] text-white font-medium py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md flex items-center justify-center gap-2"
        >
          Send via WhatsApp <span>💬</span>
        </button>
      </form>
    </div>
  );
}
