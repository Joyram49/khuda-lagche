function RestaurantDescriptionLoader() {
  return (
    <div className='w-full sm:container font-robotoSlab text-muted-foreground mb-10 p-4 sm:p-0'>
      {/* Skeleton for the title */}
      <div className='h-8 w-32 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md mb-2'></div>

      {/* Skeleton for the icon */}
      <div className='h-4 w-4 bg-gray-200 dark:bg-gray-500 animate-pulse rounded-full mt-1 mb-4'></div>

      {/* Skeleton for the paragraph */}
      <div className='space-y-2'>
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className={`h-4 ${
              index % 3 === 0 ? "w-11/12" : "w-full"
            } bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDescriptionLoader;
