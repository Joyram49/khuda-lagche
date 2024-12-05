"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

import { LuClock } from "react-icons/lu";

function RestaurantImageLoader({ data, business }) {
  return (
    <div className='w-full h-44 md:h-56 cursor-pointer rounded-t-[16px] relative  overflow-hidden'>
      <Image
        fill
        src={data?.thumbnail}
        alt={data?.name}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 400, quality: 60 })
        }
        className='absolute inset-0 object-cover  object-center  group-hover:scale-110  transition-transform duration-150 ease-linear '
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      {!business && (
        <div className='absolute bottom-2 right-2 px-2 py-1 bg-background rounded-md flex justify-center items-center text-sm font-robotoSlab gap-x-1 drop-shadow-sm'>
          <LuClock />
          <span>{data.delivery_time}</span>
        </div>
      )}
    </div>
  );
}

export default RestaurantImageLoader;
