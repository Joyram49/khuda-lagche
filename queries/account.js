"use server";
import { replaceMongoIdInData } from "@/lib/convertData";
import { User } from "@/models/user-model";
import { unstable_cache } from "next/cache";

export const getUserByEmail = unstable_cache(
  async (email) => {
    const user = await User.findOne({ email })
      .select("address name email phone profilePicture role order_history id")
      .lean();

    return replaceMongoIdInData(user);
  },
  ["users"],
  { tags: ["users"] }
);
