"use client";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function OrderImageLoader({ food: data }) {
  return (
    <div className='min-w-24 aspect-square  relative overflow-hidden rounded-sm '>
      {data?.image_url ? (
        <Image
          fill
          src={data?.image_url}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  '
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
          className='absolute object-cover  object-center '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default OrderImageLoader;
