"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function BusinessImageLoader({ data }) {
  return (
    <div className='relative w-28 aspect-square rounded-full overflow-hidden mt-16'>
      {data?.profilePicture ? (
        <Image
          fill
          src={data?.profilePicture}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute inset-0 object-cover object-center'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          fill
          src={"/person/user_placeholder.png"}
          alt={data?.name}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          className='absolute inset-0 object-cover object-center'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default BusinessImageLoader;
