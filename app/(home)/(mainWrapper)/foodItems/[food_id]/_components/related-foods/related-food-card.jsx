import StarRating from "@/app/(home)/_components/star-rating";
import { Card, CardContent } from "@/components/ui/card";
import { generateRating } from "@/lib/generateRatingFromReviews";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";
import RelatedFoodImageLoader from "./related-food-image-loader";

function RelatedFoodCard({ data }) {
  const rating = generateRating(data?.reviews);
  return (
    <Card className='w-auto max-w-[375px] drop-shadow-sm rounded-md  group cursor-pointer hover:bg-[#fffafa] hover:shadow-[0_4px_19px_3px_rgba(0,0,0,0.05)] hover:border hover:border-[#fed5c0] relative overflow-hidden '>
      <Link
        href={`/foodItems/${data?.id}`}
        className='absolute inset-0 z-10'
      ></Link>
      <CardContent className='p-2 w-full flex gap-x-3 justify-between '>
        <RelatedFoodImageLoader data={data} />
        <div className='w-full flex flex-col justify-start '>
          <h1 className=' font-medium font-robotoSlab text-foreground  hover:text-hoverYellow transition-colors duration-200 ease-linear cursor-pointer'>
            {data?.name}
          </h1>
          {rating === 0 ? (
            <div className='text-[13px] font-robotoSlab font-medium text-initial'>
              Be first to give review
            </div>
          ) : (
            <StarRating rating={rating} />
          )}
          <div className='flex justify-start items-center gap-x-1 font-robotoSlab text-muted-foreground text-sm font-medium'>
            <span>price: </span>
            <div style={{ width: "20px", height: "18px", marginRight: "-4px" }}>
              <TbCurrencyTaka
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                className='scale-75 group-hover:scale-90 transition-transform duration-150 ease-linear'
              />
            </div>

            <span className='text-customYellow font-normal text-[12px]'>
              {data?.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RelatedFoodCard;
