import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Replace this with your Skeleton component or a div styled with Tailwind.

const OrderLoadingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-112px)] bg-backgroundF'>
      <Card className='w-full max-w-lg px-4 py-6 bg-topBackground border-[1px] border-border dark:border-borderF'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold text-gray-900 dark:text-gray-100'>
            <Skeleton className='h-8 w-2/3 mx-auto bg-gray-300 dark:bg-gray-600' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center gap-4 font-robotoSlab'>
            <Skeleton className='w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-600' />
            <Skeleton className='h-6 w-4/5 bg-gray-300 dark:bg-gray-600' />
            <Skeleton className='h-4 w-3/4 bg-gray-300 dark:bg-gray-600' />
          </div>
          <div className='mt-8 font-robotoSlab'>
            <h2 className='font-semibold text-gray-900 dark:text-gray-100'>
              <Skeleton className='h-6 w-1/2 bg-gray-300 dark:bg-gray-600' />
            </h2>
            <div className='grid gap-4 mt-4'>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='w-full flex items-center justify-between border p-4 rounded-sm border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                >
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-1/2 bg-gray-300 dark:bg-gray-600' />
                    <Skeleton className='h-4 w-8 bg-gray-300 dark:bg-gray-600' />
                  </div>
                  <Skeleton className='h-4 w-16 bg-gray-300 dark:bg-gray-600' />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6 flex items-center gap-x-2'>
            <Skeleton className='h-6 w-32 bg-gray-300 dark:bg-gray-600' />
            <Skeleton className='h-6 w-20 bg-gray-300 dark:bg-gray-600' />
          </div>
          <div className='mt-2 flex items-center gap-x-2'>
            <Skeleton className='h-4 w-24 bg-gray-300 dark:bg-gray-600' />
            <Skeleton className='h-4 w-2/3 bg-gray-300 dark:bg-gray-600' />
          </div>
        </CardContent>
        <div className='mt-6 flex justify-between'>
          <Skeleton className='h-10 w-32 bg-gray-300 dark:bg-gray-600' />
          <Skeleton className='h-10 w-32 bg-gray-300 dark:bg-gray-600' />
        </div>
      </Card>
    </div>
  );
};

export default OrderLoadingPage;
