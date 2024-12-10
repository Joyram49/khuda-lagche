import { truncateContent } from "@/lib/truncate-content";
import { getFoodItemsByRestaurantId } from "@/queries/foodItems";
import { getRestaurantById } from "@/queries/restaurants";
import { isValidObjectId } from "mongoose";
import { notFound } from "next/navigation";
import RestaurantDescription from "./_component/restaurant-description";
import RestaurantHeadInfo from "./_component/restaurant-header/restaurant-headInfo";
import RestaurantMenu from "./_component/restaurant-menu";
import RestaurantMenuContainer from "./_component/restaurant-menu-container";

export async function generateMetadata({ params }) {
  const restaurantId = params.restaurant_id;
  if (!isValidObjectId(restaurantId)) {
    return {
      title: "Restaurant Not Found",
      description: "The requested restaurant does not exist.",
    };
  }
  const restaurant = await getRestaurantById(restaurantId);

  if (!restaurant) {
    return {
      title: "Restaurant Not Found",
      description: "The requested restaurant does not exist.",
    };
  }

  return {
    title: `${truncateContent(restaurant.name, 3)} | Khuda-Lagche`,
    description: restaurant.description,
  };
}

async function RestaurantPage({ params: { restaurant_id } }) {
  if (!isValidObjectId(restaurant_id)) {
    notFound();
  }

  const restaurant = await getRestaurantById(restaurant_id);
  if (!restaurant) {
    notFound();
  }
  const { foodItems, categoriesOfEachRes } = await getFoodItemsByRestaurantId(
    restaurant_id
  );
  return (
    <div className='min-h-screen w-full pt-10 bg-backgroundF'>
      <div className='w-full flex flex-col  justify-center  items-center gap-y-6 '>
        {/* restaurant page head content with image and info */}

        <RestaurantHeadInfo restaurant={restaurant} />

        <div className='w-full h-[1px] bg-border dark:bg-borderF drop-shadow-sm' />
        <RestaurantDescription />
        <RestaurantMenu uniqueCategories={categoriesOfEachRes}>
          <RestaurantMenuContainer
            data={foodItems}
            delivery_time={restaurant?.delivery_time}
            uniqueCategories={categoriesOfEachRes}
          />
        </RestaurantMenu>
      </div>
    </div>
  );
}

export default RestaurantPage;
