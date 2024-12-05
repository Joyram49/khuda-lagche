"use server";

import { replaceMongoIdInData } from "@/lib/convertData";
import { Order } from "@/models/order-model";
import { User } from "@/models/user-model";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";

export async function getUserOverview() {
  try {
    const response = await User.find({ role: { $ne: "admin" } })
      .populate({ path: "order_history", model: Order })
      .lean();
    const users = replaceMongoIdInData(response);
    const totalUser = users?.length;
    return { users, totalUser };
  } catch (error) {
    console.log(error);
    throw new Error(error?.message || "failed to get users info");
  }
}

export const getAllUserInfo = unstable_cache(
  async () => {
    try {
      const allUser = await User.aggregate([
        {
          $match: { role: { $ne: "admin" } },
        },
        {
          $sort: { created_at: -1 },
        },
        {
          $lookup: {
            from: "orders",
            localField: "_id",
            foreignField: "user_id",
            as: "orders",
          },
        },
        {
          $addFields: {
            orders: {
              $filter: {
                input: "$orders",
                as: "order",
                cond: { $eq: ["$$order.order_status", "delivered"] },
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            id: { $toString: "$_id" },
            name: 1,
            email: 1,
            profilePicture: 1,
            role: 1,
            address: 1,
            phone: 1,
            orders: 1,
            created_at: 1,
            updated_at: 1,
          },
        },
      ]);

      const totalUserCount = allUser?.length;

      const oneMonthAgo = dayjs().subtract(7, "day").toDate();
      const userInLast30days = allUser.filter(
        (user) => new Date(user?.created_at) >= oneMonthAgo
      );

      const oneYearAgo = dayjs().subtract(1, "year").toDate();
      const userInPast1Year = allUser.filter(
        (user) => new Date(user?.created_at) >= oneYearAgo
      );

      return {
        allUser: replaceMongoIdInData(allUser),
        totalUserCount,
        monthUserCount: userInLast30days.length,
        yearUserCount: userInPast1Year.length,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error?.message || "Failed to get all user");
    }
  },
  ["users"],
  { tags: ["users"] }
);
