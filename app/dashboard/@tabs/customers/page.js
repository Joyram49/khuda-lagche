import { auth } from "@/auth";
import UsersCardSkeleton from "@/components/loader/dashboard/user-cards-skeleton";
import UsersTableSkeleton from "@/components/loader/dashboard/users-list-skeleton";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import UsersCard from "./_components/users-card";
import UsersList from "./_components/users-list";
async function DashboardCustomerPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  return (
    <main className='w-full p-4  lg:p-8'>
      <div className='flex flex-col space-y-4'>
        <Suspense fallback={<UsersCardSkeleton />}>
          <UsersCard />
        </Suspense>
        <Suspense fallback={<UsersTableSkeleton />}>
          <UsersList />
        </Suspense>
      </div>
    </main>
  );
}

export default DashboardCustomerPage;
