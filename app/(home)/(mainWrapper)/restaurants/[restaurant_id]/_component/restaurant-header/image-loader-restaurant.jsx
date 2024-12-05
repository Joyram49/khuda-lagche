"use client";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function ImageLoaderRestaurant({ data }) {
  return (
    <div className='w-full md:w-48 h-36 rounded-md shadow-md overflow-hidden relative'>
      {data?.imageUrl ? (
        <Image
          fill
          src={data?.imageUrl}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 80 })
          }
          className='absolute object-cover  object-center  '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          fill
          src='/sample-folder/image.png'
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 80 })
          }
          className='absolute object-cover  object-center   '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default ImageLoaderRestaurant;
