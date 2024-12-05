import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

function OrderCardsSkeleton() {
  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 animate-pulse'>
      {/* Main Orders Card */}
      <Card className='sm:col-span-2'>
        <CardHeader className='pb-3'>
          <CardTitle>
            <div className='h-6 w-40 bg-gray-300 rounded-md'></div>
          </CardTitle>
          <div>
            <div className='h-4 w-full bg-gray-300 rounded-md mb-2'></div>
            <div className='h-4 w-3/4 bg-gray-300 rounded-md'></div>
          </div>
        </CardHeader>
        <CardContent className='flex items-center gap-x-2 font-medium'>
          <div className='h-4 w-24 bg-gray-300 rounded-md'></div>
          <Badge className='h-6 w-10 bg-gray-300 rounded-full'></Badge>
        </CardContent>
      </Card>

      {/* This Week Card */}
      <Card>
        <CardHeader className='pb-2'>
          <div>
            <div className='h-4 w-20 bg-gray-300 rounded-md'></div>
          </div>
          <CardTitle className='text-4xl'>
            <div className='flex items-center gap-x-2'>
              <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
              <div className='h-6 w-16 bg-gray-300 rounded-md'></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-4 w-28 bg-gray-300 rounded-md'></div>
        </CardContent>
        <CardFooter>
          <Progress value={0} className='h-2 bg-gray-300' />
        </CardFooter>
      </Card>

      {/* This Year Card */}
      <Card>
        <CardHeader className='pb-2'>
          <div>
            <div className='h-4 w-20 bg-gray-300 rounded-md'></div>
          </div>
          <CardTitle className='text-4xl'>
            <div className='flex items-center gap-x-2'>
              <div className='h-8 w-8 bg-gray-300 rounded-full'></div>
              <div className='h-6 w-16 bg-gray-300 rounded-md'></div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='h-4 w-28 bg-gray-300 rounded-md'></div>
        </CardContent>
        <CardFooter>
          <Progress value={0} className='h-2 bg-gray-300' />
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrderCardsSkeleton;
