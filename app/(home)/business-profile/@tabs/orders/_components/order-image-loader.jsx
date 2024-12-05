"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function OrderImageLoader({ food }) {
  return (
    <div className='min-w-24 aspect-square  relative '>
      <Image
        fill
        alt={food.foodName}
        src={food?.imageUrl}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 400, quality: 60 })
        }
        className='absolute object-cover  object-center'
      />
    </div>
  );
}

export default OrderImageLoader;
