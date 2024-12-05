function UsersCardSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 animate-pulse'>
      <div className='sm:col-span-2 p-4 border rounded-lg bg-gray-50 shadow'>
        <div className='space-y-4'>
          {/* Title Skeleton */}
          <div className='h-6 bg-gray-300 rounded w-1/3'></div>
          {/* Description Skeleton */}
          <div className='space-y-2'>
            <div className='h-4 bg-gray-300 rounded w-full'></div>
            <div className='h-4 bg-gray-300 rounded w-3/4'></div>
          </div>
        </div>
        {/* Badge Skeleton */}
        <div className='flex items-center mt-4'>
          <div className='h-6 bg-gray-300 rounded-full w-20'></div>
        </div>
      </div>

      {[...Array(2)].map((_, idx) => (
        <div
          key={idx}
          className='p-4 border rounded-lg bg-gray-50 shadow space-y-4'
        >
          {/* Description Skeleton */}
          <div className='h-4 bg-gray-300 rounded w-1/4'></div>
          {/* Title Skeleton */}
          <div className='h-8 bg-gray-300 rounded w-1/2'></div>
          {/* Subtext Skeleton */}
          <div className='h-3 bg-gray-300 rounded w-1/3'></div>
          {/* Progress Bar Skeleton */}
          <div className='h-2 bg-gray-300 rounded w-full'></div>
        </div>
      ))}
    </div>
  );
}

export default UsersCardSkeleton;
