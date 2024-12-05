import { getAllCategory } from "@/queries/category";
import { getFoodItemsByRestaurantId } from "@/queries/foodItems";
import { getRestaurantById } from "@/queries/restaurants";
import { UtensilsCrossed } from "lucide-react";

import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { redirect } from "next/navigation";
import AddNewFoodItem from "./_components/edit-fooditems/add-new-foodItem";
import { UpdateFoodItems } from "./_components/edit-fooditems/update-food-items";
import RestaurantEditForm from "./_components/edit-restaurant/restaurant-edit-form";

async function RestaurantEditPage({ params }) {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }
  const { restaurantId } = params;
  const restaurant = await getRestaurantById(restaurantId);
  const restaurantFood = await getFoodItemsByRestaurantId(restaurantId);
  const allCategories = await getAllCategory();
  const { foodItems } = restaurantFood || {};

  return (
    <div className='w-full flex flex-col gap-y-20'>
      <div className='xs:border border-slate-800/10 drop-shadow-sm rounded-sm  xs:p-10 bg-gray-200'>
        <div className='w-full'>
          <h1 className='text-center font-robotoSlab  text-3xl'>
            {restaurant?.name}
          </h1>
        </div>
        <RestaurantEditForm
          data={restaurant}
          allCategories={allCategories}
          foodItems={foodItems}
          userId={loggedInUser?.id}
        />
      </div>
      <div className='flex flex-col gap-y-2 xs:p-10'>
        <div className='flex items-center justify-between  font-robotoSlab  text-xl text-[#414549]'>
          <h1 className='capitalize'>
            All foods that
            <span
              dangerouslySetInnerHTML={{
                __html: ` &quot;<strong>${restaurant?.name}</strong>&quot;`,
              }}
            />{" "}
            served
            <UtensilsCrossed className='text-hoverYellow float-start mr-2' />
          </h1>

          <AddNewFoodItem restaurant={restaurant} categories={allCategories} />
        </div>

        <UpdateFoodItems
          foodItems={foodItems}
          restaurant={restaurant}
          categories={allCategories}
        />
      </div>
    </div>
  );
}

export default RestaurantEditPage;
