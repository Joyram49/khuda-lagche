"use client";
import { Card, CardContent } from "@/components/ui/card";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Info, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function GalleryCard({ data, selectImage }) {
  return (
    <Card
      className={` w-full max-w-xs shadow-lg rounded-[16px] overflow-hidden justify-self-center `}
    >
      <CardContent className='p-0 h-auto'>
        <div className='relative aspect-[4/3] group/image'>
          <Image
            fill
            src={data?.src}
            loader={({ src, width }) =>
              imageKitLoader({ src, width: 400, quality: 60 })
            }
            alt={`gallery-image${data.id}`}
            className='object-cover object-center rounded-t-[16px]'
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
          <div className='absolute inset-0 z-10 w-full h-full flex justify-center items-center gap-x-2 bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover/image:opacity-100 group-hover/image:bg-slate-800/60'>
            <div
              onClick={() => selectImage(data)}
              className='w-10 h-10 rounded-full bg-white -translate-x-6 group-hover/image:translate-x-0 transition-all duration-200 ease-linear flex justify-center items-center group/icon cursor-pointer'
            >
              <Search
                className='text-white font-bold fill-none stroke-slate-950 group-hover/icon:stroke-customYellow transition-all duration-200 ease-linear'
                size={20}
                strokeWidth={2}
              />
            </div>
            <Link
              href='#'
              className='w-10 h-10 rounded-full bg-white translate-x-6 group-hover/image:translate-x-0 transition-all duration-200 ease-linear flex justify-center items-center group/icon'
            >
              <Info
                className='text-white font-bold fill-slate-900 group-hover/icon:fill-customYellow transition-all duration-200 ease-linear'
                size={20}
                strokeWidth={2}
              />
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default GalleryCard;
