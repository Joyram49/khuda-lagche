import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TbCurrencyTaka } from "react-icons/tb";

function DashboardCardsSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4'>
      {[...Array(4)].map((_, index) => (
        <Card key={index} className='animate-pulse'>
          <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
              <div className='h-4 w-24 bg-gray-300 rounded-md'></div>
            </CardTitle>
            <div className='h-5 w-5 bg-gray-300 rounded-full'></div>
          </CardHeader>
          <CardContent>
            <div className='text-2xl font-bold flex items-center space-x-2'>
              <TbCurrencyTaka size={26} className='text-gray-300' />
              <div className='h-6 w-16 bg-gray-300 rounded-md'></div>
            </div>
            <div className='text-xs text-muted-foreground'>
              <div className='h-3 w-32 bg-gray-300 rounded-md mt-2'></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default DashboardCardsSkeleton;
