import OrderContainer from "@/app/(home)/profile/@tabs/orders/_components/order-container";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { getAllOrderByUserId } from "@/queries/orders";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Orders | Khuda-Lagche",
  description: "Order Information for particular user",
};

async function BusinessOrderPage({ searchParams }) {
  const session = await auth();

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  const currentPage = parseInt(searchParams.page) || 1;
  const itemsPerPage = 2;
  const offset = (currentPage - 1) * itemsPerPage;

  const orders = await getAllOrderByUserId(loggedInUser?.id);

  return <OrderContainer orders={orders} />;
}

export default BusinessOrderPage;
