import { imageKitLoader } from "@/lib/imageKitLoader";
import Foodapp from "@/public/assets/images/icons/image-53.png";
import Image from "next/image";
import DownloadInfo from "./download-info";
function DownloadApp() {
  // Generate the optimized background image URL
  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image10.jpg",
    width: 1920,
    quality: 30,
  });
  return (
    <section
      className={`h-auto min-h-screen md:min-h-[60vh] min-w-full bg-cover bg-center drop-shadow-md relative`}
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className='h-full w-full bg-black/40 backdrop-blur-sm absolute inset-0' />
      <div className='h-full w-full absolute inset-0 z-10 '>
        <div className='container h-full text-white'>
          <div className='h-full w-full flex flex-col md:flex-row  justify-between md:items-center lg:gap-x-20 2xl:gap-x-40 '>
            <DownloadInfo />
            <div className='hidden md:block md:self-end  lg:w-[30%]'>
              <Image src={Foodapp} alt='food app icon' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DownloadApp;
