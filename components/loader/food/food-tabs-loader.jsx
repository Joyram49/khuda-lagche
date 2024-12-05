import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
export default function FoodTabsLoader() {
  return (
    <Tabs defaultValue='description' className='w-full animate-pulse'>
      {/* Tabs List Skeleton */}
      <TabsList className='grid w-full grid-cols-2'>
        <div className='h-10 bg-gray-200 rounded'></div>
        <div className='h-10 bg-gray-200 rounded'></div>
      </TabsList>

      {/* Description Tab Skeleton */}
      <TabsContent value='description'>
        <Card>
          <CardHeader>
            <div className='h-6 w-3/4 bg-gray-200 rounded mb-2'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
          </CardHeader>
          <CardContent className='mt-4'>
            <div className='h-4 w-full bg-gray-200 rounded mb-2'></div>
            <div className='h-4 w-5/6 bg-gray-200 rounded'></div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* How To Cook Tab Skeleton */}
      <TabsContent value='how to cook'>
        <Card>
          <CardHeader>
            <div className='h-6 w-3/4 bg-gray-200 rounded mb-2'></div>
            <div className='h-4 w-full bg-gray-200 rounded'></div>
          </CardHeader>
          <CardContent className='space-y-2 mt-4'>
            <div className='space-y-1'>
              <div className='h-4 w-1/4 bg-gray-200 rounded'></div>
              <div className='h-10 w-full bg-gray-200 rounded'></div>
            </div>
            <div className='space-y-1'>
              <div className='h-4 w-1/4 bg-gray-200 rounded'></div>
              <div className='h-10 w-full bg-gray-200 rounded'></div>
            </div>
          </CardContent>
          <CardFooter>
            <div className='h-10 w-1/3 bg-gray-200 rounded'></div>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
