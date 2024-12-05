import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FoodContentCard from "../../../_components/food-content";

export default async function RelatedFoodSmallContainer({ relatedFoods = [] }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className='w-full max-w-4xl mb-10'
    >
      <CarouselContent className='ml-0 w-full'>
        {relatedFoods.map((food, index) => (
          <CarouselItem
            key={index}
            className=' sm:basis-1/2 lg:basis-1/3 flex justify-center items-center'
          >
            <div className='p-1 w-full xs:w-[60%] sm:w-full '>
              <FoodContentCard data={food} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='left-[45%] xs:left-[46%] -translate-x-1/2 top-[110%] sm:left-0 sm:translate-x-0 ' />
      <CarouselNext className='left-[60%] xs:left-[54%] -translate-x-1/2 top-[110%] sm:left-12 sm:translate-x-0' />
    </Carousel>
  );
}
