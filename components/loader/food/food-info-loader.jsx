function FoodInfoLoader() {
  return (
    <div className='w-full flex flex-col gap-y-4'>
      {/* Skeleton for the header and food details */}
      <div className='w-full flex justify-between items-start gap-x-2 border-b-[1px] border-slate-900/10 drop-shadow-sm pb-2 animate-pulse'>
        <div className='flex flex-col justify-start gap-y-2'>
          <div className='h-6 w-3/4 bg-gray-200 rounded'></div>
          <div className='h-4 w-1/2 bg-gray-200 rounded'></div>
          <div className='flex justify-start items-center gap-x-1'>
            <div className='h-6 w-6 bg-gray-200 rounded-full'></div>
            <div className='h-6 w-16 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>

      {/* Skeleton for restaurant and category details */}
      <div className='flex flex-col gap-y-4 border-b-[1px] border-slate-900/10 drop-shadow-sm pb-2 animate-pulse'>
        <div className='flex justify-start items-center gap-x-2'>
          <div className='h-6 w-6 bg-gray-200 rounded-full'></div>
          <div className='h-5 w-1/3 bg-gray-200 rounded'></div>
        </div>
        <div className='h-5 w-1/2 bg-gray-200 rounded'></div>
        <div className='flex gap-x-2'>
          <div className='h-5 w-16 bg-gray-200 rounded'></div>
          <div className='flex flex-wrap gap-x-1'>
            <div className='h-5 w-10 bg-gray-200 rounded'></div>
            <div className='h-5 w-10 bg-gray-200 rounded'></div>
          </div>
        </div>
      </div>

      {/* Skeleton for CartBlock */}
      <div className='w-full h-12 bg-gray-200 rounded animate-pulse'></div>
    </div>
  );
}

export default FoodInfoLoader;
