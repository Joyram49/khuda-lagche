"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function CategoryImageLoader({ imageUrl, title, id }) {
  return (
    <div className='w-full h-44 md:h-56 aspect-square  relative group'>
      <Image
        fill
        src={imageUrl}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 400, quality: 60 })
        }
        alt={title}
        className='absolute object-cover object-center rounded-t-[16px]'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        placeholder='blur'
        blurDataURL={imageKitLoader({
          src: imageUrl,
          width: 10,
          quality: 60,
          blur: 10,
        })}
      />
      <div className='absolute inset-0 z-10 w-full h-full flex justify-center items-center bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover:opacity-100 group-hover:bg-slate-800/60'>
        <div className='border-[3px] border-customYellow p-2 rotate-45 group hover:bg-customYellow transition-all duration-300 ease-linear cursor-pointer'>
          <Link href={`/foodItems?categoryIds=${id}`}>
            <LinkIcon
              className='text-white font-bold transform'
              size={20}
              strokeWidth={4}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CategoryImageLoader;
