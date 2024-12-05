// app/api/users/[email]/route.js
import { getUserByEmail } from "@/queries/account";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { email } = params;

  try {
    const user = await getUserByEmail(email);
    if (user.id) {
      return new NextResponse(JSON.stringify(user), { status: 200 });
    }
    throw new Error("user not found");
  } catch (error) {
    console.error("Error fetching user data:", error);
    return new NextResponse(error.message || "failed to fetch user", {
      status: 500,
    });
  }
}
