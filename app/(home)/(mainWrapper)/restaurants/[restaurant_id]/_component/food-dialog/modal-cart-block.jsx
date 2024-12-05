"use client";

import AddToCart from "@/components/add-to-cart";
import { DialogFooter } from "@/components/ui/dialog";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

function ModalCartBlock({ data }) {
  const [quantity, setQuantity] = useState(1);

  const organizedForCart = {
    foodItemId: data?.id,
    name: data?.name,
    restaurant: data?.restaurant,
  };
  const handleQuantity = (type) => {
    if (type === "minus") {
      setQuantity((prev) => prev - 1);
    } else {
      setQuantity((prev) => prev + 1);
    }
  };
  return (
    <DialogFooter className='w-full flex flex-row sm:justify-start gap-x-6'>
      <div className='flex gap-x-3 justify-start items-center'>
        <div
          className={`w-10 h-10 rounded-full bg-[#ee7031] flex justify-center items-center ${
            quantity === 1
              ? " pointer-events-none opacity-50"
              : " cursor-pointer hover:bg-[#bb6235]"
          }  transition-colors ease-linear duration-150 `}
          onClick={() => handleQuantity("minus")}
        >
          <Minus className='text-white' />
        </div>
        <p className='text-xl font-medium font-robotoSlab'>{quantity}</p>
        <div
          className='w-10 h-10 rounded-full bg-[#fd5602] flex justify-center items-center cursor-pointer hover:bg-[#bb6235] transition-colors ease-linear duration-150'
          onClick={() => handleQuantity("plus")}
        >
          <Plus className='text-white' />
        </div>
      </div>
      <AddToCart
        data={organizedForCart}
        quantity={quantity}
        type='plus'
        className={"bg-[#fd5602] w-full hover:bg-current"}
      />
    </DialogFooter>
  );
}

export default ModalCartBlock;
