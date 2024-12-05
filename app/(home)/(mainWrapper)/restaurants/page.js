import RestaurantParamsProvider from "@/app/provider/RestaurantParamProvider";
import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import {
  getAllRestaurants,
  getFavouriteRestaurantsByUserId,
} from "@/queries/restaurants";
import RestaurantsContent from "./_components/restaurants-content/restaurants-content";
import RestaurantSidebar from "./_components/restaurants-sidebar/restaurants-sidebar";

export async function generateMetadata({ searchParams }) {
  return {
    title: searchParams.search
      ? `Results for "${searchParams.search}"`
      : "Restaurants | Khuda-Lagche",
    description:
      "Browse through our collection of restaurants. Search, filter, and sort to find your favorites.",
  };
}

async function RestaurantsPage({ searchParams }) {
  const initialFilters = {
    search: searchParams.search ?? "",
    sortBy: searchParams.sortBy ?? "default",
    categoryIds: searchParams.categoryIds
      ? searchParams.categoryIds.split(",")
      : [],
  };

  const restaurants = await getAllRestaurants(initialFilters);
  const session = await auth();

  let loggedInUser = null;
  let favRestaurants = [];
  if (session?.user && session?.error !== "RefreshAccessTokenError") {
    loggedInUser = await getUserByEmail(session?.user?.email);
    favRestaurants = await getFavouriteRestaurantsByUserId(loggedInUser?.id);
  }

  return (
    <div className='relative pb-16'>
      {/*end container*/}
      <RestaurantParamsProvider initialFilter={initialFilters}>
        <div className='w-full sm:container relative mt-6 p-4 sm:p-0'>
          <div className='lg:flex'>
            <RestaurantSidebar />
            <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0'>
              <RestaurantsContent
                restaurants={restaurants}
                favRestaurants={favRestaurants}
                loggedInUser={loggedInUser}
              />
            </div>
          </div>
        </div>
      </RestaurantParamsProvider>
    </div>
  );
}

export default RestaurantsPage;
