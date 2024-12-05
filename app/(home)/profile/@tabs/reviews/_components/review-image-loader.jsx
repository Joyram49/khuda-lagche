"use client";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function ReviewImageLoader({ src, alt }) {
  return (
    <div className='min-w-24 h-20   relative rounded-sm overflow-hidden '>
      {src ? (
        <Image
          fill
          src={src}
          alt={alt}
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
          alt={alt}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute object-cover  object-center  '
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default ReviewImageLoader;
