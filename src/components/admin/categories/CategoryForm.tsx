// src/components/admin/categories/CategoryForm.tsx
"use client";

import { useState } from "react";
import { Category } from "@prisma/client";

interface CategoryFormProps {
  initialData?: Category | null;
  onSubmit: (
    formData: FormData,
  ) => Promise<{ error?: string; success?: boolean }>;
  submitButtonText: string;
}

export default function CategoryForm({
  initialData,
  onSubmit,
  submitButtonText,
}: CategoryFormProps) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget);

    try {
      const result = await onSubmit(formData);
      if (result?.error) {
        setErrorMsg(result.error);
      }
    } catch (error) {
      setErrorMsg("A critical error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white border border-[#F2E0DA] rounded-2xl p-8 shadow-sm">
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
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase">
            Category Name
          </label>
          <input
            name="name"
            required
            defaultValue={initialData?.name || ""}
            className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-sm text-[#2C1810] placeholder:text-[#C8B4AC] focus:outline-none focus:border-[#E07A99]"
            placeholder="e.g. Signature Cakes"
          />
          <p
            className="text-xs text-[#B08A80] mt-1"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            The URL slug will be generated automatically.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full md:w-auto self-start bg-[#E07A99] hover:bg-[#D4608A] disabled:bg-[#E07A99]/50 text-white text-[14px] font-medium px-8 py-3.5 rounded-full transition-colors flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            submitButtonText
          )}
        </button>
      </form>
    </div>
  );
}
