import NoDataFound from "@/components/not-found/empty-orders";
import { getFoodById, getRelatedFoodItems } from "@/queries/foodItems";
import RelatedFoodSmallContainer from "./related-foods-sm-container";

export default async function RelatedFoodsSmallScreen({ foodId }) {
  let relatedFoods = [];
  const selectedFood = await getFoodById(foodId);
  if (selectedFood?.id) {
    relatedFoods = await getRelatedFoodItems(selectedFood?.id);
  }
  return (
    <div className='xl:hidden w-full flex flex-col justify-center items-center gap-y-4 '>
      <h1 className='text-lg font-medium font-robotoSlab text-pText self-start capitalize'>
        You may also like -
      </h1>
      {relatedFoods && relatedFoods.length === 0 ? (
        <NoDataFound
          text={"No related food items found"}
          status={"try again"}
        />
      ) : (
        <RelatedFoodSmallContainer relatedFoods={relatedFoods} />
      )}
    </div>
  );
}
