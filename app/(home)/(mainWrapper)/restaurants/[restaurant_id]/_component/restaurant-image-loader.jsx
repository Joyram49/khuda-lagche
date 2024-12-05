"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Plus } from "lucide-react";
import Image from "next/image";

function RestaurantFoodImageLoader({ data }) {
  return (
    <div className=' h-36 aspect-square rounded-[16px]   relative  drop-shadow-sm overflow-hidden '>
      {data?.image_url ? (
        <Image
          fill
          src={data?.image_url}
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
          src='/sample-folder/placeholder-1.png'
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  group-hover:scale-110 transition-transform duration-150 ease-linear '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}

      <div className='hidden absolute inset-0 z-10 w-full h-full md:flex justify-center items-center bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover:opacity-100 group-hover:bg-slate-800/60'>
        <div className='border-0 group-hover:border-[3px] border-customYellow p-2 rounded-full  hover:bg-customYellow transition-all duration-200 ease-linear cursor-pointer '>
          <Plus
            className='text-white font-bold w-0 group-hover:w-full transition-width duration-300 ease-linear'
            size={20}
            strokeWidth={4}
          />
        </div>
      </div>

      <div className='absolute bottom-2 right-2 bg-white border border-[#f16721] p-1 rounded-full   group/plus hover:scale-105 transition-transform duration-150 ease-linear  md:hidden '>
        <Plus
          className='text-destructive font-bold w-full group-hover/plus:w-[105%] transition-transform duration-150 ease-linear'
          size={18}
          strokeWidth={2}
        />
      </div>
    </div>
  );
}

export default RestaurantFoodImageLoader;
