"use client";
import RippleButton from "@/components/ripple-effect";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";
import Link from "next/link";

function CarouselImageLoader({ image }) {
  return (
    <div className='w-full h-full relative'>
      <Image
        fill
        src={image.src}
        alt={image.title}
        loader={({ src, width }) =>
          imageKitLoader({ src, width: 1920, quality: 60 })
        }
        className='absolute  w-full h-full object-cover object-center'
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
      />
      <div className='z-100 absolute inset-0 bg-gradient-radial from-transparent via-black/40 to-black/50'></div>
      <div className='absolute top-[50%] left-[10%] sm:top-[50%] lg:top-[30%] sm:left-[30%] lg:left-[50%] lg:translate-x-[-50%] translate-y-[-50%] flex justify-center items-start sm:items-center flex-col gap-2'>
        <h1
          className={`text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl font-semibold font-robotoSlab uppercase text-gray-200`}
        >
          {image.title}
        </h1>
        <p className='text-sm text-gray-200 capitalize md:text-lg xl:text-3xl '>
          from your favourite restaurants
        </p>
        <div className='mt-2 sm:mt-6 lg:mt-10'>
          <Link href={"/foodItems"}>
            <RippleButton variant='warning' size='custom'>
              Order Food
            </RippleButton>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarouselImageLoader;
