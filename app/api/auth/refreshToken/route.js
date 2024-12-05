import { replaceMongoIdInData } from "@/lib/convertData";
import { decryptRefreshToken } from "@/lib/decryptToken";
import { getNewTokens } from "@/lib/getNewTokens";

import { User } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const secretKey = new TextEncoder().encode(process.env.AUTH_SECRET);

  const { searchParams } = new URL(request.url);

  const refresh_token = searchParams.get("refresh_token");

  if (!refresh_token) {
    return new NextResponse(
      { message: "Please provide a valid refreshToken" },
      {
        status: 400,
      }
    );
  }

  await dbConnect();

  try {
    const decoded = await decryptRefreshToken(refresh_token);

    if (!decoded.id) {
      throw new Error("invalid refresh token");
    }
    const id = new mongoose.Types.ObjectId(decoded?.id);

    const user = await User.find({ _id: id }).lean();
    if (user?.length === 0) {
      throw new Error("User not found");
    }

    const leanedUser = replaceMongoIdInData(user);
    const processedUser = {
      userId: leanedUser[0]?.id,
      name: leanedUser[0]?.name,
      email: leanedUser[0]?.email,
    };
    const token = await getNewTokens(processedUser);

    return new NextResponse(JSON.stringify(token), { status: 200 });
  } catch (error) {
    return new NextResponse(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
};
