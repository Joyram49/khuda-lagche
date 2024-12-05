import FoodParamsProvider from "@/app/provider/FoodParamProvider";
import { getAllFood } from "@/queries/foodItems";
import CleanFacebookHash from "./_components/clean-facebook-hash";
import FoodItemsContainer from "./_components/foods-container";
import FoodItemsSideBar from "./_components/foods-sidebar/food-sidebar";

export async function generateMetadata({ searchParams }) {
  return {
    title: searchParams.search
      ? `Results for "${searchParams.search}"`
      : "Food Items | Khuda-Lagche",
    description:
      "Browse through our collection of delicious food items. Search, filter, and sort to find your favorites.",
  };
}

async function FoodItemsPage({ searchParams }) {
  const initialFilters = {
    search: searchParams.search ?? "",
    sortBy: searchParams.sortBy ?? "default",
    minPrice: Number(searchParams.minPrice) || 20,
    maxPrice: Number(searchParams.maxPrice) || 3000,
    categoryIds: searchParams.categoryIds
      ? searchParams.categoryIds.split(",")
      : [],
  };
  const foodItems = await getAllFood(initialFilters);

  return (
    <div className='relative'>
      <CleanFacebookHash />
      {/*end container*/}
      <FoodParamsProvider initialFilters={initialFilters}>
        <div className='w-full sm:container relative mt-6 p-4 sm:p-0'>
          <div className='lg:flex'>
            <FoodItemsSideBar />
            <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0 '>
              <FoodItemsContainer />
            </div>
          </div>
        </div>
      </FoodParamsProvider>
    </div>
  );
}

export default FoodItemsPage;
