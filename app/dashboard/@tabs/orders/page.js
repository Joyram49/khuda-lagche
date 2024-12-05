import { auth } from "@/auth";
import OrderCardsSkeleton from "@/components/loader/dashboard/order-cards-skeleton";
import OrdersListSkeleton from "@/components/loader/dashboard/orders-list-skeleton-loader";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import OrderCards from "./_components/order-cards";
import OrderContainer from "./_components/order-container";

export const metadata = {
  title: "Orders | Khuda-Lagche",
  description: "Some description about orders list in dashboard",
};

async function DashboardOrdersPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  return (
    <main className='w-full p-4 md:p-8'>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<OrderCardsSkeleton />}>
          <OrderCards />
        </Suspense>
        <Suspense>
          <OrderContainer fallback={<OrdersListSkeleton />} />
        </Suspense>
      </div>
    </main>
  );
}

export default DashboardOrdersPage;
