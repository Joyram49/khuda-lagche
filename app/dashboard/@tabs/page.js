import { auth } from "@/auth";
import DashboardCardsSkeleton from "@/components/loader/dashboard/dashboard-card-loader";
import RecentOrdersSkeleton from "@/components/loader/dashboard/recent-orders-skeleton-loader";
import TopRestaurantsSkeleton from "@/components/loader/dashboard/top-restaurants-skeleton-loader";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import DashboardCards from "./_components/dashboard-cards";
import RecentOrders from "./_components/recent-orders";
import TopRestaurants from "./_components/top-restaurants";

export const metadata = {
  title: "Dashboard | Khuda-Lagche",
  description: "Some description about admin dashboard",
};

export default async function DashboardPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  return (
    <div className='flex min-h-screen w-full  flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <Suspense fallback={<DashboardCardsSkeleton />}>
          <DashboardCards />
        </Suspense>
        <div className='grid gap-4 2xl:gap-8  2xl:grid-cols-4'>
          <Suspense fallback={<TopRestaurantsSkeleton />}>
            <TopRestaurants />
          </Suspense>
          <Suspense fallback={<RecentOrdersSkeleton />}>
            <RecentOrders />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
