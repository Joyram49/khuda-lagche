import { auth } from "@/auth";
import FoodInfoLoader from "@/components/loader/food/food-info-loader";
import FoodTabsLoader from "@/components/loader/food/food-tabs-loader";
import RelatedFoodBigLoader from "@/components/loader/food/related-food-big-loader";
import RelatedFoodSmLoader from "@/components/loader/food/related-food-sm-loader";
import ReviewFormLoader from "@/components/loader/reviews-form/reviews-form-loader";
import { truncateContent } from "@/lib/truncate-content";
import { getUserByEmail } from "@/queries/account";
import { getFoodById } from "@/queries/foodItems";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import FoodImageLoader from "./_components/food-image-loader";
import FoodInfo from "./_components/food-info";
import FoodReview from "./_components/food-review";
import FoodTabs from "./_components/food-tabs";
import RelatedFoodsBigScreen from "./_components/related-foods/related-foods-big-screen";
import RelatedFoodsSmallScreen from "./_components/related-foods/related-foods-small-screen";

export async function generateMetadata({ params }) {
  const foodId = params.food_id;
  if (!isValidObjectId(foodId)) {
    return {
      title: "Food Not Found",
      description: "The requested food item does not exist.",
    };
  }
  const selectedFood = await getFoodById(foodId);

  if (!selectedFood) {
    return {
      title: "Food Not Found",
      description: "The requested food item does not exist.",
    };
  }

  return {
    title: `${truncateContent(selectedFood.name, 3)} | Khuda-Lagche`,
    description: selectedFood.description,
  };
}

async function FoodPage({ params: { food_id } }) {
  if (!isValidObjectId(food_id)) {
    notFound();
  }
  const session = await auth();
  const selectedFood = await getFoodById(food_id);
  if (!selectedFood) {
    notFound();
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  return (
    <div className='w-full sm:container my-10 p-4 sm:p-0 '>
      <div className='w-full flex flex-col gap-y-10 lg:gap-y-20 items-start '>
        <div className='w-full flex flex-col xl:flex-row xl:gap-x-6 '>
          {/* food image and info  */}
          <div className='w-full  xl:w-3/4 border-[1px] border-slate-900/10 drop-shadow-sm rounded-md p-2 md:p-6 '>
            <div className='w-full grid  grid-cols-1 md:grid-cols-2 gap-6 justify-between items-start '>
              <FoodImageLoader selectedFood={selectedFood} />
              <Suspense fallback={<FoodInfoLoader />}>
                <FoodInfo foodId={food_id} />
              </Suspense>
            </div>
          </div>
          {/* related foods for bigger screen */}
          <Suspense fallback={<RelatedFoodBigLoader />}>
            <RelatedFoodsBigScreen foodId={food_id} />
          </Suspense>
        </div>
        {/* food description with tabds */}
        <Suspense fallback={<FoodTabsLoader />}>
          <FoodTabs foodId={food_id} />
        </Suspense>

        {/* submit food review */}
        <Suspense fallback={<ReviewFormLoader />}>
          <FoodReview foodId={food_id} userInfo={loggedInUser} />
        </Suspense>
        {/* related foods for smaller screen */}

        <Suspense fallback={<RelatedFoodSmLoader />}>
          <RelatedFoodsSmallScreen foodId={food_id} />
        </Suspense>
      </div>
    </div>
  );
}

export default FoodPage;
