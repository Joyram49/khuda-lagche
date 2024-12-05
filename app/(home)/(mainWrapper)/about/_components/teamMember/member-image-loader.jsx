"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function MemberImageLoader({ name, imageUrl }) {
  return (
    <div className='w-full aspect-[6/5] relative group'>
      <Image
        fill
        src={imageUrl}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 400, quality: 60 })
        }
        alt={name}
        className='absolute object-cover  object-center '
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='h-full w-full bg-[#414549b3] absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-linear' />
      <div className='h-full w-full absolute inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-x-1 transition-all duration-100 ease-linear'>
        <span className='w-[6px] h-[6px] rounded-full bg-customYellow translate-x-4 group-hover:translate-x-0 transition-transform duration-300 ease-linear'></span>
        <span className='w-[6px] h-[6px] rounded-full bg-customYellow'></span>
        <span className='w-[6px] h-[6px] rounded-full bg-customYellow -translate-x-4 group-hover:translate-x-0 transition-transform duration-300 ease-linear'></span>
      </div>
    </div>
  );
}

export default MemberImageLoader;
