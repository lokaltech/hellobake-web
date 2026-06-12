// src/app/(admin)/admin/(dashboard)/settings/page.tsx
import { prisma } from "@/lib/prisma";
import SettingsForm from "@/components/admin/settings/SettingsForm";

export const revalidate = 0;

export default async function AdminSettingsPage() {
  const settings = await prisma.storeSettings.findUnique({
    where: { id: "default" },
  });

  return (
    <div className="flex flex-col gap-8">
      {/* Header Panel */}
      <div>
        <h1
          className="text-3xl font-bold text-[#2C1810]"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Store Configurations
        </h1>
        <p
          className="text-sm text-[#6B4F44]"
          style={{ fontFamily: "var(--font-dm-sans)" }}
        >
          Manage contact coordinates, social platform footprints, and central
          WhatsApp target routers for HelloBake.
        </p>
      </div>

      {/* Form Workspace */}
      <SettingsForm initialData={settings} />
    </div>
  );
}
