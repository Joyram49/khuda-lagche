"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Heart, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ArticleImageLoader({ data }) {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className='w-full h-44 relative group/image'>
      <Image
        src={data?.imageUrl}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 400, quality: 60 })
        }
        alt={data?.title}
        fill
        className='absolute object-cover  object-center rounded-t-[16px]'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='absolute inset-0 z-10 w-full h-full flex justify-center items-center gap-x-2 bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover/image:opacity-100 group-hover/image:bg-slate-800/60'>
        <div className='flex flex-col justify-center items-center space-y-2'>
          <Link
            href='#'
            className='w-10 h-10 rounded-full bg-white -translate-x-6 group-hover/image:translate-x-0 transition-all duration-200 ease-linear flex  justify-center items-center  group/icon scroll-smooth'
            onClick={handleScrollToTop}
          >
            <MessageCircleMore
              className='text-white font-bold fill-slate-900 group-hover/icon:fill-customYellow transition-all duration-200 ease-linear'
              size={20}
              strokeWidth={2}
            />
          </Link>
          <p className='font-robotoSlab font-medium text-customYellow'>
            {data.comment}
          </p>
        </div>
        <div className='flex flex-col justify-center items-center  space-y-2'>
          <Link
            href='#'
            className='w-10 h-10 rounded-full bg-white translate-x-6 group-hover/image:translate-x-0 transition-all duration-200 ease-linear flex  justify-center items-center  group/icon'
            onClick={handleScrollToTop}
          >
            <Heart
              className='text-white font-bold fill-slate-900 group-hover/icon:fill-customYellow transition-all duration-200 ease-linear'
              size={20}
              strokeWidth={2}
            />
          </Link>
          <p className=' font-robotoSlab font-medium text-customYellow'>
            {data.favorite}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ArticleImageLoader;
