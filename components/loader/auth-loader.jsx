import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Replace with your own Skeleton or Tailwind `div`.

const AuthSkeletonLoader = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-backgroundF'>
      <Card className='w-full max-w-md px-4 py-6 bg-topBackground border-[1px] border-border dark:border-borderF'>
        <CardHeader className='flex flex-col items-center'>
          {/* User Icon Placeholder */}
          <Skeleton className='h-16 w-16 rounded-full mb-4' />
          <CardTitle className='text-center text-2xl font-bold'>
            <Skeleton className='h-8 w-1/2 mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='space-y-4'>
            {/* Input Skeletons */}
            {[...Array(3)].map((_, index) => (
              <div key={index}>
                <Skeleton className='h-5 w-1/3 mb-2' />
                <Skeleton className='h-10 w-full rounded' />
              </div>
            ))}

            {/* Checkbox/Remember Me Skeleton */}
            <div className='flex items-center gap-2'>
              <Skeleton className='h-4 w-4 rounded' />
              <Skeleton className='h-4 w-20' />
            </div>

            {/* Button Skeleton */}
            <div className='mt-4'>
              <Skeleton className='h-10 w-full rounded' />
            </div>
          </div>
          <div className='mt-6 text-center'>
            <Skeleton className='h-5 w-2/3 mx-auto' />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthSkeletonLoader;
