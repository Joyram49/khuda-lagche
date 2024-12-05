import { getCartItemByCartId } from "@/queries/cartItems";
import { dbConnect } from "@/service/mongo";
import { NextResponse } from "next/server";

export const revalidate = 0;

export async function GET(req, { params }) {
  const { cartId } = params;
  await dbConnect();

  try {
    const response = await getCartItemByCartId(cartId);

    return new NextResponse(JSON.stringify(response), { status: 200 });
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, { status: 500 });
  }
}
