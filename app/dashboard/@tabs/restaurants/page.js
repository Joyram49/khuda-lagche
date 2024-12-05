import { auth } from "@/auth";
import { getAllRestaurants } from "@/queries/restaurants";
import { redirect } from "next/navigation";
import { RestaurantsTable } from "./_components/restaurants-table";

export const metadata = {
  title: "Restaurants | Khuda-Lagche",
  description: "Some description about restaurants list in dashboard",
};

export default async function DashboardRestaurantsPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  const restaurants = await getAllRestaurants({ limit: 100000 });

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <RestaurantsTable restaurants={restaurants} />
    </main>
  );
}
