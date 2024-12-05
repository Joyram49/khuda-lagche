import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getAllUserInfo } from "@/queries/users";
import { UsersRound } from "lucide-react";

async function UsersCard() {
  const { totalUserCount, monthUserCount, yearUserCount } =
    await getAllUserInfo();
  return (
    <div className='grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4'>
      <Card className='sm:col-span-2' x-chunk='dashboard-05-chunk-0'>
        <CardHeader className='pb-3'>
          <CardTitle>Registered User</CardTitle>
          <CardDescription className='max-w-lg text-balance leading-relaxed'>
            Introducing Our Dynamic User Dashboard for Seamless Management and
            Insightful Analysis.
          </CardDescription>
        </CardHeader>
        <CardContent className='flex items-center gap-x-2 font-medium '>
          Total user :{" "}
          <Badge className='font-medium  rounded-full flex justify-center items-center text-base'>
            {totalUserCount}
          </Badge>
        </CardContent>
      </Card>
      <Card x-chunk='dashboard-05-chunk-1'>
        <CardHeader className='pb-2'>
          <CardDescription>This Month</CardDescription>
          <CardTitle className='text-4xl'>
            <div className='flex items-center gap-x-2'>
              <UsersRound />
              {monthUserCount}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xs text-muted-foreground'>
            +25% from last week
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={25} aria-label='25% increase' />
        </CardFooter>
      </Card>
      <Card x-chunk='dashboard-05-chunk-2'>
        <CardHeader className='pb-2'>
          <CardDescription>This Year</CardDescription>
          <CardTitle className='text-4xl'>
            <div className='flex items-center gap-x-2'>
              <UsersRound />
              {yearUserCount}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='text-xs text-muted-foreground'>
            +10% from last year
          </div>
        </CardContent>
        <CardFooter>
          <Progress value={12} aria-label='12% increase' />
        </CardFooter>
      </Card>
    </div>
  );
}

export default UsersCard;
