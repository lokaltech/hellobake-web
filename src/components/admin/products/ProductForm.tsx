// src/components/admin/products/ProductForm.tsx
"use client";

import { useState } from "react";
import { Product } from "@prisma/client";

interface ProductFormProps {
  initialData?: Product | null;
  onSubmit: (
    formData: FormData,
  ) => Promise<{ error?: string; success?: boolean }>;
  submitButtonText: string;
}

export default function ProductForm({
  initialData,
  onSubmit,
  submitButtonText,
}: ProductFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string>(
    initialData?.thumbnail || "",
  );
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Handle local image preview generation
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary local URL to preview the image instantly
      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
    }
  };

  const removeImage = () => {
    setPreviewUrl("");
    // We don't strictly need to clear the file input value here because
    // if previewUrl is empty, we will block the form submission anyway.
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);

    if (!previewUrl) {
      setErrorMsg("Please attach a product image first!");
      setLoading(false);
      return;
    }

    try {
      const result = await onSubmit(formData);

      // If the server action kicked back an error string, display it
      if (result?.error) {
        setErrorMsg(result.error);
      }
    } catch (error) {
      console.error("Form submission failed:", error);
      setErrorMsg("A critical error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-[#F2E0DA] rounded-2xl p-8 shadow-sm">
      {/* Alert Banner for Errors */}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#DC2626"
            strokeWidth="2"
            strokeLinecap="round"
            className="mt-0.5 shrink-0"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <p
            className="text-[13px] text-red-700 font-medium leading-tight"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {errorMsg}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Image Upload Zone */}
        <div className="flex flex-col gap-2">
          <label
            className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Product Image
          </label>
          {previewUrl ? (
            <div className="relative w-48 h-48 rounded-xl overflow-hidden border border-[#F2E0DA]">
              <img
                src={previewUrl}
                alt="Preview"
                className="object-cover w-full h-full"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-lg text-red-500 hover:bg-white shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          ) : (
            <label className="border-2 border-dashed border-[#F2E0DA] rounded-xl p-6 hover:bg-[#FAF6F4] transition-colors relative cursor-pointer flex flex-col items-center justify-center text-center min-h-37.5">
              <input
                type="file"
                name="image"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
              <div className="flex items-center justify-center size-10 bg-[#FDE8EE] rounded-full mb-3 text-[#E07A99]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <span className="text-[#E07A99] hover:text-[#D4608A] text-sm font-medium transition-colors">
                Click to browse files
              </span>
              <span className="text-xs text-[#B08A80] mt-1">
                SVG, PNG, JPG or GIF (max. 4MB)
              </span>
            </label>
          )}
        </div>

        {/* Form Fields Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
              Product Name
            </label>
            <input
              name="name"
              required
              defaultValue={initialData?.name || ""}
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
              placeholder="e.g. Classic Vanilla Cake"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
              Price (IDR)
            </label>
            <input
              name="price"
              type="number"
              required
              defaultValue={initialData?.price || ""}
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
              placeholder="e.g. 280000"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
              Category
            </label>
            <select
              name="category"
              defaultValue={initialData?.category || "Pastries"}
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
            >
              <option value="Cakes">Cakes</option>
              <option value="Pastries">Pastries</option>
              <option value="Tarts">Tarts</option>
              <option value="Specials">Specials</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
              Promo Badge (Optional)
            </label>
            <input
              name="badge"
              defaultValue={initialData?.badge || ""}
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
              placeholder="e.g. Bestseller, New"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
            Description
          </label>
          <textarea
            name="description"
            required
            rows={3}
            defaultValue={initialData?.description || ""}
            className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
            placeholder="Describe the flavors and ingredients..."
          />
        </div>

        {/* Toggles */}
        <div className="flex gap-6 border-t border-[#F2E0DA] pt-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={initialData ? initialData.isActive : true}
              className="size-4 rounded border-[#F2E0DA] text-[#E07A99] focus:ring-[#E07A99]"
            />
            <span className="text-sm font-medium text-[#2C1810]">
              Live on Site
            </span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              name="isFeatured"
              defaultChecked={initialData ? initialData.isFeatured : false}
              className="size-4 rounded border-[#F2E0DA] text-[#E07A99] focus:ring-[#E07A99]"
            />
            <span className="text-sm font-medium text-[#2C1810]">
              Feature on Homepage
            </span>
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !previewUrl}
          className="w-full md:w-auto self-end mt-4 bg-[#E07A99] hover:bg-[#D4608A] disabled:bg-[#E07A99]/50 text-white text-[14px] font-medium px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Uploading & Saving...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </form>
    </div>
  );
}
