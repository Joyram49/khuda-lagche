import {
  DialogClose,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { X } from "lucide-react";
import FoodDialogImageLoader from "./food-dialog-image-loader";
import ModalCartBlock from "./modal-cart-block";

function FoodDialog({ data }) {
  return (
    <>
      <FoodDialogImageLoader data={data} />
      <div className='p-6 pt-4 flex flex-col space-y-4'>
        <DialogTitle className='font-robotoSlab font-[500]'>
          {data?.name}
        </DialogTitle>
        <DialogDescription className='text-sm font-robotoSlab text-pText '>
          {data?.description}
        </DialogDescription>
        <div className='flex justify-between items-center'>
          <span className='font-medium text-base'>TK {data?.price}</span>
          <span
            className={`${
              data?.availability ? "bg-[#3ca52e]" : "bg-destructive"
            } text-pText px-3 py-1 my-1 rounded-full font-inter text-[12px]`}
          >
            {data?.availability ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        <ModalCartBlock data={data} />
      </div>
      <DialogClose asChild>
        <button
          aria-label='Close'
          className='absolute top-2 right-2 bg-white hover:bg-destructive hover:border-[#f16721] border border-[#f16721] p-1 rounded-full   group hover:scale-105 transition-all duration-150 ease-linear'
        >
          <X
            className='w-6 h-6 text-destructive group-hover:text-white font-bold'
            strokeWidth={2}
          />
        </button>
      </DialogClose>
    </>
  );
}

export default FoodDialog;
