"use client";

import AddToCart from "@/components/add-to-cart";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function CartBlock({ data }) {
  const [quantity, setQuantity] = useState(1);

  const organizedForCart = {
    foodItemId: data?.id,
    restaurant: data?.restaurant?.id,
  };

  const handleQuantity = (type) => {
    if (type === "minus") {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <>
      <div className='w-full flex justify-start items-center flex-wrap gap-x-2'>
        <p className='text-[#414549] font-robotoSlab font-medium whitespace-nowrap'>
          Quantity :{" "}
        </p>
        <div className='  flex justify-center items-center gap-x-2 '>
          <div
            className={`py-1 px-2  ${
              quantity === 1
                ? " pointer-events-none opacity-50"
                : " cursor-pointer hover:bg-[#e4d8d6] rounded-sm"
            }`}
            onClick={() => handleQuantity("minus")}
          >
            <Minus size={20} className='stroke-customYellow' />
          </div>
          <div className='text-[#414549] text-lg font-medium font-robotoSlab'>
            {quantity}
          </div>
          <div
            className='py-1 px-2 cursor-pointer hover:bg-[#e4d8d6] rounded-sm'
            onClick={() => handleQuantity("plus")}
          >
            <Plus size={20} className='text-customYellow' />
          </div>
        </div>
        <p
          className={`text-[12px]  font-robotoSlab ${
            data?.availability ? "text-green-500" : "text-destructive"
          }`}
        >
          {data?.availability ? "Available" : "Not Available"}
        </p>
      </div>
      <AddToCart data={organizedForCart} quantity={quantity} type='plus' />
    </>
  );
}

export default CartBlock;
