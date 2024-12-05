import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Replace this with your Skeleton component or a div styled with Tailwind.

const OrderLoadingPage = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-112px)] bg-[#f2f4f8]'>
      <Card className='w-full max-w-lg px-4 py-6'>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>
            <Skeleton className='h-8 w-2/3 mx-auto' />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center gap-4 font-robotoSlab'>
            <Skeleton className='w-16 h-16 rounded-full' />
            <Skeleton className='h-6 w-4/5' />
            <Skeleton className='h-4 w-3/4' />
          </div>
          <div className='mt-8 font-robotoSlab'>
            <h2 className='font-semibold text-initial'>
              <Skeleton className='h-6 w-1/2' />
            </h2>
            <div className='grid gap-4 mt-4'>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='w-full flex items-center justify-between border p-4 rounded-sm'
                >
                  <div className='flex items-center gap-2'>
                    <Skeleton className='h-4 w-1/2' />
                    <Skeleton className='h-4 w-8' />
                  </div>
                  <Skeleton className='h-4 w-16' />
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6 flex items-center gap-x-2'>
            <Skeleton className='h-6 w-32' />
            <Skeleton className='h-6 w-20' />
          </div>
          <div className='mt-2 flex items-center gap-x-2'>
            <Skeleton className='h-4 w-24' />
            <Skeleton className='h-4 w-2/3' />
          </div>
        </CardContent>
        <div className='mt-6 flex justify-between'>
          <Skeleton className='h-10 w-32' />
          <Skeleton className='h-10 w-32' />
        </div>
      </Card>
    </div>
  );
};

export default OrderLoadingPage;
