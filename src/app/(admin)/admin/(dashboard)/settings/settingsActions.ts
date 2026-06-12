"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateSettingsAction(formData: FormData) {
  try {
    let whatsappNumber = formData.get("whatsappNumber") as string;
    const instagramUrl = (formData.get("instagramUrl") as string) || null;
    const tiktokUrl = (formData.get("tiktokUrl") as string) || null;

    whatsappNumber = whatsappNumber.replace(/[^0-9]/g, "");

    if (!whatsappNumber) {
      return { error: "WhatsApp number is required." };
    }

    // Force it to use the "default" row ID
    await prisma.storeSettings.upsert({
      where: { id: "default" },
      update: {
        whatsappNumber,
        instagramUrl,
        tiktokUrl,
      },
      create: {
        id: "default",
        whatsappNumber,
        instagramUrl,
        tiktokUrl,
      },
    });

    revalidatePath("/");

    return { success: true };
  } catch (error) {
    console.error("Failed to update settings:", error);
    return { error: "Something went wrong while saving settings." };
  }
}
