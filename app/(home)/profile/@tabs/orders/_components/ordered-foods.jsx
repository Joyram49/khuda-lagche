import { Badge } from "@/components/ui/badge";
import getFormatedTime from "@/lib/getFormatedTime";
import { ChefHat, Dot } from "lucide-react";
import Link from "next/link";
import { TbCurrencyTaka } from "react-icons/tb";
import OrderImageLoader from "./order-image-loader";

function OrderedFoods({ order }) {
  const timestamp = new Date(order?.placed_at).getTime();
  const { id: restaurantId, name } = order?.restaurant_id;
  const status = order?.order_status;
  return (
    <div className='w-full  flex flex-col gap-y-2 items-start'>
      <div className='flex items-center gap-x-2 border-b-[1px] border-slate-900/10 drop-shadow-sm pb-2 w-full '>
        <ChefHat />
        <div className='flex-1 flex gap-x-0 items-center '>
          <Link
            href={`/restaurants/${restaurantId}`}
            className='hover:underline'
          >
            <h1>{name}</h1>
          </Link>
          <div className='flex items-center text-[12px] text-initial font-inter mt-1'>
            <Dot />
            <span className='-translate-x-1'>{getFormatedTime(timestamp)}</span>
          </div>
          <div className='flex-1  font-medium text-sm flex justify-end items-center gap-x-2 '>
            Total :
            <Badge className='bg-customYellow'>{order?.total_price}</Badge>
          </div>
        </div>
      </div>
      <div className='w-full'>
        {order?.items.map((food) => (
          <Link
            href={`/foodItems/${food?.food_item_id?.id}`}
            key={food?.food_item_id?.id}
            className='w-full bg-white ring-[1px] ring-slate-900/10 drop-shadow-sm rounded-sm p-4 grid grid-cols-1 sm:grid-cols-6 gap-4 mt-2 sm:place-items-center hover:bg-[#fffafa] hover:shadow-[0_4px_19px_3px_rgba(0,0,0,0.05)]  hover:ring-[#fed5c0]'
          >
            <div className='sm:col-span-3 justify-self-start flex gap-x-4'>
              <OrderImageLoader food={food?.food_item_id} />
              <div>
                <h1>{food?.food_item_id?.name}</h1>
                <p className='text-sm mt-2 '>
                  Category :{" "}
                  <span className='px-3 py-1 bg-deepBackground rounded-full max-w-fit mt-4 xs:mt-0'>
                    {food?.food_item_id?.category?.name}
                  </span>
                </p>
              </div>
            </div>
            <div className='flex items-center '>
              <TbCurrencyTaka size={18} />
              <span>{food?.food_item_id?.price}</span>
            </div>

            <p className='text-sm '>Quantity : {food?.quantity}</p>

            <div
              className={` ${
                status === "delivered"
                  ? "bg-success text-white"
                  : status === "cancelled"
                  ? "bg-destructive text-white"
                  : "bg-deepBackground"
              } px-3 py-1 text-sm  rounded-full max-w-fit `}
            >
              {status}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OrderedFoods;
