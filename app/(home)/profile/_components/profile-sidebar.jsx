"use client";
import { Button } from "@/components/ui/button";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ProfileImageLoader from "./profile-image-loader";

function ProfileSidebar({ loggedInUser }) {
  const pathName = usePathname();

  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image17.jpg",
    width: 400,
    quality: 80,
  });

  return (
    <div className='lg:w-1/4 flex flex-col '>
      <div className='border-[1px] border-slate-900/10 drop-shadow-sm rounded-md  '>
        <div className='w-full flex flex-col bg-white'>
          <div className='w-full h-72 flex flex-col justify-center items-center gap-y-4 border-b-[1px] border-slate-900/10 drop-shadow-sm  pb-4 relative'>
            <div
              className='absolute top-0 left-0 h-36 w-full bg-cover bg-center'
              style={{
                backgroundImage: `url(${bgImageUrl})`,
              }}
            ></div>

            <ProfileImageLoader data={loggedInUser} />

            <div className='flex flex-col items-center '>
              <h1 className='text-[#414549] font-medium font-robotoSlab'>
                {loggedInUser?.name}
              </h1>
              <p className='text-initial  font-robotoSlab'>
                {loggedInUser?.email}
              </p>
            </div>
          </div>
          <ul className='flex flex-col gap-y-2 mt-4 font-robotoSlab text-initial font-medium p-4'>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm ${
                pathName === "/profile"
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0]"
                  : "bg-white text-[#414549] border-transparent hover:bg-[#f9f9f9] hover:border-gray-300"
              }`}
            >
              <Link href='/profile'>Profile</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm ${
                pathName.includes("orders")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0]"
                  : "bg-white text-[#414549] border-transparent hover:bg-[#f9f9f9] hover:border-gray-300"
              }`}
            >
              <Link href='/profile/orders'>My Orders</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm ${
                pathName.includes("reviews")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0]"
                  : "bg-white text-[#414549] border-transparent hover:bg-[#f9f9f9] hover:border-gray-300"
              }`}
            >
              <Link href='/profile/reviews'>My Reviews</Link>
            </li>
            <li
              className={`transition-all duration-300 ease-in-out py-[2px] px-3 border-[1px] rounded-md drop-shadow-sm ${
                pathName.includes("favourites")
                  ? "bg-[#fffafa] text-hoverYellow border-[#fed5c0]"
                  : "bg-white text-[#414549] border-transparent hover:bg-[#f9f9f9] hover:border-gray-300"
              }`}
            >
              <Link href='/profile/favourites'>My favourite Restaurants</Link>
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

export default ProfileSidebar;
