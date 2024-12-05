"use server";

import { replaceMongoIdInData } from "@/lib/convertData";
import { User } from "@/models/user-model";
import bcrypt from "bcryptjs";
import { revalidateTag } from "next/cache";

export async function updatePrfileInfo(data) {
  const email = data.email;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: data },
      { new: true }
    )
      .select("-password")
      .lean();
    if (!updatedUser) {
      throw new Error("User not found");
    }

    const response = replaceMongoIdInData(updatedUser);
    revalidateTag("users");
    return response;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
}

export async function updatePassword(email, passwords) {
  const { oldPassword, newPassword } = passwords;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("user not found");
    }
    const isPasswordMatch = await bcrypt.compare(oldPassword, user?.password);

    if (!isPasswordMatch) {
      throw new Error("password does not match with old password");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 5);

    user.password = hashedPassword;

    const updatedUser = await user.save();
    if (!updatedUser) {
      throw new Error("failed to update password");
    }
    return {
      success: true,
      message: "Password updated successfully",
    };
  } catch (error) {
    console.error(error);
    throw new Error(error.message || "failed to update password");
  }
}
