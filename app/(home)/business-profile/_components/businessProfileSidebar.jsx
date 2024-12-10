"use client";
import { Button } from "@/components/ui/button";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BusinessImageLoader from "./business-image-loader";
function BusinessProfileSidebar({ loggedInUser }) {
  const pathName = usePathname();
  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image12.jpg",
    width: 400,
    quality: 80,
  });
  return (
    <div className='lg:w-1/4 h-full  flex flex-col bg-topBackground '>
      <div className='border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-md overflow-hidden '>
        <div className='w-full flex flex-col'>
          <div className='w-full h-72 flex flex-col justify-center items-center gap-y-4 border-b-[1px] border-border dark:border-borderF drop-shadow-sm  pb-4 relative'>
            <div
              className='absolute top-0 left-0 h-36 w-full bg-cover bg-center'
              style={{
                backgroundImage: `url(${bgImageUrl})`,
              }}
            ></div>
            <BusinessImageLoader data={loggedInUser} />
            <div className='flex flex-col items-center '>
              <h1 className='text-pText font-medium font-robotoSlab'>
                {loggedInUser?.name}
              </h1>
              <p className='text-initial  font-robotoSlab'>
                {loggedInUser?.email}
              </p>
            </div>
          </div>
          <ul className='flex flex-col gap-y-2 mt-4 font-robotoSlab text-initial font-medium p-4'>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm cursor-pointer ${
                pathName === "/business-profile"
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0] dark:bg-topBackground"
                  : "bg-white text-pText border-transparent hover:bg-[#f9f9f9] hover:border-gray-300 dark:bg-topBackground dark:hover:bg-backgroundF dark:border-borderF"
              }`}
            >
              <Link href='/business-profile'>Profile</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm cursor-pointer ${
                pathName.includes("orders")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0] dark:bg-topBackground"
                  : "bg-white text-pText border-transparent hover:bg-[#f9f9f9] hover:border-gray-300 dark:bg-topBackground dark:hover:bg-backgroundF dark:border-borderF"
              }`}
            >
              <Link href='/business-profile/orders'>My Orders</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm  cursor-pointer ${
                pathName.includes("reviews")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0] dark:bg-topBackground"
                  : "bg-white text-pText border-transparent hover:bg-[#f9f9f9] hover:border-gray-300 dark:bg-topBackground dark:hover:bg-backgroundF dark:border-borderF"
              }`}
            >
              <Link href='/business-profile/reviews'>My Reviews</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm cursor-pointer ${
                pathName.includes("restaurants")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0] dark:bg-topBackground"
                  : "bg-white text-pText border-transparent hover:bg-[#f9f9f9] hover:border-gray-300 dark:bg-topBackground dark:hover:bg-backgroundF dark:border-borderF"
              }`}
            >
              <Link href='/business-profile/restaurants'>My Restaurants</Link>
            </li>
            <li className=''>
              <Button
                className='justify-self-start w-full sm:w-24 lg:w-full'
                onClick={() => signOut()}
              >
                Sign Out
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BusinessProfileSidebar;
