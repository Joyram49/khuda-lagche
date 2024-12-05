import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import StarRating from "@/app/(home)/_components/star-rating";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getTopRatedRestaurants } from "@/queries/restaurants";
import Image from "next/image";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

async function TopRestaurants() {
  const restaurants = await getTopRatedRestaurants();
  return (
    <Card className='col-span-2' x-chunk='DashboardPage-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Top Rated Restaurants</CardTitle>
          <CardDescription>
            Restaurants that got best reviews and serves best foods at
            reasonable price.
          </CardDescription>
        </div>
        <Button asChild size='sm' className='ml-auto gap-1 self-start'>
          <Link href='/dashboard/restaurants'>
            View All
            <ArrowUpRight className='h-4 w-4' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden sm:flex  justify-start items-center p-0'>
                Image
              </TableHead>
              <TableHead className='p-0 sm:p-4'>
                Restaurant Name & Email
              </TableHead>

              <TableHead className=''>Rating</TableHead>
              <TableHead className='text-right p-0'>Orders</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {restaurants &&
              restaurants.length > 0 &&
              restaurants.map((restaurant) => (
                <TableRow key={restaurant?.id} className=''>
                  <TableCell className=' hidden sm:flex justify-start items-center px-0 '>
                    <div className='w-10 h-10 rounded-full relative overflow-hidden '>
                      <Image
                        fill
                        src={urlEndpoint + restaurant?.thumbnail}
                        alt={restaurant?.name}
                        className='absolute object-cover object-center'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      />
                    </div>
                  </TableCell>
                  <TableCell className='p-0 sm:p-4'>
                    <div className='font-medium'>{restaurant?.name}</div>
                    <div className='hidden text-sm text-muted-foreground md:inline'>
                      {restaurant?.email}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className=' xs:flex items-start gap-x-1 hidden'>
                      <span className='font-medium font-robotoSlab mt-[2px] '>
                        ({restaurant?.totalReviews})
                      </span>
                      <StarRating rating={restaurant?.rating} />
                    </div>
                    <div className='font-medium xs:hidden'>
                      {restaurant?.rating?.toFixed(2)}
                    </div>
                  </TableCell>

                  <TableCell className='text-right font-medium px-0 '>
                    {restaurant?.orders?.length}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default TopRestaurants;
