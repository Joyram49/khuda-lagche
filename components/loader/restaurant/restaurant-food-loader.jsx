import { Button } from "@/components/ui/button";
function RestaurantFoodSkeletonLoader() {
  return (
    <div className='w-full sm:container mt-8 space-y-16 p-4 sm:p-0'>
      <div className='w-full lg:flex relative'>
        {/* Food Items Section */}
        <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0 space-y-8'>
          {[...Array(3)].map((_, index) => (
            <div key={index} className='space-y-4'>
              {/* Category Title Skeleton */}
              <div className='h-6 w-1/3 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md mb-4'></div>

              {/* Food Items Skeleton */}
              {[...Array(3)].map((_, itemIndex) => (
                <div
                  key={itemIndex}
                  className='h-20 w-full bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md'
                ></div>
              ))}
            </div>
          ))}
        </div>

        {/* Sidebar Cart Section */}
        <div
          className={`lg:w-1/4 md:pr-2 md:pl-4 ring-[1px] ring-slate-900/10 rounded-md drop-shadow-sm h-full hidden lg:block`}
          style={{
            position: "sticky",
            top: 68,
            zIndex: 6,
            transition: "top 0.3s ease",
          }}
        >
          <div className='space-y-4 p-4'>
            <div className='h-6 w-1/2 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md mb-4'></div>
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className='h-16 w-full bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md'
              ></div>
            ))}
          </div>
        </div>

        {/* Mobile Cart Button */}
        <div
          className={`w-full fixed bottom-10 z-20 left-1/2 -translate-x-1/2 flex justify-center items-center lg:hidden`}
        >
          <Button className='container bg-gray-200 dark:bg-gray-500 animate-pulse py-4 rounded-md mx-6 sm:mx-10'></Button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantFoodSkeletonLoader;
