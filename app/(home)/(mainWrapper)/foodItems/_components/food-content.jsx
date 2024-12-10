import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

import StarRating from "@/app/(home)/_components/star-rating";
import AddToCart from "@/components/add-to-cart";
import { generateRating } from "@/lib/generateRatingFromReviews";
import FoodImageLoader from "./food-image-loader";

function FoodContentCard({ data }) {
  const rating = generateRating(data?.reviews);
  const organizedForCart = {
    foodItemId: data?.id,
    name: data?.name,
    restaurant: data?.restaurant?.id,
  };
  return (
    <Card className='w-full bg-topBackground rounded-[16px] justify-self-center group hover:shadow-md transition-shadow duration-150 ease-linear cursor-pointer relative border-[1px] border-border dark:border-borderF'>
      <Link href={`/foodItems/${data.id}`} className='w-full block'>
        <CardContent className='p-0'>
          <FoodImageLoader data={data} />
          <div className='flex flex-col items-start justify-center mt-6 mb-4  mx-4'>
            <h1
              className='font-robotoSlab text-foreground hover:text-customYellow transition-colors duration-100 ease-linear cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis'
              style={{ width: "100%" }}
            >
              {data?.name}
            </h1>

            <div className='w-full flex justify-between items-center'>
              {rating === 0 ? (
                <div className='text-[13px] font-robotoSlab font-medium text-initial'>
                  Be first to give review
                </div>
              ) : (
                <div className='flex justify-center items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
                  <span>
                    {rating} ({data?.reviews?.length})
                  </span>
                  <StarRating rating={rating} fontSize={18} />
                </div>
              )}
              <div className='flex justify-center items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
                <span>price: </span>
                <div
                  style={{ width: "20px", height: "18px", marginRight: "-4px" }}
                >
                  <TbCurrencyTaka
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain", // Ensure it doesn't crop
                    }}
                    className='scale-75 group-hover:scale-90 transition-transform duration-150 ease-linear'
                  />
                </div>

                <span className='text-customYellow font-normal text-[12px]'>
                  {data.price}
                </span>
              </div>
            </div>
            <AddToCart
              data={organizedForCart}
              type='plus'
              className={"w-full md:text-sm mt-6"}
            />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default FoodContentCard;
