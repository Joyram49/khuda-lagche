"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className='min-h-screen w-full flex flex-col justify-center items-center '>
      {/* Animation */}
      <div className=' w-36 h-36 md:w-64 md:h-64 '>
        <DotLottieReact
          src='https://lottie.host/53235c0b-98d6-441f-8fb8-c565d95a2c25/kPvtrxOTed.lottie'
          loop
          autoplay
        />
      </div>

      {/* Text */}
      <div className='text-center mt-6'>
        <h1 className='text-4xl font-bold text-gray-800'>
          Oops! Food Not Found
        </h1>
        <p className='mt-2 text-gray-600'>
          The page you're looking for isn't available. It might have been
          removed or the link is incorrect.
        </p>
      </div>

      {/* Return Button */}
      <Link href={"/"}>
        <RippleButton size='' className='my-6  flex items-center gap-x-2'>
          Back To
          <Home size={18} />
        </RippleButton>
      </Link>
    </div>
  );
}
