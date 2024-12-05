"use server";

import { Order } from "@/models/order-model";
import { revalidateTag } from "next/cache";

export async function addOrder(data) {
  try {
    const response = await Order.create(data);

    if (!response?._id) {
      throw new Error("failed to add new order");
    }
    revalidateTag("orders");
    revalidateTag("users");
    return {
      status: 201,
      message: "food item successfully added",
      data: response?._id.toString(),
    };
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "server error:failed to add new order ");
  }
}

export async function updateOrderStatus(data) {
  const { orderId, status } = data;

  try {
    const response = await Order.findOneAndUpdate(
      { _id: orderId },
      { $set: { order_status: status } },
      { returnDocument: true, runValidators: true }
    );
    if (!response?._id) {
      throw new Error("failed to update the order status");
    }
    revalidateTag("orders");
    revalidateTag("users");
    return {
      status: 200,
      message: "order status successfull updated",
      data: response?._id.toString(),
    };
  } catch (error) {
    throw new Error(
      error.message || "server error:failed to update the order status "
    );
  }
}

export async function deleteOrderByOrderId(orderId) {
  try {
    const response = await Order.findOneAndDelete({ _id: orderId });
    revalidateTag("orders");
    revalidateTag("users");
    return {
      status: 200,
      message: "order successfull deleted",
    };
  } catch (error) {
    throw new Error(error.message || "server error:failed to delete the order");
  }
}
