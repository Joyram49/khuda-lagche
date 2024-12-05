import { Card, CardContent } from "@/components/ui/card";

function FoodCardSkeletonLoader({ count = 1 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className='w-full rounded-[16px] justify-self-center group hover:shadow-md transition-shadow duration-150 ease-linear cursor-pointer relative'
        >
          <CardContent className='p-0'>
            {/* Image Placeholder */}
            <div className='w-full h-48 bg-gray-300 animate-pulse rounded-t-[16px]'></div>

            <div className='flex flex-col items-start justify-center mt-6 mb-4 mx-4'>
              {/* Title Placeholder */}
              <div className='w-full h-6 bg-gray-300 animate-pulse rounded-md mb-2'></div>

              <div className='w-full flex justify-between items-center'>
                {/* Rating Placeholder */}
                <div className='h-5 bg-gray-300 animate-pulse w-32 rounded-md'></div>

                {/* Price Placeholder */}
                <div className='flex justify-center items-center gap-x-1'>
                  <div className='w-6 h-6 bg-gray-300 animate-pulse rounded-full'></div>
                  <div className='h-4 bg-gray-300 animate-pulse w-16 rounded-md'></div>
                </div>
              </div>

              {/* Add to Cart Button Placeholder */}
              <div className='w-full h-10 bg-gray-300 animate-pulse rounded-md mt-6'></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

export default FoodCardSkeletonLoader;
