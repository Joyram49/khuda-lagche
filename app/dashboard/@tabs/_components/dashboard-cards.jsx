import { Activity, CreditCard, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { overviewDataFromOrder } from "@/queries/orders";
import { getUserOverview } from "@/queries/users";
import { TbCurrencyTaka } from "react-icons/tb";
async function DashboardCards() {
  const { totalPrice, totalSales, activeOrder } = await overviewDataFromOrder();
  const { totalUser } = await getUserOverview();

  return (
    <div className='grid gap-4 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4'>
      <Card x-chunk='DashboardPage-01-chunk-0'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Total Revenue</CardTitle>
          <TbCurrencyTaka size={22} className='text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold flex items-center'>
            <TbCurrencyTaka size={26} />
            {totalPrice.toFixed(2)}
          </div>

          <p className='text-xs text-muted-foreground'>
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk='DashboardPage-01-chunk-1'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Users</CardTitle>
          <Users className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+{totalUser}</div>
          <p className='text-xs text-muted-foreground'>
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      <Card x-chunk='DashboardPage-01-chunk-2'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Sales</CardTitle>
          <CreditCard className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+{totalSales}</div>
          <p className='text-xs text-muted-foreground'>+19% from last month</p>
        </CardContent>
      </Card>
      <Card x-chunk='DashboardPage-01-chunk-3'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <CardTitle className='text-sm font-medium'>Active Order</CardTitle>
          <Activity className='h-4 w-4 text-muted-foreground' />
        </CardHeader>
        <CardContent>
          <div className='text-2xl font-bold'>+{activeOrder?.length}</div>
          <p className='text-xs text-muted-foreground'>+201 since last hour</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardCards;
