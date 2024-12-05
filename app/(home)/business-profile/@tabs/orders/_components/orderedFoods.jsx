import { ChefHat } from "lucide-react";
import { TbCurrencyTaka } from "react-icons/tb";
import OrderImageLoader from "./order-image-loader";

function OrderedFoods({ order }) {
  return (
    <div key={order.id} className='w-full  flex flex-col gap-y-2 items-start'>
      <div className='flex gap-x-2 border-b-[1px] border-slate-900/10 drop-shadow-sm pb-2 w-full'>
        <ChefHat />
        <h1>{order.restaurantName}</h1>
      </div>
      <div className='w-full'>
        {order.foodItems.map((food) => (
          <div
            key={food.foodId}
            className=' bg-white ring-[1px] ring-slate-900/10 drop-shadow-sm rounded-sm p-4 grid grid-cols-1 sm:grid-cols-6 gap-4 mt-2 sm:place-items-center'
          >
            <div className='sm:col-span-3 justify-self-start flex gap-x-4'>
              <OrderImageLoader food={food} />
              <div>
                <h1>{food.foodName}</h1>
                <p className='text-sm mt-2 '>
                  Category :{" "}
                  <span className='px-3 py-1 bg-deepBackground rounded-full max-w-fit mt-4 xs:mt-0'>
                    {food.category}
                  </span>
                </p>
              </div>
            </div>
            <div className='flex items-center '>
              <TbCurrencyTaka size={18} />
              <span>{food.price}</span>
            </div>

            <p className='text-sm '>Quantity : {food.quantity}</p>

            <div className='px-3 py-1 text-sm bg-deepBackground rounded-full max-w-fit'>
              {order.order_status}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderedFoods;
