"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Link as LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function DishImageLoader({ data }) {
  return (
    <div className='w-full h-44 md:h-56 relative group rounded-[16px] overflow-hidden'>
      {data?.image_url ? (
        <Image
          fill
          src={data?.image_url}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          alt={data?.name}
          className='absolute object-cover  object-center rounded-t-[16px]'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL={imageKitLoader({
            src: data?.image_url,
            width: 10,
            quality: 60,
            blur: 10,
          })}
        />
      ) : (
        <Image
          fill
          src='/sample-folder/placeholder-1.png'
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center rounded-t-[16px]'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL={imageKitLoader({
            src: "/sample-folder/placeholder-1.png",
            width: 10,
            quality: 60,
            blur: 10,
          })}
        />
      )}

      <div className='absolute inset-0 z-10 w-full h-full flex justify-center items-center bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover:opacity-100 group-hover:bg-slate-800/60'>
        <div className='border-0 group-hover:border-[3px] border-customYellow p-2 rotate-45  hover:bg-customYellow transition-all duration-200 ease-linear cursor-pointer '>
          <Link href={`/foodItems/${data?.id}`}>
            <LinkIcon
              className='text-white font-bold w-0 group-hover:w-full transition-width duration-300 ease-linear'
              size={20}
              strokeWidth={4}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DishImageLoader;
