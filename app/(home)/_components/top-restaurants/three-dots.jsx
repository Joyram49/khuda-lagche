"use client";

import { useRouter } from "next/navigation";

function ThreeDots({ data }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/restaurants/${data?.id}`);
  };
  return (
    <div
      className='h-full w-full absolute inset-0 opacity-0 group-hover:opacity-100 flex justify-center items-center gap-x-1 transition-all duration-100 ease-linear'
      onClick={handleClick}
    >
      <span className='w-[6px] h-[6px] rounded-full bg-customYellow translate-x-4 group-hover:translate-x-0 transition-transform duration-300 ease-linear'></span>
      <span className='w-[6px] h-[6px] rounded-full bg-customYellow'></span>
      <span className='w-[6px] h-[6px] rounded-full bg-customYellow -translate-x-4 group-hover:translate-x-0 transition-transform duration-300 ease-linear'></span>
    </div>
  );
}

export default ThreeDots;
