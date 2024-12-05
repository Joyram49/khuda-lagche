import { User } from "@/models/user-model";
import { dbConnect } from "@/service/mongo";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { firstName, lastName, email, password, userRole } =
    await request.json();

  await dbConnect();

  const hashedPassword = await bcrypt.hash(password, 5);
  const name = `${firstName} ${lastName}`;

  const newUser = { name, email, password: hashedPassword, role: userRole };

  try {
    await User.create(newUser);
    return new NextResponse("New user has created", { status: 201 });
  } catch (error) {
    return new NextResponse(error.message || "internal server error", {
      status: 500,
    });
  }
};
