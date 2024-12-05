"use server";

import { replaceMongoIdInData } from "@/lib/convertData";
import { FoodItem } from "@/models/foodItem-model";
import { FoodItemReview } from "@/models/foodReview-model";
import { Restaurant } from "@/models/restaurant-model";
import { RestaurantReview } from "@/models/restaurantReview-model";
import { unstable_cache } from "next/cache";

export const getReviewsByUserId = unstable_cache(
  async (userId) => {
    try {
      const foodReviews = await FoodItemReview.find({ user_id: userId })
        .populate({
          path: "fooditem_id",
          model: FoodItem,
          select: "name image_url",
        })
        .lean();

      const restaurantReviews = await RestaurantReview.find({
        user_id: userId,
      })
        .populate({
          path: "restaurant_id",
          model: Restaurant,
          select: "name imageUrl",
        })
        .lean();

      const allReviews = [...foodReviews, ...restaurantReviews];
      allReviews.map((review) => {
        if (review.restaurant_id) {
          review.type = "restaurant";
        } else if (review.fooditem_id) {
          review.type = "food";
        }
      });
      return replaceMongoIdInData(allReviews);
    } catch (error) {
      throw new Error(error?.message || "failed to get reviews");
    }
  },
  ["reviews"],
  { tags: ["reviews"] }
);
