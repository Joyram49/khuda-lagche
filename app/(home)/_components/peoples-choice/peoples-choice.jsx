import { imageKitLoader } from "@/lib/imageKitLoader";
import HandPhone from "@/public/assets/phone_img.png";
import Image from "next/image";

const reasons = [
  {
    rank: 1,
    title: "30,000 Restaurants Menus",
    description:
      "We’re working with many restaurants in your city to put food all in one place.",
  },
  {
    rank: 2,
    title: "Easy Order By Phone",
    description:
      "This allows you to order quickly and easily. Accessible at any time.",
  },
  {
    rank: 3,
    title: "Free Mobile Application",
    description:
      "Mobile App allows you to choose restaurant, view price and check order.",
  },
  {
    rank: 4,
    title: "Easy Online Ordering",
    description:
      "Once logged in, you can easily navigate around the site to complete your order.",
  },
  {
    rank: 5,
    title: "100% positive feedbacks",
    description:
      "We care about our customers, that is why we get 100% positive feedbacks.",
  },
  {
    rank: 6,
    title: "Fast Guaranteed Delivery",
    description:
      "We take responsibility for making sure that order are delivered to you safely..",
  },
];
function PeoplesChoice({ bg }) {
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
        <div className='h-full w-full bg-black/55 backdrop-blur-sm absolute inset-0' />
      )}
      <div
        className={`container ${bg && "h-full overflow-hidden z-10 relative"}`}
      >
        <div className=' h-full w-full  flex-col  flex justify-around items-center gap-y-10 sm:gap-y-20 py-10 md:py-20'>
          {/* peoples choice header */}
          <div className='flex flex-col  items-center text-center'>
            <h1
              className={`text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase ${
                bg ? "text-background" : "text-foreground"
              } `}
            >
              Why People <span className='text-hoverYellow'>Choose</span> us
            </h1>
            <p
              className={` ${
                bg ? "text-accent" : "text-muted-foreground"
              } font-medium font-robotoSlab text-sm pt-1 sm:pt-2 `}
            >
              Clients’ Most Popular Choise
            </p>
          </div>
          {/* peoples choice card content */}
          <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-x-10 gap-y-2 sm:gap-y-10 justify-center items-center'>
            {/*   First Column: First three reasons */}
            <div className='max-w-xs order-2 lg:order-1  flex flex-col   gap-y-2 sm:gap-y-6 md:gap-y-10 '>
              {reasons.slice(0, 3).map((reason) => (
                <div
                  key={reason.rank}
                  className='flex flex-col items-start lg:items-end  gap-y-2'
                >
                  <div className='flex lg:flex-row-reverse items-center gap-x-4'>
                    <h1 className='w-10 h-10 bg-deepBackground rounded-full flex justify-center items-center text-lg font-robotoSlab font-medium'>
                      {reason.rank}
                    </h1>
                    <h2
                      className={`text-base md:text-lg font-robotoSlab font-medium ${
                        bg ? "text-white" : "text-primary"
                      }`}
                    >
                      {reason.title}
                    </h2>
                  </div>
                  <p
                    className={`text-sm ${
                      bg ? "text-muted" : "text-muted-foreground"
                    } font-robotoSlab hidden sm:block`}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Second Column: Image */}
            <div className='col-span-full lg:col-span-1 order-1 lg:order-2 flex justify-center items-center b  '>
              <Image
                src={HandPhone}
                alt='Image Description'
                width={500}
                height={300}
                style={{ width: "auto" }}
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>

            {/* Third Column: Last three reasons */}
            <div className='max-w-xs flex flex-col gap-y-2 sm:gap-y-6 md:gap-y-10 order-3 sm:justify-self-end'>
              {reasons.slice(3).map((reason) => (
                <div
                  key={reason.rank}
                  className='flex flex-col items-start gap-y-2'
                >
                  <div className='flex items-center gap-x-2'>
                    <h1 className='w-10 h-10 bg-deepBackground rounded-full flex justify-center items-center text-lg font-robotoSlab font-medium'>
                      {reason.rank}
                    </h1>
                    <h2
                      className={`text-base md:text-lg font-robotoSlab font-medium ${
                        bg ? "text-white" : "text-primary"
                      }`}
                    >
                      {reason.title}
                    </h2>
                  </div>
                  <p
                    className={`text-sm ${
                      bg ? "text-muted" : "text-muted-foreground"
                    } font-robotoSlab hidden sm:block`}
                  >
                    {reason.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PeoplesChoice;
