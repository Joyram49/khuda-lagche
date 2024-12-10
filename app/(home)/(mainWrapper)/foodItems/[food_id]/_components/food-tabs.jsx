import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFoodById } from "@/queries/foodItems";

export default async function FoodTabs({ foodId }) {
  const data = await getFoodById(foodId);
  return (
    <Tabs defaultValue='description' className='w-full'>
      <TabsList className='grid w-full grid-cols-2 bg-topBackgroundF border-[1px] border-border dark:border-borderF'>
        <TabsTrigger
          className='data-[state=active]:bg-backgroundF data-[state=active]:border-[1px] border-border dark:border-borderF'
          value='description'
        >
          Description
        </TabsTrigger>
        <TabsTrigger
          className='data-[state=active]:bg-backgroundF data-[state=active]:border-[1px] border-border dark:border-borderF'
          value='how to cook'
        >
          How To Cook
        </TabsTrigger>
      </TabsList>
      <TabsContent value='description'>
        <Card className='bg-topBackgroundF border-[1px] border-border dark:border-borderF'>
          <CardHeader>
            <CardTitle>{data?.name}</CardTitle>
            <CardDescription>{data?.description}</CardDescription>
          </CardHeader>
        </Card>
      </TabsContent>
      <TabsContent value='how to cook'>
        <Card className='bg-topBackgroundF border-[1px] border-border dark:border-borderF'>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className='space-y-2'>
            <div className='space-y-1'>
              <Label htmlFor='current'>Current password</Label>
              <Input
                id='current'
                type='password'
                className='bg-topBackground border-[1px] border-border dark:border-borderF'
              />
            </div>
            <div className='space-y-1'>
              <Label htmlFor='new'>New password</Label>
              <Input
                id='new'
                type='password'
                className='bg-topBackground border-[1px] border-border dark:border-borderF'
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
