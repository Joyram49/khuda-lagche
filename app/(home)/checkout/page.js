import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { redirect } from "next/navigation";
import CheckoutContainer from "./_components/checkout-container";

export const metadata = {
  title: "Checkout | Khuda-Lagche",
  description: "some description about food ....",
};

async function CheckoutPage() {
  const session = await auth();
  let loggedInUser = null;

  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  return (
    <div className='w-full bg-gray-100 min-h-screen'>
      <CheckoutContainer user={loggedInUser} />
    </div>
  );
}

export default CheckoutPage;
