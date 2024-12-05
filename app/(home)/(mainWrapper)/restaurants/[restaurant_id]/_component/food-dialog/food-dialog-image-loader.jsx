"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function FoodDialogImageLoader({ data }) {
  return (
    <div className='w-full h-44 md:h-56 relative group'>
      {data?.image_url ? (
        <Image
          fill
          src={data?.image_url}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover object-center'
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
          className='absolute object-cover object-center'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default FoodDialogImageLoader;
