// src/app/(admin)/admin/(dashboard)/categories/actions.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Helper to turn "Classic Cakes" into "classic-cakes"
function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-"); // Replace multiple - with single -
}

export async function createCategoryAction(formData: FormData) {
  try {
    const name = formData.get("name") as string;
    if (!name) return { error: "Category name is required." };

    const slug = slugify(name);

    // Check if it already exists to prevent crashes
    const existing = await prisma.category.findUnique({ where: { slug } });
    if (existing)
      return { error: "A category with a similar name already exists." };

    await prisma.category.create({
      data: { name, slug },
    });

    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { error: "Failed to create category." };
  }
}

export async function deleteCategoryAction(id: string) {
  try {
    await prisma.category.delete({ where: { id } });
    revalidatePath("/admin/categories");
    return { success: true };
  } catch (err: any) {
    if (err.code === "P2003") {
      return {
        error:
          "Cannot delete this category because it contains active products. Please delete or reassign those products first.",
      };
    }
    return { error: "Failed to delete category." };
  }
}
