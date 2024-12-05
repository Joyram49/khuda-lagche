import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { truncateContent } from "@/lib/truncate-content";

import FoodDialog from "./food-dialog/food-dialog";
import RestaurantFoodImageLoader from "./restaurant-image-loader";

function FoodItemCard({ data }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className='w-full min-w-[300px] drop-shadow-sm rounded-md  group cursor-pointer hover:bg-[#fffafa] hover:shadow-[0_4px_19px_3px_rgba(0,0,0,0.05)] hover:border hover:border-[#fed5c0]'>
          <CardContent className='p-4  w-full flex gap-x-6 justify-between '>
            <div className='w-full flex flex-col justify-start  gap-y-2'>
              <h1 className='lg:text-xl font-medium font-robotoSlab text-foreground  hover:text-hoverYellow transition-colors duration-200 ease-linear cursor-pointer'>
                {data?.name}
              </h1>

              <CardDescription className='font-robotoSlab  font-[300] p-0 '>
                {truncateContent(data.description, 15)}
              </CardDescription>
              <p className='text-muted-foreground font-robotoSlab'>
                From TK {data.price}
              </p>
            </div>
            <RestaurantFoodImageLoader data={data} />
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent hasCloseButton={false} className='sm:max-w-[625px] p-0'>
        <FoodDialog data={data} />
      </DialogContent>
    </Dialog>
  );
}

export default FoodItemCard;
