import NoDataFound from "@/components/not-found/empty-orders";
import { getFoodById, getRelatedFoodItems } from "@/queries/foodItems";
import RelatedFoodCard from "./related-food-card";
async function RelatedFoodsBigScreen({ foodId }) {
  const selectedFood = await getFoodById(foodId);
  let relatedFoods = null;
  if (selectedFood?.id) {
    relatedFoods = await getRelatedFoodItems(selectedFood?.id);
  }

  return (
    <div className='h-auto lg:max-h-[75vh] 2xl:max-h-[60vh] hidden  xl:w-1/4 border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-md px-2 pb-4 xl:flex flex-col justify-start items-center gap-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200 overflow-x-hidden relative'>
      <h1 className='text-lg font-medium font-robotoSlab text-pText self-start capitalize sticky top-0 bg-backgroundF z-[10] py-4 block w-full'>
        You may also like -
      </h1>
      {relatedFoods.length === 0 ? (
        <NoDataFound text={"No related food items found"} status='try again' />
      ) : (
        <div className='flex flex-col gap-y-4 '>
          {relatedFoods.map((food) => (
            <RelatedFoodCard key={food.id} data={food} />
          ))}
        </div>
      )}
    </div>
  );
}

export default RelatedFoodsBigScreen;
