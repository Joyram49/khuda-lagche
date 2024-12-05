"use server";
import { replaceMongoIdInData } from "@/lib/convertData";
import { Cart } from "@/models/cart-model";
import { FoodItem } from "@/models/foodItem-model";
import { Restaurant } from "@/models/restaurant-model";
import { unstable_cache } from "next/cache";

export const getCartItemByCartId = unstable_cache(
  async (cartId) => {
    try {
      const cart = await Cart.findOne({ cartId })
        .populate({
          path: "items",
          model: FoodItem,
          populate: {
            path: "food_item_id",
            model: FoodItem,
          },
        })
        .populate({
          path: "restaurant",
          modal: Restaurant,
          select: "delivery_charge",
        })
        .lean();
      if (!cart || !cart.items || cart.items.length === 0) {
        return [];
      }
      const response = replaceMongoIdInData(cart);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  },
  ["cartItems"],
  { tags: ["cartItems"] }
);

export const getCartItemById = async (id) => {
  try {
    const cart = await Cart.findById(id)
      .populate({
        path: "items",
        model: FoodItem,
        populate: {
          path: "food_item_id",
          model: FoodItem,
        },
      })
      .populate({
        path: "restaurant",
        modal: Restaurant,
        select: "name delivery_charge ",
      })
      .lean();
    if (!cart || !cart.items || cart.items.length === 0) {
      return [];
    }
    const response = replaceMongoIdInData(cart);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};
