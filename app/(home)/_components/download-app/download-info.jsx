import Link from "next/link";
import { FaApple, FaGooglePlay } from "react-icons/fa";

function DownloadInfo() {
  return (
    <div className='mt-20  lg:w-[70%] flex flex-col items-start justify-center '>
      <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-deepBackground mb-10 xl:w-3xl  3xl:w-auto'>
        Get Your Favorite Food Fast with the App
      </h1>
      <div className='flex flex-col xl:flex-row justify-center items-start  gap-y-6 xl:gap-x-6'>
        <Link
          href='#'
          className='flex justify-center items-center gap-x-3 text-white hover:text-hoverYellow transition duration-200 ease-linear'
        >
          <FaApple size={32} className='self-start' />
          <p className='capitalize font-robotoSlab md:text-lg text-shadow-md '>
            Download on the app store
          </p>
        </Link>
        <Link
          href='#'
          className='flex justify-center items-center gap-x-3 text-white hover:text-hoverYellow transition duration-200 ease-linear'
        >
          <FaGooglePlay size={32} className='self-start' />

          <p className='capitalize font-robotoSlab md:text-lg text-shadow-md'>
            android app on the google play
          </p>
        </Link>
      </div>
    </div>
  );
}

export default DownloadInfo;
