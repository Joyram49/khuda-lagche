import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overviewDataFromOrder } from "@/queries/orders";
import { ArrowUpRight, UtensilsCrossed } from "lucide-react";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

async function RecentOrders() {
  const { completedOrders } = await overviewDataFromOrder();

  return (
    <Card x-chunk='DashboardPage-01-chunk-5' className='col-span-2'>
      <CardHeader className='flex flex-row items-center'>
        <CardTitle>Recent Sales</CardTitle>
        <Button asChild size='sm' className='ml-auto gap-1 self-start'>
          <Link href='/dashboard/orders'>
            View All
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {completedOrders &&
          completedOrders.length > 0 &&
          completedOrders.slice(0, 10).map((order) => (
            <div key={order?.id} className='flex items-center gap-4'>
              {order?.user_id?.profilePicture ? (
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage
                    src={urlEndpoint + order.user_id.profilePicture}
                    alt={order.user_id.name}
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              ) : (
                <Avatar className='hidden h-9 w-9 sm:flex'>
                  <AvatarImage
                    src='https://github.com/shadcn.png'
                    alt='@shadcn'
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              )}
              <div className='grid gap-1'>
                <p className='text-sm font-medium leading-none'>
                  {order?.user_id?.name}
                </p>
                <p className='text-sm text-muted-foreground'>
                  {order?.user_id?.email}
                </p>
              </div>
              <div className='ml-auto font-medium  items-center gap-x-2 hidden sn:flex'>
                <UtensilsCrossed size={22} className='font-medium ' />
                <p>{order?.restaurant_id?.name}</p>
              </div>

              <div className='ml-auto font-medium flex items-center'>
                <TbCurrencyTaka size={22} className='font-medium ' />
                <p>{order?.total_price}</p>
              </div>
            </div>
          ))}
      </CardContent>
    </Card>
  );
}

export default RecentOrders;
