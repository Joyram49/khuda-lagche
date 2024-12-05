"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";
function TestimonialImageLoader({ data }) {
  return (
    <div className='w-24 h-24 rounded-full bg-gradient-to-r to-customYellow from-destructive  overflow-hidden relative'>
      <div className='absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[90%] h-[90%] rounded-full'>
        <Image
          fill
          src={data.imageUrl}
          loader={
            ({ src, width }) =>
              imageKitLoader({ src, width: 100, quality: 100 }) // Use smaller width and quality for optimization
          }
          alt={data.name}
          className='absolute inset-0 object-cover object-center rounded-full'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
    </div>
  );
}

export default TestimonialImageLoader;
