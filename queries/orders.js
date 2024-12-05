"use server";
import { replaceMongoIdInData } from "@/lib/convertData";
import { Category } from "@/models/category-model";
import { FoodItem } from "@/models/foodItem-model";
import { Order } from "@/models/order-model";
import { Restaurant } from "@/models/restaurant-model";
import { User } from "@/models/user-model";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";

export const overviewDataFromOrder = unstable_cache(
  async () => {
    try {
      const response = await Order.find({})
        .sort({ placed_at: -1 })
        .populate({
          path: "user_id",
          model: User,
          select: "name email profilePicture phone",
        })
        .populate({
          path: "restaurant_id",
          model: Restaurant,
          select: "name delivery_charge",
        })
        .populate({
          path: "items.food_item_id",
          model: FoodItem,
          select: "name price ",
        })
        .lean();
      const orders = replaceMongoIdInData(response);

      // calculate completed  or delivered order
      const completedOrders = orders.filter(
        (order) => order?.order_status === "delivered"
      );

      // calculate total price for all delivered order
      const totalPrice = completedOrders.reduce((total, item) => {
        return (total += item?.total_price);
      }, 0);

      // calculate total price of past 1 week for all delivered order
      const sevenDaysAgo = dayjs().subtract(7, "day").toDate();
      const totalPricePast7Days = orders
        .filter(
          (order) =>
            order?.order_status === "delivered" &&
            new Date(order?.placed_at) >= sevenDaysAgo
        )
        .reduce((total, item) => total + item?.total_price, 0);

      // calculate total price of past 1 year for all delivered order
      const oneYearAgo = dayjs().subtract(1, "year").toDate();
      const totalPricePastYear = orders
        .filter(
          (order) =>
            order?.order_status === "delivered" &&
            new Date(order?.placed_at) >= oneYearAgo
        )
        .reduce((total, item) => total + item?.total_price, 0);

      // calculate total food item sales from delivered order
      const totalSales = completedOrders.reduce((total, order) => {
        const orderQuantity = order?.items.reduce(
          (sum, item) => sum + item?.quantity,
          0
        );
        return total + orderQuantity;
      }, 0);

      // calculate active or pending order
      const activeOrder = orders.filter(
        (order) => order?.order_status === "pending"
      );

      return {
        orders,
        totalPrice,
        totalSales,
        totalPricePast7Days,
        totalPricePastYear,
        activeOrder,
        completedOrders,
      };
    } catch (error) {
      console.log(error);
      throw new Error("failed to generate overview data from order");
    }
  },
  ["orders"],
  { tags: ["orders"] }
);

export const getAllOrderByUserId = unstable_cache(
  async (userId) => {
    try {
      const orders = await Order.find({ user_id: userId })
        .populate({
          path: "restaurant_id",
          model: Restaurant,
          select: "name thumbnail",
        })
        .populate({
          path: "items.food_item_id",
          model: FoodItem,
          populate: {
            path: "category",
            model: Category,
            select: "name",
          },
        })
        .sort({ placed_at: "desc" })
        .lean();
      if (!orders) {
        throw new Error("error occured when fetch orders");
      }

      return replaceMongoIdInData(orders);
    } catch (error) {
      throw new Error(error.message || "failed to fetch orders");
    }
  },
  ["orders"],
  { tags: ["orders"] }
);

export const getAllOrder = unstable_cache(
  async () => {
    try {
      const orders = await Order.find({}).lean();
      return replaceMongoIdInData(orders);
    } catch (error) {
      console.log(error.message);
      throw new Error(error?.message || "failed to get order");
    }
  },
  ["orders"],
  { tags: ["orders"] }
);

export async function checkIfOrderExists(paymentId) {
  try {
    const response = await Order.findOne({ paymentId }).lean();
    return replaceMongoIdInData(response);
  } catch (error) {
    throw new Error(error.message);
  }
}
