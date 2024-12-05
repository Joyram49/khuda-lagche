import StarRating from "@/app/(home)/_components/star-rating";
import { auth } from "@/auth";
import { generateRating } from "@/lib/generateRatingFromReviews";
import ByCycleIcon from "@/public/assets/images/icons/delivery-icon.svg";
import { getUserByEmail } from "@/queries/account";
import { Clock } from "lucide-react";
import { FaShoppingBag } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import AddToFav from "../../../_components/restaurants-content/add-to-fav";

import { getFavouriteRestaurantsByUserId } from "@/queries/restaurants";
import ImageLoaderRestaurant from "./image-loader-restaurant";
import RestaurantReviews from "./restaurant-reviews";

async function RestaurantHeadInfo({ restaurant }) {
  const rating = generateRating(restaurant?.reviews);
  const { reviews, id: restaurantId } = restaurant || {};
  const session = await auth();

  let isFav = false;

  let loggedInUser = null;
  if (session?.user && session?.error !== "RefreshAccessTokenError") {
    loggedInUser = await getUserByEmail(session?.user?.email);
    const favRestaurants = await getFavouriteRestaurantsByUserId(
      loggedInUser?.id
    );
    const isInclude = favRestaurants?.restaurants?.find(
      (res) => res.id === restaurant.id
    );
    if (isInclude) {
      isFav = true;
    }
  }
  return (
    <div className='w-full sm:container grid grid-cols-1 md:grid-cols-12 gap-y-6 p-4 sm:p-0'>
      <div className='md:col-span-10 flex flex-col  gap-y-6'>
        <div className='w-full flex flex-col md:flex-row gap-y-6 md:gap-x-6 md:gap-y-0'>
          {/* restaurant image */}

          <ImageLoaderRestaurant data={restaurant} />
          {/* restaurant name and rating */}
          <div className='flex flex-col gap-y-2 '>
            <h1 className='text-primary font-robotoSlab font-medium text-xl md:text-3xl'>
              {restaurant?.name}
            </h1>
            <div className='flex justify-start items-center flex-wrap gap-y-2 gap-x-2 font-robotoSlab text-sm md:text-base text-muted-foreground'>
              <StarRating rating={rating} fontSize={22} />
              <span className=''>-</span>
              <p className='font-semibold'>
                {rating}
                <span className='font-normal ml-1'>
                  ({reviews?.length}) Rating
                </span>{" "}
              </p>
              <RestaurantReviews
                restaurantId={restaurantId}
                userInfo={loggedInUser}
                reviews={reviews}
              />
            </div>
            <div className='flex justify-start flex-wrap gap-y-2 items-center gap-x-4 font-robotoSlab text-muted-foreground  '>
              <div className='flex justify-start items-start xs:items-center gap-x-2'>
                <div
                  style={{
                    width: "20px",
                    height: "18px",
                    marginTop: "4px",
                  }}
                >
                  <ByCycleIcon
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Ensure it doesn't crop
                    }}
                  />
                </div>
                <span>
                  Delivery Fee{" "}
                  <span className='text-hoverYellow'>
                    {restaurant?.delivery_charge}
                  </span>
                </span>
              </div>
              <div className='flex justify-start items-start xs:items-center gap-x-2'>
                <FaShoppingBag size={22} />
                <span>TK 100 minimum</span>
              </div>
            </div>
          </div>
        </div>

        {/* restaurant adddress, delivery time,categories, offer*/}
        <div className='flex flex-wrap gap-y-2 gap-x-4 justify-start items-center font-robotoSlab font-[300] text-muted-foreground'>
          <div className='flex xs:items-center gap-x-2'>
            <FiMapPin className='stroke-customYellow' size={22} />
            <p className=''>{restaurant?.address}</p>
          </div>
          <div className='flex items-center gap-x-2'>
            <Clock className='stroke-customYellow' size={22} />
            <p>Delivery {restaurant.delivery_time}</p>
          </div>
        </div>

        {/* restaurant categories, */}

        <div className='flex gap-x-4 justify-start md:items-center font-robotoSlab text-muted-foreground'>
          <h3>Cuisines: </h3>
          <div className='flex justify-center md:justify-normal items-center flex-wrap gap-x-4 gap-y-2'>
            {restaurant?.categories?.map((cousin) => (
              <span
                key={cousin?.id}
                className='text-sm font-medium bg-[#fffafa] rounded-full px-2 py-1 min-w-fit'
              >
                {cousin?.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className='md:col-span-2 justify-self-start md:justify-self-end relative '>
        <AddToFav
          isFav={isFav}
          restaurantId={restaurant?.id}
          className='w-8 h-8 ring-[1px] stroke-2 text-xl ring-rose-500/20 drop-shadow-sm text-rose-500 rounded-md font-medium hover:bg-rose-500/20 hover:text-2xl transition-all duration-150 ease-linear
        '
          restaurantName={restaurant?.name}
        />
      </div>
    </div>
  );
}

export default RestaurantHeadInfo;
