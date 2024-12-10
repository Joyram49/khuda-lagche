import { imageKitLoader } from "@/lib/imageKitLoader";
import Marker from "@/public/assets/marker-2.png";
import Image from "next/image";
import AboutLinks from "./about-links";
function AboutHero() {
  const bgImageUrl = imageKitLoader({
    src: "person/bg_woman.png",
    width: 1920,
    quality: 80,
  });
  return (
    <section className='h-auto min-h-[600px] w-full relative'>
      <div
        className={`absolute inset-0 w-full  bg-cover bg-center   flex justify-center items-center overflow-hidden`}
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      ></div>
      <div className='absolute inset-0 flex justify-center items-center'>
        <div className='container  flex justify-start items-center ml-0 lg:ml-[100px] xl:ml-[200px] 3xl:ml-[400px]'>
          <div className='h-full  max-w-sm lg:max-w-lg   flex flex-col justify-center items-center gap-y-6 md:gap-y-10 py-10 md:py-20'>
            <div className='flex flex-col  items-center text-center'>
              <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-gray-800 '>
                Welcome
              </h1>
              <p className=' text-gray-600 font-medium font-robotoSlab text-sm pt-1 sm:pt-2 capitalize '>
                Who we are
              </p>
            </div>
            <p className='text-[#9a9a9a] font-robotoSlab text-sm pt-1 sm:pt-2 text-center '>
              “Fooddy 24/7 is young fast growing company that works to make your
              life easier. We take responsibility for making sure that your
              orders from restaurants are delivered to you safely and quickly.”
            </p>
            <div className='h-[32px] w-full relative'>
              <Image
                fill
                src={Marker}
                alt='marker'
                className='absolute object-contain'
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <AboutLinks />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
