import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  DotButton,
} from "@/components/ui/carousel";
import getFormatedTime from "@/lib/getFormatedTime";
import TestimonialImageLoader from "./testimonial-image-loader";

const carourelData = [
  {
    id: 1,
    name: "Christian Buehner",
    imageUrl: "person/person-3.jpg",
    comment:
      "“ We are a very busy restaurant and Khuda-Lagche 24/7 gives our customers a really easy way to order, pay and get their food so they can beat the line and beat that lunch rush.”",
    publishedOn: "2024-08-23T00:00:00.000Z",
  },
  {
    id: 2,
    name: "Eric Lucerato",
    imageUrl: "person/person-6.jpg",
    comment:
      "“ Your website was very easy to navigate, service was prompt and staff was very pleasant. I will definitely use your service again, and I have already recommended it to a friends.”",
    publishedOn: "2024-07-18T00:00:00.000Z",
  },
  {
    id: 3,
    name: "Sander Weeteling",
    imageUrl: "person/person-5.jpg",
    comment:
      "“ Khuda-Lagche 24/7 has the best application for online ordering. Fantastic choices of restaurants, low delivery price and great customer service.”",
    publishedOn: "2024-06-07T00:00:00.000Z",
  },
];

function TestimonialCarousel({ bg }) {
  return (
    <Carousel className='w-full ' opts={{ align: "center", loop: true }}>
      <CarouselContent className=''>
        {carourelData.map((data) => (
          <CarouselItem key={data.id}>
            <div className='w-full md:w-[60%] h-full flex flex-col justify-center items-center mx-auto gap-y-6 '>
              <p
                className={` text-sm md:text-lg font-medium font-robotoSlab ${
                  bg ? "text-white" : "text-muted-foreground"
                } text-center`}
              >
                {data.comment}
              </p>
              <div className='flex flex-col justify-center items-center gap-y-3'>
                <TestimonialImageLoader data={data} />
                <div className='flex justify-center items-center gap-x-4 text-customYellow font-medium font-robotoSlab'>
                  <h3>{data.name},</h3>
                  <p>{getFormatedTime(data.publishedOn)}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious
        className={`top-[10%] h-16 w-16 left-5 hidden sm:flex border-none ${
          bg
            ? "bg-[#fff3] text-white"
            : "text-pText bg-topBackground hover:text-white hover:bg-[#414549]  border-[1px] border-border dark:border-borderF"
        } transition-all duration-100 ease-linear`}
      />
      <CarouselNext
        className={`top-[10%] h-16 w-16 right-5 hidden sm:flex border-none ${
          bg
            ? "bg-[#fff3] text-white"
            : "text-pText bg-topBackground hover:text-white hover:bg-[#414549] border-[1px] border-border dark:border-borderF"
        } transition-all duration-100 ease-linear`}
      />

      {/* carousel dot buttons  */}
      <div className='absolute left-[50%] -bottom-[24px] translate-x-[-50%] flex gap-x-2'>
        <DotButton
          bg={bg}
          className={`h-[6px] w-[6px] rounded-full  appearance-none  touch-manipulation  cursor-pointer border-none p-0 m-0 flex justify-center items-center outline outline-2 outline-offset-1 ${
            bg ? "outline-white" : "outline-secondary dark:outline-white"
          }`}
        />
      </div>
    </Carousel>
  );
}

export default TestimonialCarousel;
