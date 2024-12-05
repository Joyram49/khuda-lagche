import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UtensilsCrossed } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";

function RecentOrdersSkeleton() {
  return (
    <Card className='col-span-2 animate-pulse'>
      <CardHeader>
        <CardTitle>
          <div className='h-6 w-48 bg-gray-300 rounded-md'></div>
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {[...Array(5)].map((_, index) => (
          <div key={index} className='flex items-center gap-4'>
            {/* Avatar Skeleton */}
            <div className='hidden h-9 w-9 sm:flex rounded-full bg-gray-300'></div>

            {/* User Info Skeleton */}
            <div className='grid gap-1'>
              <div className='h-4 w-32 bg-gray-300 rounded-md'></div>
              <div className='h-3 w-24 bg-gray-300 rounded-md'></div>
            </div>

            {/* Restaurant Info Skeleton */}
            <div className='ml-auto font-medium items-center gap-x-2 hidden sm:flex'>
              <UtensilsCrossed size={22} className='text-gray-300' />
              <div className='h-4 w-32 bg-gray-300 rounded-md'></div>
            </div>

            {/* Price Skeleton */}
            <div className='ml-auto font-medium flex items-center'>
              <TbCurrencyTaka size={22} className='text-gray-300' />
              <div className='h-4 w-16 bg-gray-300 rounded-md'></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default RecentOrdersSkeleton;
