"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export async function createProductAction(formData: FormData) {
  try {
    const file = formData.get("image") as File;
    let thumbnailUrl = "";

    // 1. Validate the file presence
    if (!file || file.size === 0) {
      return { error: "Please attach a product image before publishing." };
    }

    // 2. Upload the file to UploadThing
    const uploadResult = await utapi.uploadFiles(file);

    if (uploadResult.error) {
      return { error: `Image upload failed: ${uploadResult.error.message}` };
    }

    // Grab the secure URL returned by UploadThing
    thumbnailUrl = uploadResult.data.url;

    // 3. Save to Prisma
    await prisma.product.create({
      data: {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseInt(formData.get("price") as string),
        categoryId: formData.get("categoryId") as string,        
        badge: (formData.get("badge") as string) || null,
        isActive: formData.get("isActive") === "on",
        isFeatured: formData.get("isFeatured") === "on",
        thumbnail: thumbnailUrl,
      },
    });

    // 4. Clear cache and return success
    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { error: err.message || "An unexpected database error occurred." };
  }
}

export async function deleteProductAction(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { thumbnail: true },
    });

    if (product?.thumbnail) {
      try {
        const fileKey = product.thumbnail.split("/").pop();
        
        if (fileKey) {
          await utapi.deleteFiles(fileKey);
          console.log(`Successfully deleted product asset: ${fileKey}`);
        }
      } catch (deleteError) {
        console.error("Failed to delete file from UploadThing:", deleteError);
      }
    }

    await prisma.product.delete({ 
      where: { id } 
    });

    revalidatePath("/admin/products");
    
    return { success: true };
  } catch (err: any) {
    console.error("Delete Action Error:", err);
    return { error: err.message || "An unexpected database error occurred." };
  }
}

export async function updateProductAction(id: string, formData: FormData) {
  try {
    const file = formData.get("image") as File;
    
    const updateData: any = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseInt(formData.get("price") as string),
      categoryId: formData.get("categoryId") as string,
      badge: (formData.get("badge") as string) || null,
      isActive: formData.get("isActive") === "on",
      isFeatured: formData.get("isFeatured") === "on",
    };

    if (file && file.size > 0) {
      const currentProduct = await prisma.product.findUnique({
        where: { id },
        select: { thumbnail: true },
      });

      const uploadResult = await utapi.uploadFiles(file);

      if (uploadResult.error) {
        return { error: `Image upload failed: ${uploadResult.error.message}` };
      }
      
      updateData.thumbnail = uploadResult.data.url;

      if (currentProduct?.thumbnail) {
        try {
          const fileKey = currentProduct.thumbnail.split("/").pop();
          
          if (fileKey) {
            await utapi.deleteFiles(fileKey);
            console.log(`Successfully deleted old asset: ${fileKey}`);
          }
        } catch (deleteError) {
          console.error("Failed to delete old image from UploadThing:", deleteError);
        }
      }
    }

    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (err: any) {
    console.error("Action Error:", err);
    return { error: err.message || "An unexpected database error occurred." };
  }
}