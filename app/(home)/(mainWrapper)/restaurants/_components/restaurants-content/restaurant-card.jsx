"use client";
import StarRating from "@/app/(home)/_components/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import ByCycleIcon from "@/public/assets/images/icons/delivery-icon.svg";
import Link from "next/link";

import { generateRating } from "@/lib/generateRatingFromReviews";
import { useMemo } from "react";
import AddToFav from "./add-to-fav";
import EditOrDeleteBtn from "./edit-delete-buttons";
import RestaurantImageLoader from "./restaurant-image-loader";

function RestaurantCard({
  data,
  favRestaurants,
  loggedInUser,
  business = false,
}) {
  const rating = generateRating(data?.reviews);

  const isFav = useMemo(() => {
    return (
      loggedInUser?.id &&
      favRestaurants?.restaurants?.some(
        (restaurant) => restaurant?.id === data?.id
      )
    );
  }, [favRestaurants, data, loggedInUser?.id]);

  return (
    <Card className='w-full bg-topBackground  rounded-[16px] justify-self-center group hover:shadow-md transition-shadow duration-150 ease-linear cursor-pointer relative border-[1px] border-border dark:border-borderF'>
      <Link href={`/restaurants/${data.id}`} className='w-full block'>
        <CardContent className='p-0 w-full'>
          <RestaurantImageLoader data={data} business={business} />
          <div className='flex flex-col items-start justify-center mt-6 mb-4  mx-4'>
            <h1 className='text-lg font-robotoSlab text-foreground text-center hover:text-customYellow transition-colors duration-100 ease-linear cursor-pointer'>
              {data?.name}
            </h1>

            <div className='w-full flex justify-between items-center'>
              {rating === 0 ? (
                <div className='text-[13px] font-robotoSlab font-medium text-initial'>
                  Be first to give review
                </div>
              ) : (
                <div className='flex justify-center items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
                  <span>{rating}</span>
                  <StarRating rating={rating} fontSize={18} />
                </div>
              )}
              {!business && (
                <div className='flex justify-center items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
                  <div style={{ width: "20px", height: "18px" }}>
                    <ByCycleIcon
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain", // Ensure it doesn't crop
                      }}
                      className='scale-75 group-hover:scale-90 transition-transform duration-150 ease-linear'
                    />
                  </div>
                  <span className='text-customYellow font-normal text-[12px]'>
                    {data.delivery_charge}
                  </span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <AddToFav
        className='absolute top-2 right-2 '
        restaurantId={data?.id}
        isFav={isFav}
        restaurantName={data?.name}
      />
      {business && <EditOrDeleteBtn restaurant={data} />}
    </Card>
  );
}

export default RestaurantCard;
