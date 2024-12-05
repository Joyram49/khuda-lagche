function RelatedFoodBigLoader() {
  return (
    <div className='h-auto lg:max-h-[75vh] 2xl:max-h-[60vh] hidden xl:w-1/4 border-[1px] border-slate-900/10 drop-shadow-sm rounded-md px-2 py-4 xl:flex flex-col justify-start items-center gap-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200 overflow-x-hidden animate-pulse'>
      <div className='h-6 w-3/4 bg-gray-200 rounded self-start'></div>
      <div className='flex flex-col gap-y-4 w-full'>
        {Array(4)
          .fill(0)
          .map((_, index) => (
            <div
              className='w-auto max-w-[375px] drop-shadow-sm rounded-md bg-gray-100 animate-pulse relative overflow-hidden'
              key={index}
            >
              <div className='p-2 w-full flex gap-x-3 justify-between'>
                {/* Image Placeholder */}
                <div className='w-20 h-20 bg-gray-200 rounded'></div>
                {/* Text and Content */}
                <div className='w-full flex flex-col gap-y-2'>
                  <div className='h-5 w-3/4 bg-gray-200 rounded'></div>
                  <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
                  <div className='flex justify-start items-center gap-x-1'>
                    <div className='h-4 w-12 bg-gray-200 rounded'></div>
                    <div className='h-5 w-5 bg-gray-200 rounded-full'></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default RelatedFoodBigLoader;
