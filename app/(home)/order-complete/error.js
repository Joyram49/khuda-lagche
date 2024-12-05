"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function FoodItemError({ error }) {
  return (
    <div className='flex flex-col justify-center items-center mb-20 max-h-fit'>
      <DotLottieReact
        src='https://lottie.host/08028ea1-7fb1-4a5e-ae58-172de6d40d57/S5sjsYYgSa.lottie'
        loop
        autoplay
      />

      <h1 className='font-medium font-robotoSlab'>{error.message}</h1>
    </div>
  );
}

export default FoodItemError;
