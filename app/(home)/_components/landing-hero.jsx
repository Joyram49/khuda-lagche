import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DotButton,
} from "@/components/ui/carousel";
import { CalendarClock, Store, TabletSmartphone, Truck } from "lucide-react";
import Link from "next/link";
import CarouselImageLoader from "./carousel-image-loader";

const imageData = [
  {
    title: "Order takeaway online",
    src: "heroImage/hero-image11.jpg",
  },
  {
    title: "Order2 takeaway online",
    src: "heroImage/hero-image10.jpg",
  },
  {
    title: "Order3 takeaway online",
    src: "heroImage/hero-image3.jpg",
  },
];
export function LandingHeroCarousel() {
  return (
    <Carousel className='w-full' opts={{ align: "center", loop: true }}>
      <CarouselContent>
        {imageData.map((image, index) => (
          <CarouselItem
            key={index}
            className='w-screen min-h-[calc(100vh-124px)]   md:min-h-[calc(100vh-112px)]'
          >
            <CarouselImageLoader image={image} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className=' h-16 w-16 left-5 hidden sm:flex bg-[#fff3] border-none text-white' />
      <CarouselNext className='  h-16 w-16 right-5 hidden sm:flex bg-[#fff3] border-none text-white' />
      {/* carousel dot buttons  */}
      <div className='absolute left-[50%] top-[95%] translate-x-[-50%] flex gap-x-2 '>
        <DotButton
          bg={true}
          className='h-[6px] w-[6px] rounded-full   appearance-none  touch-manipulation  cursor-pointer border-none p-0 m-0 flex justify-center items-center outline outline-2 outline-offset-1 outline-background'
        />
      </div>

      {/* carousel brand icons with title */}
      <div className='w-full  hidden lg:flex justify-center items-center absolute top-[80%] left-[50%] translate-x-[-50%]'>
        <div className='w-full lg:w-[80%]  grid grid-cols-4  divide-x-[1px]  divide-dotted font-medium  text-gray-50 '>
          <div className='text-base 2xl:text-lg uppercase'>
            <Link
              href='#'
              className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
            >
              <CalendarClock className='' />
              <h1 className='text-center '>24/7 delivery</h1>
            </Link>
          </div>
          <div className='text-base 2xl:text-lg uppercase'>
            <Link
              href='#'
              className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
            >
              <Store />
              <h1 className='text-center'>2500 Restaurants</h1>
            </Link>
          </div>
          <div className='text-base 2xl:text-lg uppercase'>
            <Link
              href='#'
              className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
            >
              <TabletSmartphone />
              <h1 className='text-center'>Order with app</h1>
            </Link>
          </div>
          <div className='text-base 2xl:text-lg uppercase'>
            <Link
              href='#'
              className='flex justify-center items-center gap-x-2 lg:gap-x-4 hover:text-hoverYellow transition duration-300 ease-linear'
            >
              <Truck />
              <h1 className='text-center'>Fast delivery</h1>
            </Link>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
