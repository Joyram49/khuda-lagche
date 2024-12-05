"use server";
import { Favourite } from "@/models/favourite-model";
import { Restaurant } from "@/models/restaurant-model";
import { revalidateTag } from "next/cache";

export async function updateFavRestaurantsByUserId(data) {
  const { userId, restaurantId } = data;
  const ids = [];
  ids.push(restaurantId);
  const organizedData = {
    user_id: userId,
    restaurant_ids: ids,
  };

  try {
    let favourite = await Favourite.findOne({ user_id: userId });
    if (!favourite) {
      const newUser = await Favourite.create(organizedData);
      const response = {
        id: newUser?._id.toString(),
        restaurant_ids: newUser?.restaurant_ids.map((id) => id.toString()),
      };
      revalidateTag("restaurants");
      return response;
    }
    const index = favourite.restaurant_ids.findIndex(
      (res) => res.toString() === restaurantId
    );
    if (index > -1) {
      favourite.restaurant_ids.splice(index, 1);
    } else {
      favourite.restaurant_ids.push(restaurantId);
    }

    const newUser = await favourite.save();
    const response = {
      id: newUser?._id.toString(),
      restaurant_ids: newUser?.restaurant_ids.map((id) => id.toString()),
    };
    revalidateTag("restaurants");
    return response;
  } catch (error) {
    console.log(error);
    throw new Error(error.messag || "failed to update favourite restaurants!");
  }
}

export async function updateRestaurantById(data) {
  const { restaurantId, requestData } = data;
  try {
    const response = await Restaurant.findByIdAndUpdate(
      restaurantId,
      requestData,
      { new: true }
    );
    if (!response?._id) {
      throw new Error(`Faild to update ${requestData.name}`);
    }
    revalidateTag("restaurant");
    return { status: 200, message: "restaurant updated successfully!" };
  } catch (error) {
    console.log(error);
    throw new Error(error?.message || "Failed to update retaurant");
  }
}

export async function addNewRestaurant(data) {
  try {
    const response = await Restaurant.create(data);
    if (!response?._id) {
      throw new Error(`Faild to update ${response?.name}`);
    }
    revalidateTag("restaurants");
    return { status: 201, message: `${response?.name} added successfully!` };
  } catch (error) {
    throw new Error(
      error?.message || "Failed to add new restaurant to the  database"
    );
  }
}

export async function emailIsUsedInRestaurant(email) {
  const isIncluded = await Restaurant.findOne({ email });
  if (isIncluded) {
    return true;
  } else {
    return false;
  }
}

export async function deleteRestaurantById(restuarant_id) {
  try {
    const response = await Restaurant.findByIdAndDelete(restuarant_id);
    if (!response) {
      throw new Error("falied to delete the restaurant");
    }
    revalidateTag("restaurants");
    return {
      status: 200,
      message: `Successfully delete the ${response?.name}`,
    };
  } catch (error) {
    throw new Error(error?.message || "Failed to delete the restaurant ");
  }
}
