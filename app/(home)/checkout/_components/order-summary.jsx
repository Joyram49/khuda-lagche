"use client";

import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import { getRestaurantById } from "@/queries/restaurants";
import { useEffect, useState } from "react";

function OrderSummary() {
  const { cartData } = useCartItemCount();
  const [restaurantName, setRestaurantName] = useState();
  const subtotal = cartData?.items?.reduce((acc, item) => {
    return (acc += item?.food_item_id?.price * item?.quantity);
  }, 0);

  useEffect(() => {
    if (cartData?.id) {
      async function fetchRestaurant() {
        try {
          const response = await getRestaurantById(cartData?.restaurant?.id);
          if (response?.id) {
            setRestaurantName(response.name);
          }
        } catch (error) {
          console.log(error.message);
          setRestaurantName("");
        }
      }
      fetchRestaurant();
    }
  }, [cartData]);

  return (
    <div
      id='order'
      className='lg:col-span-4 flex flex-col scroll-smooth text-pText'
    >
      <div className=' bg-topBackground border-[1px] border-border dark:border-borderF rounded-md p-6'>
        <div className='mb-4 flex flex-col items-center gap text-xl font-medium'>
          <h2>Your Order from </h2>
          <p className='text-pText font-normal text-base'>{restaurantName}</p>
        </div>
        <div className='flex flex-col justify-center items-start gap-y-4 font-robotoSlab text-pText text-sm xs:text-base'>
          {cartData?.items?.map((item) => (
            <div
              key={item?.id}
              className=' flex items-center justify-between w-full'
            >
              <div className='flex gap-x-2 items-center'>
                {" "}
                <p>{item?.quantity} </p> <span>x</span>
                <p>{item?.food_item_id?.name}</p>
              </div>
              <p>TK {item?.food_item_id?.price}</p>
            </div>
          ))}
        </div>
        <div className='mt-6 w-full h-[.1px] bg-slate-800/10 drop-shadow-sm' />
        <div className='w-full flex flex-col justify-center gap-y-2 font-robotoSlab text-pText'>
          <div className='flex items-center justify-between mt-4 '>
            <p>Subtotal</p>
            <p>Tk {subtotal}</p>
          </div>
          <div className='flex items-center justify-between '>
            <p>Delivery charge</p>
            <p>Tk {cartData?.restaurant?.delivery_charge}</p>
          </div>
          <div className='flex items-center justify-between '>
            <p>Service charge</p>
            <p>Tk 0</p>
          </div>
        </div>
        <div className='w-full flex items-center justify-between text-primary font-robotoSlab text-xl mt-6'>
          <div>
            <p>Total</p>{" "}
            <p className='font-inter font-thin text-pText text-sm'>
              (incl. fees and tax)
            </p>
          </div>
          <p>Tk {subtotal + cartData?.restaurant?.delivery_charge}</p>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
