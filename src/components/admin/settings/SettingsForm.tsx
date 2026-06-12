"use client";

import { useTransition, useState } from "react";
import { updateSettingsAction } from "@/app/(admin)/admin/(dashboard)/settings/settingsActions";

interface SettingsFormProps {
  initialData: {
    whatsappNumber: string;
    instagramUrl: string | null;
    tiktokUrl: string | null;
  } | null;
}

export default function SettingsForm({ initialData }: SettingsFormProps) {
  const [isPending, startTransition] = useTransition();
  const [status, setStatus] = useState<{
    type: "success" | "error";
    msg: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await updateSettingsAction(formData);

      if (result?.error) {
        setStatus({ type: "error", msg: result.error });
      } else {
        setStatus({
          type: "success",
          msg: "Store configurations saved successfully! ✨",
        });
        // Clear message after 3 seconds
        setTimeout(() => setStatus(null), 3000);
      }
    });
  };

  return (
    <div className="bg-white border border-[#F2E0DA] rounded-2xl p-6 md:p-8 shadow-sm max-w-2xl">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 text-sm text-[#2C1810]"
        style={{ fontFamily: "var(--font-dm-sans)" }}
      >
        {/* Status Messaging banner */}
        {status && (
          <div
            className={`p-4 rounded-xl font-medium ${status.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
          >
            {status.msg}
          </div>
        )}

        {/* WhatsApp Setup */}
        <div className="flex flex-col gap-2">
          <label htmlFor="whatsappNumber" className="font-bold">
            Primary Order WhatsApp Number
          </label>
          <p className="text-xs text-[#6B4F44] -mt-1">
            Include country code without spaces or symbols (e.g.,{" "}
            <span className="font-mono">6285121118121</span> for Indonesia).
          </p>
          <input
            type="text"
            id="whatsappNumber"
            name="whatsappNumber"
            required
            defaultValue={initialData?.whatsappNumber || "6285121118121"}
            placeholder="628xxxxxxxxxx"
            className="px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99]"
          />
        </div>

        {/* Instagram Setup */}
        <div className="flex flex-col gap-2">
          <label htmlFor="instagramUrl" className="font-bold">
            Instagram Profile Link
          </label>
          <input
            type="url"
            id="instagramUrl"
            name="instagramUrl"
            defaultValue={initialData?.instagramUrl || ""}
            placeholder="https://instagram.com/your-username"
            className="px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99]"
          />
        </div>

        {/* TikTok Setup */}
        <div className="flex flex-col gap-2">
          <label htmlFor="tiktokUrl" className="font-bold">
            TikTok Profile Link
          </label>
          <input
            type="url"
            id="tiktokUrl"
            name="tiktokUrl"
            defaultValue={initialData?.tiktokUrl || ""}
            placeholder="https://tiktok.com/@your-username"
            className="px-4 py-3 bg-[#FFFAF8] border border-[#F2E0DA] rounded-xl focus:outline-none focus:border-[#E07A99]"
          />
        </div>

        {/* Submit Operations */}
        <button
          type="submit"
          disabled={isPending}
          className="mt-2 bg-[#E07A99] hover:bg-[#D4608A] text-white font-medium py-3.5 rounded-xl transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-[15px]"
        >
          {isPending ? "Saving changes..." : "Save Settings"}
        </button>
      </form>
    </div>
  );
}
