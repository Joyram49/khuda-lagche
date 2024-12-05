import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { getAllOrderByUserId } from "@/queries/orders";
import { redirect } from "next/navigation";

import OrderContainer from "./_components/order-container";

export const metadata = {
  title: "My Orders | Khuda-Lagche",
  description: "Order Information for particular user",
};

async function OrderPage() {
  const session = await auth();

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  const orders = await getAllOrderByUserId(loggedInUser?.id);

  return <OrderContainer orders={orders} />;
}

export default OrderPage;
