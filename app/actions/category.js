"use server";
import { Category } from "@/models/category-model";
import { revalidateTag } from "next/cache";

export async function addNewCategory(data) {
  try {
    const newCategory = await Category.create(data);
    if (newCategory?._id) {
      revalidateTag("category");
      return {
        status: 201,
        message: `${newCategory?.name} successfully added to the category list`,
      };
    }
  } catch (error) {
    throw new Error(error.message || "failed to add category");
  }
}
