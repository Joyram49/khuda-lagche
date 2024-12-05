"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function RelatedFoodImageLoader({ data }) {
  return (
    <div className='w-full h-24 aspect-video cursor-pointer rounded-md relative  overflow-hidden'>
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
    </div>
  );
}

export default RelatedFoodImageLoader;
