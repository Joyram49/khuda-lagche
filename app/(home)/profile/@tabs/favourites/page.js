import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { getFavouriteRestaurantsByUserId } from "@/queries/restaurants";
import { redirect } from "next/navigation";
import FavouriteResCard from "./_components/favourite-restaurant-card";

export const metadata = {
  title: "My Favourite Restaurants | Khuda-Lagche",
  description: "Favourite Restaurants for particular user",
};

async function FavouriteRestaurants() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let fav = null;
  if (session?.user) {
    const loggedInUser = await getUserByEmail(session?.user?.email);
    fav = await getFavouriteRestaurantsByUserId(loggedInUser?.id);
  }

  return (
    <div className='w-full flex flex-col items-start gap-y-5'>
      <h1 className='font-robotoSlab text-2xl font-medium'>
        My Favourites Restaurants
      </h1>
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-6 '>
        {fav?.restaurants?.map((restaurant) => (
          <FavouriteResCard key={restaurant?.id} data={restaurant} />
        ))}
      </div>
    </div>
  );
}

export default FavouriteRestaurants;
