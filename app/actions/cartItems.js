"use server";

import { replaceMongoIdInData } from "@/lib/convertData";
import { Cart } from "@/models/cart-model";
import { FoodItem } from "@/models/foodItem-model";
import { Restaurant } from "@/models/restaurant-model";
import { revalidateTag } from "next/cache";

export async function addFoodToCart(data) {
  const { cartId, foodItemId, restaurantId, quantity, type } = data;

  try {
    let cart = await Cart.findOne({ cartId });
    //   if there is no cart item in the collection
    if (!cart && type === "plus") {
      cart = await Cart.create({
        cartId,
        restaurant: restaurantId,
        items: [{ food_item_id: foodItemId, quantity }],
      });
      return cart;
    }

    // reset data

    // update existing cart
    if (cart.restaurant.toString() === restaurantId) {
      const itemIndex = cart?.items.findIndex(
        (item) => item.food_item_id.toString() === foodItemId
      );
      if (itemIndex > -1) {
        if (type === "plus") {
          cart.items[itemIndex].quantity += quantity;
        } else if (type === "minus") {
          cart.items[itemIndex].quantity -= quantity;

          if (cart.items[itemIndex].quantity <= 0) {
            cart.items.splice(itemIndex, 1);
          }
        }
      } else if (type === "plus") {
        cart.items.push({ food_item_id: foodItemId, quantity });
      }
    } else {
      cart.items = [{ food_item_id: foodItemId, quantity }];
      cart.restaurant = restaurantId;
    }

    await cart.save();

    // Retrieve the updated cart with populate and lean
    const populatedData = await Cart.findById(cart._id)
      .populate({
        path: "items.food_item_id",
        model: FoodItem,
      })
      .populate({
        path: "restaurant",
        model: Restaurant,
        select: "delivery_charge",
      })
      .lean();

    // Replace MongoDB ObjectId with strings
    const foodCart = replaceMongoIdInData(populatedData);

    revalidateTag("cartItems");
    return {
      message: "Successfully updated the cart",
      status: 202,
      cartData: foodCart, // Return the transformed data
    };
  } catch (error) {
    throw new Error(error.message || "failed to update cart");
  }
}

export async function resetToEmptyCart(cartId) {
  try {
    const cart = await Cart.findOne({ cartId });
    if (cart) {
      await Cart.updateOne({ cartId }, { $set: { items: [] } });
      revalidateTag("cartItems");
      return { success: true, message: "Cart items have been cleared." };
    } else {
      return { success: false, message: "Cart not found." };
    }
  } catch (error) {
    return { success: false, message: error.message };
  }
}
