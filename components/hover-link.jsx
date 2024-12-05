"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

function HoverLink({ text, link }) {
  const handleScrollToTop = (e) => {
    if (link === "#") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };
  return (
    <Link
      href={link === "#" ? "" : `/${link}`}
      className='flex justify-between items-center  text-muted-foreground  font-semibold font-robotoSlab text-sm pt-1 sm:pt-2  group min-w-fit overflow-hidden relative  px-6 '
      onClick={handleScrollToTop}
    >
      <div className='absolute left-[50%] opacity-0  group-hover:opacity-100 group-hover:left-[91%] transition-all duration-300 ease-linear'>
        <ChevronRight
          size={14}
          strokeWidth={4}
          className='stroke-gray-600 group-hover:stroke-destructive '
        />
      </div>
      <p className='hover:text-destructive transition-colors duration-200 ease-linear'>
        {text}
      </p>

      <div className='absolute right-0 opacity-100  translate-x-0 group-hover:opacity-0 group-hover:translate-x-6 transition-all  duration-200 ease-linear z-20'>
        <ChevronRight
          size={14}
          strokeWidth={4}
          className='stroke-gray-600 group-hover:stroke-destructive '
        />
      </div>
    </Link>
  );
}

export default HoverLink;
