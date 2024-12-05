import { imageKitLoader } from "@/lib/imageKitLoader";
import TestimonialCarousel from "./testimonial-carousel";

function Testimonials({ bg }) {
  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image5.jpg",
    width: 1920,
    quality: 30,
  });
  return (
    <section
      className='w-full h-auto bg-cover bg-center relative drop-shadow-md'
      style={{
        backgroundImage: bg ? `url(${bgImageUrl})` : "bg-background",
      }}
    >
      {bg && (
        <div className='h-full w-full bg-[#7e7e53c2] backdrop-blur-sm absolute inset-0' />
      )}
      <div
        className={`container ${bg && "h-full overflow-hidden z-10 relative"}`}
      >
        <div className=' h-full flex flex-col  justify-center items-center gap-y-10 md:gap-y-20 py-10 md:py-20'>
          {/* Testimonial header */}
          <div className='flex flex-col items-center text-center'>
            <h1
              className={`text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase ${
                bg ? "text-card" : "text-foreground"
              } `}
            >
              client about us
            </h1>
            <p
              className={` ${
                bg ? "text-accent" : "text-muted-foreground"
              } font-medium font-robotoSlab text-sm pt-1 sm:pt-2 `}
            >
              Testimonials
            </p>
          </div>
          <TestimonialCarousel bg={bg} />
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
