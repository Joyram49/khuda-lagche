import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowUpRight } from "lucide-react";

function TopRestaurantsSkeleton() {
  return (
    <Card className='col-span-2 animate-pulse'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>
            <div className='h-6 w-48 bg-gray-300 rounded-md'></div>
          </CardTitle>
          <div>
            <div className='h-4 w-80 bg-gray-300 rounded-md'></div>
          </div>
        </div>
        <Button size='sm' className='ml-auto gap-1 self-start' disabled>
          <div className='h-4 w-16 bg-gray-300 rounded-md'></div>
          <ArrowUpRight className='h-4 w-4 text-gray-300' />
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='hidden sm:flex justify-start items-center p-0'>
                <div className='h-4 w-12 bg-gray-300 rounded-md'></div>
              </TableHead>
              <TableHead className='p-0 sm:p-4'>
                <div className='h-4 w-48 bg-gray-300 rounded-md'></div>
              </TableHead>
              <TableHead>
                <div className='h-4 w-16 bg-gray-300 rounded-md'></div>
              </TableHead>
              <TableHead className='text-right p-0'>
                <div className='h-4 w-12 bg-gray-300 rounded-md'></div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(5)].map((_, index) => (
              <TableRow key={index}>
                <TableCell className='hidden sm:flex justify-start items-center px-0'>
                  <div className='w-10 h-10 bg-gray-300 rounded-full'></div>
                </TableCell>
                <TableCell className='p-0 sm:p-4'>
                  <div className='h-4 w-32 bg-gray-300 rounded-md mb-2'></div>
                  <div className='hidden h-3 w-24 bg-gray-300 rounded-md md:inline'></div>
                </TableCell>
                <TableCell>
                  <div className='flex items-center gap-x-2'>
                    <div className='h-4 w-8 bg-gray-300 rounded-md'></div>
                    <div className='h-4 w-20 bg-gray-300 rounded-md'></div>
                  </div>
                </TableCell>
                <TableCell className='text-right px-0'>
                  <div className='h-4 w-8 bg-gray-300 rounded-md'></div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default TopRestaurantsSkeleton;
