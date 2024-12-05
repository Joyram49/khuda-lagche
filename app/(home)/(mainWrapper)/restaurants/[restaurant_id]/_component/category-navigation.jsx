"use client";

import { useHeaderHeight } from "@/app/hooks/useHeaderHeight";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function CategoryNavigation({
  uniqueCategories,
  activeCategory,
  handleScrollToCategory,
}) {
  const { headerHeight } = useHeaderHeight(); // Get the updated header height

  return (
    <div
      className='w-full bg-slate-50 ring-[1px] drop-shadow-sm ring-slate-900/10 py-2 font-robotoSlab font-medium text-foreground flex justify-center items-center backdrop-blur-sm'
      style={{
        position: "sticky",
        top: headerHeight, // Stick below the header dynamically
        zIndex: 40,
        transition: "top 0.3s ease", // Smooth transition when top changes
      }}
    >
      <Carousel
        className='container max-w-2xl overflow-hidden'
        opts={{ align: "start", loop: true }}
      >
        <CarouselContent className='w-full'>
          {uniqueCategories?.map((category) => (
            <CarouselItem
              key={category?.id}
              className='basis-1/2 xs:basis-1/3 md:basis-1/4 lg:basis-1/6 flex justify-center mx-4'
            >
              <Button
                variant='ghost'
                className={`cursor-pointer flex-1 ${
                  activeCategory === category?.id
                    ? "text-customYellow"
                    : "text-primary"
                } hover:text-customYellow`}
                onClick={() => handleScrollToCategory(category?.id)}
              >
                {category?.name}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='absolute left-0 top-1/2 transform -translate-y-1/2 invisible md:visible' />
        <CarouselNext className='absolute right-0 top-1/2 transform -translate-y-1/2 invisible md:visible' />
      </Carousel>
    </div>
  );
}

export default CategoryNavigation;
