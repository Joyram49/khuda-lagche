import { Card, CardContent, CardFooter } from "@/components/ui/card";
export default function NewDishCardSkeleton() {
  return (
    <div className='h-full w-full flex-col flex justify-around items-center gap-y-10 md:gap-y-20 pt-10 animate-pulse'>
      {/* Skeleton header */}
      <div className='flex flex-col items-center text-center'>
        <div className='h-8 w-48 bg-gray-300 rounded'></div>
        <div className='h-4 w-32 bg-gray-300 rounded mt-2'></div>
      </div>

      {/* Skeleton cards */}
      <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row md:gap-x-3 lg:gap-x-10 gap-y-6 md:gap-y-0'>
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className={`${
              index === 2
                ? "md:col-span-2 lg:col-span-1 flex justify-center"
                : ""
            }`}
          >
            <Card className='max-w-[375px] justify-self-center bg-none border-0 shadow-none animate-pulse'>
              <CardContent className='p-0'>
                <div className='w-full h-64 bg-gray-300 rounded-md'></div>;
                <div className='flex flex-col items-center justify-center my-6 gap-y-2'>
                  {/* Skeleton for the dish title */}
                  <div className='w-32 h-6 bg-gray-300 rounded-md'></div>
                  {/* Skeleton for the price */}
                  <div className='w-24 h-6 bg-gray-300 rounded-md mt-2'></div>
                  {/* Skeleton for the description */}
                  <div className='font-robotoSlab text-center'>
                    <div className='w-40 h-4 bg-gray-300 rounded-md mt-2'></div>
                    <div className='w-32 h-4 bg-gray-300 rounded-md mt-2'></div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className='w-full flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-x-3'>
                {/* Skeletons for buttons */}
                <div className='w-32 h-10 bg-gray-300 rounded-md'></div>
                <div className='w-32 h-10 bg-gray-300 rounded-md'></div>
              </CardFooter>
            </Card>
          </div>
        ))}
      </div>

      {/* Skeleton footer */}
      <div>
        <div className='h-6 w-40 bg-gray-300 rounded'></div>
      </div>
    </div>
  );
}
