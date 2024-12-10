function HomeCounterLoader() {
  return (
    <div className='w-full h-full flex justify-center items-center gap-x-3 md:gap-x-10 3xl:gap-x-20 animate-pulse'>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-500 rounded-full flex justify-center items-center'></div>
        <div className='h-4 bg-gray-200 dark:bg-gray-500 w-16 rounded-md'></div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-500 rounded-full flex justify-center items-center'></div>
        <div className='h-4 bg-gray-200 dark:bg-gray-500 w-16 rounded-md'></div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-500 rounded-full flex justify-center items-center'></div>
        <div className='h-4 bg-gray-200 dark:bg-gray-500 w-20 rounded-md'></div>
      </div>
      <div className='flex flex-col items-center gap-4'>
        <div className='w-10 h-10 md:w-24 md:h-24 bg-gray-200 dark:bg-gray-500 rounded-full flex justify-center items-center'></div>
        <div className='h-4 bg-gray-200 dark:bg-gray-500 w-20 rounded-md'></div>
      </div>
    </div>
  );
}

export default HomeCounterLoader;
