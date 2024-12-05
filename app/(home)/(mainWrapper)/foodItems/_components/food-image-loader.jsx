"use client";
import { LuClock } from "react-icons/lu";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function FoodImageLoader({ data }) {
  return (
    <div className='w-full h-44 md:h-56 cursor-pointer rounded-t-[16px] relative  overflow-hidden'>
      {data?.image_url ? (
        <Image
          fill
          src={data?.image_url}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          alt={data?.name}
          className='absolute object-cover  object-center  group-hover:scale-110 transition-transform duration-150 ease-linear '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          fill
          src='/sample-folder/placeholder-1.png'
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  group-hover:scale-110 transition-transform duration-150 ease-linear '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}

      <div className='absolute bottom-2 right-2 px-2 py-1 bg-background rounded-md flex justify-center items-center text-sm font-robotoSlab gap-x-1 drop-shadow-sm'>
        <LuClock />
        <span>{data.preparation_time}</span>
      </div>
    </div>
  );
}

export default FoodImageLoader;
