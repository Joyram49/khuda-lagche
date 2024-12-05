import Link from "next/link";
import React from "react";
import StarRating from "../star-rating";
import HomeRestaurantImageLoader from "./home-restaurant-image-loader";
import ThreeDots from "./three-dots";

function TopRestaurantCard({ data }) {
  return (
    <div className='w-[190px] max-w-[275px] justify-self-center '>
      <div className='relative w-full  h-44 bg-white rounded-[32px] overflow-hidden group  cursor-pointer'>
        <HomeRestaurantImageLoader data={data} />
        <div className='h-full w-full bg-[#414549b3] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear' />
        <ThreeDots data={data} />
      </div>
      {/* start with restaurant name, rating and type */}
      <div className=' flex flex-col items-center mt-4'>
        <Link href={`/restaurants/${data?.id}`}>
          <h1 className='font-medium font-robotoSlab text-primary hover:text-destructive transition-colors duration-200 ease-linear cursor-pointer '>
            {data?.name}
          </h1>
        </Link>
        <div className='flex justify-center items-center gap-x-2 flex-wrap'>
          <p> Cousins:</p>
          {data?.categories.map((category, index) => (
            <React.Fragment key={category?.id}>
              <span className='text-initial font-robotoSlab uppercase text-[12px] font-medium hover:text-hoverYellow mr-1 transition-colors duration-200 ease-linear cursor-pointer'>
                {category?.name}
              </span>
              {index < data.categories.length - 1 && (
                <span className='text-initial font-medium -m-[6px] pr-2'>
                  ,
                </span>
              )}
            </React.Fragment>
          ))}
        </div>
        <StarRating rating={data?.rating} />
      </div>
    </div>
  );
}

export default TopRestaurantCard;
