import { getAllCategory } from "@/queries/category";
import RestauranSearchBar from "./restaurant-searchbar";
import SelectCategory from "./restaurants-category";

import SortRestaurants from "./sort-restaurant";

async function RestaurantSidebar() {
  const categories = await getAllCategory();
  return (
    <div className='lg:w-1/4 md:px-3'>
      <div className='relative'>
        <div className='p-6 rounded-md shadow dark:shadow-gray-800 bg-topBackground border-[1px] border-border dark:border-borderF'>
          <RestauranSearchBar />
          <div className='w-full max-w-sm '>
            <h1 className='text-lg font-medium text-pText font-robotoSlab pb-2 mt-10'>
              Filters
            </h1>
            <div className='flex flex-col items-start gap-y-5'>
              <SortRestaurants />
              <SelectCategory categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RestaurantSidebar;
