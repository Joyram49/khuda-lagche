function RestaurantHeaderInfoLoader() {
  return (
    <div className='w-full sm:container grid grid-cols-1 md:grid-cols-12 gap-y-6 p-4 sm:p-0 animate-pulse'>
      {/* Main Content Section */}
      <div className='md:col-span-10 flex flex-col gap-y-6'>
        {/* Header Section */}
        <div className='w-full flex flex-col md:flex-row gap-y-6 md:gap-x-6 md:gap-y-0'>
          {/* Restaurant Image */}
          <div className='w-full h-48 md:w-1/3 bg-gray-300 rounded-md'></div>

          {/* Name and Rating */}
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='h-8 w-3/4 bg-gray-300 rounded-md'></div>
            <div className='flex gap-x-2 items-center'>
              <div className='h-6 w-20 bg-gray-300 rounded-md'></div>
              <span className='h-4 w-4 bg-gray-300 rounded-full'></span>
              <div className='h-6 w-32 bg-gray-300 rounded-md'></div>
            </div>
            <div className='flex gap-x-4 items-center'>
              <div className='h-6 w-24 bg-gray-300 rounded-md'></div>
              <div className='h-6 w-24 bg-gray-300 rounded-md'></div>
            </div>
          </div>
        </div>

        {/* Address, Delivery Time, Categories, and Offers */}
        <div className='flex flex-wrap gap-y-2 gap-x-4 items-center'>
          <div className='flex gap-x-2 items-center'>
            <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
            <div className='h-6 w-40 bg-gray-300 rounded-md'></div>
          </div>
          <div className='flex gap-x-2 items-center'>
            <div className='h-6 w-6 bg-gray-300 rounded-full'></div>
            <div className='h-6 w-32 bg-gray-300 rounded-md'></div>
          </div>
        </div>

        {/* Cuisines */}
        <div className='flex flex-wrap gap-y-2 gap-x-4'>
          <div className='h-6 w-20 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-20 bg-gray-300 rounded-md'></div>
          <div className='h-6 w-20 bg-gray-300 rounded-md'></div>
        </div>
      </div>

      {/* Add to Favorite Section */}
      <div className='md:col-span-2 self-start md:self-end'>
        <div className='w-8 h-8 bg-gray-300 rounded-md'></div>
      </div>
    </div>
  );
}

export default RestaurantHeaderInfoLoader;
