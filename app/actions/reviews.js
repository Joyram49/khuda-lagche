"use server";

import { FoodItemReview } from "@/models/foodReview-model";
import { RestaurantReview } from "@/models/restaurantReview-model";
import { revalidateTag } from "next/cache";

export async function addFoodReview(data) {
  try {
    const review = await FoodItemReview.create(data);
    const response = {
      id: review?._id.toString(),
      rating: review?.rating,
      comment: review?.comment,
    };
    revalidateTag("foods");
    revalidateTag("reviews");
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "failed to add review");
  }
}
export async function addRestaurantReview(data) {
  try {
    const review = await RestaurantReview.create(data);
    const response = {
      id: review?._id.toString(),
      rating: review?.rating,
      comment: review?.comment,
    };
    revalidateTag("restaurants");
    revalidateTag("reviews");
    revalidateTag("restaurant");

    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "failed to add review");
  }
}
