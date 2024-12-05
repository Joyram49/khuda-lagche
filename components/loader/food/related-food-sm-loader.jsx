function RelatedFoodSmLoader() {
  return (
    <div className='xl:hidden w-full flex flex-col justify-center items-center gap-y-4 animate-pulse'>
      {/* Title Placeholder */}
      <div className='h-6 w-3/4 bg-gray-200 rounded self-start'></div>
      {/* Carousel Placeholder */}
      <div className='w-full max-w-4xl flex gap-4 overflow-hidden'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className='p-1 w-full xs:w-[60%] sm:w-full flex-shrink-0'
            >
              <div className='w-full max-w-[375px] h-56 bg-gray-100 rounded-md drop-shadow-sm animate-pulse flex flex-col p-2 gap-y-2'>
                {/* Image Placeholder */}
                <div className='w-full h-32 bg-gray-200 rounded-md'></div>
                {/* Text Placeholder */}
                <div className='h-5 w-3/4 bg-gray-200 rounded'></div>
                <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
                <div className='flex gap-x-2 items-center'>
                  <div className='h-4 w-12 bg-gray-200 rounded'></div>
                  <div className='h-4 w-6 bg-gray-200 rounded'></div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RelatedFoodSmLoader;
