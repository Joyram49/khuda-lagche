"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

import { LuClock } from "react-icons/lu";

function FavImageLoader({ data }) {
  return (
    <div className='w-full h-44 md:h-56 cursor-pointer rounded-t-[16px] relative  overflow-hidden'>
      {data?.imageUrl ? (
        <Image
          fill
          src={data?.imageUrl}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  group-hover:scale-110 transition-transform duration-150 ease-linear '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          fill
          src='/sample-folder/image.png'
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  group-hover:scale-110 transition-transform duration-150 ease-linear '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}

      <div className='absolute bottom-2 right-2 px-2 py-1 bg-backgroundF rounded-md flex justify-center items-center text-sm font-robotoSlab gap-x-1 drop-shadow-sm border[1px] border-border dark:border-borderF'>
        <LuClock />
        <span>{data.delivery_time}</span>
      </div>
    </div>
  );
}

export default FavImageLoader;
