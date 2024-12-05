"use client";
import { handleScrollToTop } from "@/lib/scrollToTop";
import { Store, TabletSmartphone } from "lucide-react";
import Link from "next/link";
function AboutLinks() {
  return (
    <div className='flex flex-col lg:flex-row justify-center items-start lg:items-center gap-y-3 lg:gap-y-0 gap-x-10 text-initial font-medium font-robotoSlab lg:divide-x-[1px] divide-[#9a9a9a] divide-dotted pt-10'>
      <div className='text-base 2xl:text-lg uppercase '>
        <Link
          href='#'
          className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
          onClick={handleScrollToTop}
        >
          <Store />
          <span className='text-center'>2500 Restaurants</span>
        </Link>
      </div>
      <div className='text-base 2xl:text-lg uppercase lg:pl-10'>
        <Link
          href='#'
          className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
          onClick={handleScrollToTop}
        >
          <TabletSmartphone />
          <span className='text-center'>Order with app</span>
        </Link>
      </div>
    </div>
  );
}

export default AboutLinks;
