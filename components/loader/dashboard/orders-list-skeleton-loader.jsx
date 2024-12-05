import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function OrdersListSkeleton() {
  return (
    <Tabs>
      <div className='flex items-center animate-pulse'>
        <TabsList>
          <TabsTrigger value='1 week'>
            <div className='h-6 w-12 bg-gray-300 rounded-md'></div>
          </TabsTrigger>
          <TabsTrigger value='1 month'>
            <div className='h-6 w-14 bg-gray-300 rounded-md'></div>
          </TabsTrigger>
          <TabsTrigger value='1 year'>
            <div className='h-6 w-12 bg-gray-300 rounded-md'></div>
          </TabsTrigger>
        </TabsList>
        <div className='ml-auto flex items-center gap-2'>
          <div className='h-7 w-20 bg-gray-300 rounded-md'></div>
          <div className='h-7 w-20 bg-gray-300 rounded-md'></div>
        </div>
      </div>
      <TabsContent>
        <Card>
          <CardHeader className='px-7'>
            <CardTitle>
              <div className='h-6 w-20 bg-gray-300 rounded-md'></div>
            </CardTitle>
            <div>
              <div className='h-4 w-full bg-gray-300 rounded-md mb-2'></div>
              <div className='h-4 w-3/4 bg-gray-300 rounded-md'></div>
            </div>
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className='flex items-center gap-4'>
                {/* Avatar Placeholder */}
                <div className='h-10 w-10 bg-gray-300 rounded-full'></div>

                {/* Text Placeholder */}
                <div className='flex-1 space-y-2'>
                  <div className='h-4 w-1/2 bg-gray-300 rounded-md'></div>
                  <div className='h-3 w-1/3 bg-gray-300 rounded-md'></div>
                </div>

                {/* Action Placeholder */}
                <div className='ml-auto flex gap-4'>
                  <div className='h-4 w-12 bg-gray-300 rounded-md'></div>
                  <div className='h-4 w-8 bg-gray-300 rounded-md'></div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default OrdersListSkeleton;
