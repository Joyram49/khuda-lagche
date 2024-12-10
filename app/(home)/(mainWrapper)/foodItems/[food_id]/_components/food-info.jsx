import StarRating from "@/app/(home)/_components/star-rating";
import { generateRating } from "@/lib/generateRatingFromReviews";
import { getFoodById } from "@/queries/foodItems";
import Link from "next/link";
import { MdRestaurantMenu } from "react-icons/md";
import { TbCurrencyTaka } from "react-icons/tb";
import CartBlock from "./cart-block";

async function FoodInfo({ foodId }) {
  const selectedFood = await getFoodById(foodId);
  const rating = generateRating(selectedFood?.reviews);

  return (
    <div className='w-full flex flex-col gap-y-4 font-robotoSlab text-pText'>
      <div className='w-full flex justify-between items-start gap-x-2 border-b-[1px] border-border dark:border-borderF drop-shadow-sm pb-2'>
        <div className='flex flex-col justify-start gap-y-2'>
          <h1 className='text-lg md:text-xl font-medium '>
            {selectedFood?.name}
          </h1>
          {rating === 0 ? (
            <div className='text-[13px] font-medium '>
              Be first to give review
            </div>
          ) : (
            <div className='flex justify-start items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
              <span className='text-base'>{rating}</span>
              <StarRating rating={rating} />
            </div>
          )}
          <div className='flex justify-start items-center gap-x-1   '>
            <span className='text-lg capitalize'>price: </span>
            <div style={{ width: "24px", height: "24px", marginRight: "-4px" }}>
              <TbCurrencyTaka
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain", // Ensure it doesn't crop
                }}
              />
            </div>

            <span className='text-lg'>{selectedFood?.price}</span>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 border-b-[1px] border-border dark:border-borderF  drop-shadow-sm pb-2'>
        <div className='flex justify-start items-center gap-x-2'>
          <MdRestaurantMenu size={22} className='fill-customYellow' />
          <Link
            href={`/restaurants/${selectedFood?.restaurant?.id}`}
            className='hover:underline underline-offset-1'
          >
            <span>{selectedFood?.restaurant?.name}</span>
          </Link>
        </div>
        <p>
          <span className='font-medium mr-2'>Category :</span> [{" "}
          {selectedFood?.category?.name} ]
        </p>
        <div className='flex gap-x-2'>
          <p className='font-medium whitespace-nowrap'>Tag : </p>
          <div className='flex flex-wrap gap-x-1'>
            {selectedFood?.tags.map((tag, index) => (
              <p key={index + tag}>
                {index !== selectedFood.tags.length - 1 ? `${tag},` : tag}
              </p>
            ))}
          </div>
        </div>
      </div>
      <CartBlock data={selectedFood} />
    </div>
  );
}

export default FoodInfo;
