"use server";

import { Cart } from "@/models/cart-model";
import { FoodItem } from "@/models/foodItem-model";
import { FoodItemReview } from "@/models/foodReview-model";
import { Order } from "@/models/order-model";
import { revalidateTag } from "next/cache";

export async function addFood(data) {
  try {
    const response = await FoodItem.create(data);
    if (!response?._id) {
      throw new Error("failed to add new item");
    }
    revalidateTag("foodByRestaurant");
    return { status: 201, message: `${response?.name} successfully added!` };
  } catch (error) {
    throw new Error(
      error.message || "server error: failed to add new food item "
    );
  }
}

export async function editFoodById(data) {
  const { foodId, requestData } = data || {};
  try {
    const response = await FoodItem.findByIdAndUpdate(foodId, requestData, {
      new: true,
    });
    if (!response?._id) {
      throw new Error(`failed to update the ${requestData.name}`);
    }
    revalidateTag("foodByRestaurant");
    return { status: 200, message: `${response?.name} updated successfully"` };
  } catch (error) {
    throw new Error(
      error.message || "server error: failed to update the food items "
    );
  }
}

export async function deleteFoodById(foodId) {
  try {
    const response = await FoodItem.findByIdAndDelete(foodId);

    if (!response?._id) {
      throw new Error("failed to add new item");
    }
    await FoodItemReview.deleteMany({ fooditem_id: foodId });
    await Order.updateMany(
      { "items.food_item_id": foodId },
      { $pull: { items: { food_item_id: foodId } } }
    );

    await Cart.updateMany(
      { "items.food_item_id": foodId },
      { $pull: { items: { food_item_id: foodId } } }
    );
    revalidateTag("foodByRestaurant");
    revalidateTag("cartItems");
    return { status: 200, message: "food item successfully deleted" };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message || "failed to delete foodItem");
  }
}
