import OrderFoodFromHome from "@/components/order-food-from-new";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { truncateContent } from "@/lib/truncate-content";
import DishCardBtn from "../popular-dishes/dash-card-btn";
import DishImageLoader from "./dish-image-loader";

function NewDishCard({ data }) {
  return (
    <Card className='max-w-[375px]  justify-self-center bg-none  border-0 shadow-none  '>
      <CardContent className='p-0 '>
        <DishImageLoader data={data} />
        <div className='flex flex-col items-center justify-center my-6 gap-y-2'>
          <h1 className='text-xl 2xl:text-2xl font-robotoSlab font-medium text-foreground text-center hover:text-destructive cursor-pointer transition-colors duration-200 ease-linear capitalize'>
            {data?.name}
          </h1>
          <h2 className='text-destructive text-xl lg:text-3xl font-robotoSlab font-medium'>
            <span className='mr-1'>&#2547;</span>
            {data?.price}
          </h2>
          <CardDescription className='font-robotoSlab  text-center '>
            {truncateContent(data?.description, 15)}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className='w-full flex flex-col md:flex-row justify-center items-center gap-y-3 md:gap-x-3'>
        <DishCardBtn data={data} />
        <OrderFoodFromHome data={data} />
      </CardFooter>
    </Card>
  );
}

export default NewDishCard;
