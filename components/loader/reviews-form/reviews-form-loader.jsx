function ReviewFormLoader() {
  return (
    <div className='w-full flex flex-col items-start justify-start gap-y-10 animate-pulse'>
      {/* Leave a Review Section */}
      <div className='w-full flex flex-col gap-y-4'>
        <div className='h-6 w-1/4 bg-gray-200 dark:bg-gray-500 rounded'></div>
        <div className='flex gap-x-4'>
          <div className='w-12 h-12 bg-gray-200 dark:bg-gray-500 rounded-full border border-border'></div>
          <div className='flex flex-col gap-y-2 w-full'>
            <div className='h-4 w-3/4 bg-gray-200 dark:bg-gray-500 rounded'></div>
            <div className='h-10 w-full bg-gray-200 dark:bg-gray-500 rounded'></div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className='flex flex-col gap-y-4 w-full'>
        <div className='h-6 w-1/4 bg-gray-200 dark:bg-gray-500 rounded'></div>

        {/* Repeat this block for multiple skeleton reviews */}
        {[...Array(3)].map((_, index) => (
          <div key={index} className='flex gap-x-4'>
            <div className='w-12 h-12 bg-gray-200 dark:bg-gray-500 rounded-full border border-border'></div>
            <div className='flex flex-col justify-start items-start w-full'>
              <div className='flex justify-start items-center gap-x-2'>
                <div className='h-4 w-1/3 bg-gray-200 dark:bg-gray-500 rounded'></div>
                <div className='flex items-center gap-x-1'>
                  <div className='h-3 w-3 bg-gray-200 dark:bg-gray-500 rounded-full'></div>
                  <div className='h-3 w-1/4 bg-gray-200 dark:bg-gray-500 rounded'></div>
                </div>
              </div>
              <div className='h-4 w-2/3 bg-gray-200 dark:bg-gray-500 rounded'></div>
              <div className='flex gap-x-1'>
                {[...Array(5)].map((_, starIndex) => (
                  <div
                    key={starIndex}
                    className='h-4 w-4 bg-gray-200 dark:bg-gray-500 rounded-full'
                  ></div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewFormLoader;
