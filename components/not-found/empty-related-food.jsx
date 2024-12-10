"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
function EmptyRelatedFood() {
  return (
    <div className='h-full flex flex-col gap-y-10 justify-center items-center p-2 '>
      <DotLottieReact
        src='https://lottie.host/9a7d045a-b75b-4937-ad5e-fca6c0e4bf56/HwAcvbu2IU.lottie'
        loop
        autoplay
        className='h-56'
      />
      <p className='font-robotoSlab font-medium text-pText'>
        No related food items found!
      </p>
    </div>
  );
}

export default EmptyRelatedFood;
