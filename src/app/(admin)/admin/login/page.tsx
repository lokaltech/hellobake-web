// app/(admin)/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginAction } from "./loginActions";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    } else if (result?.success) {
      router.refresh();
      router.push("/admin");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFFAF8] px-6">
      <div className="w-full max-w-md bg-white border border-[#F2E0DA] rounded-3xl p-8 shadow-sm">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex size-12 rounded-full bg-[#FDE8EE] items-center justify-center text-xl mb-4">
            🎂
          </div>
          <h1
            className="text-2xl font-bold text-[#2C1810] mb-2"
            style={{ fontFamily: "var(--font-playfair)" }}
          >
            Hello<span className="text-[#E07A99]">Bake</span> Admin
          </h1>
          <p
            className="text-sm text-[#6B4F44]"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            Sign in to access your business dashboard.
          </p>
        </div>

        {/* Error Alert Wrapper */}
        {error && (
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
              {error}
            </p>
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder="owner@hellobake.com"
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-[#2C1810] text-sm placeholder-[#B08A80] focus:outline-none focus:border-[#E07A99] transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="password"
              className="text-xs font-semibold text-[#2C1810] tracking-wide uppercase"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl text-[#2C1810] text-sm placeholder-[#B08A80] focus:outline-none focus:border-[#E07A99] transition-colors"
              style={{ fontFamily: "var(--font-dm-sans)" }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 bg-[#E07A99] hover:bg-[#D4608A] disabled:bg-[#E07A99]/50 text-white text-[14px] font-medium py-3.5 rounded-full transition-colors duration-200 flex items-center justify-center gap-2"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            {loading ? (
              <span className="inline-block size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Sign In to Dashboard"
            )}
          </button>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 w-full border border-[#F2E0DA] hover:border-[#E07A99] text-[#6B4F44] hover:text-[#E07A99] text-[13px] font-medium py-2.5 rounded-xl transition-colors"
            style={{ fontFamily: "var(--font-dm-sans)" }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
            View Live Site
          </Link>
        </form>
      </div>
    </div>
  );
}
