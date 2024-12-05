import { getAllCategory } from "@/queries/category";
import SelectCategory from "./foods-category";
import PriceRangeSlider from "./price-range-slider";
import SortFoods from "./sort-foods";

async function FoodItemsSidebar() {
  const categories = await getAllCategory();
  return (
    <div className='lg:w-1/4 md:px-3'>
      <div className='relative'>
        <div className='p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900'>
          <div className='w-full max-w-sm '>
            <h1 className='text-lg font-medium text-muted-foreground font-robotoSlab pb-2'>
              Filters
            </h1>
            <div className='w-full flex flex-col items-start gap-y-10 '>
              <SortFoods />
              <PriceRangeSlider />
              <SelectCategory categories={categories} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodItemsSidebar;
