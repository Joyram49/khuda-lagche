"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

function WrapperLayoutHeader({ restaurants, foods }) {
  const pathName = usePathname();
  const pathInArray = useMemo(
    () => pathName.split("/").filter(Boolean),
    [pathName]
  );
  const params = useParams();

  const { title, displayList } = useMemo(() => {
    let sublink = null; // this is the imaginary name for selected food item or restaurant.
    let fallbackName = null;

    if (params.restaurant_id) {
      sublink = restaurants.find(
        (restaurant) => restaurant.id == params.restaurant_id
      );
      fallbackName = sublink ? null : params.restaurant_id; // Set fallbackName if sublink is not found
    }

    if (params.food_id) {
      sublink = foods.find((food) => food.id == params.food_id);
      fallbackName = sublink ? null : params.food_id; // Set fallbackName if sublink is not found
    }

    // Compute the title
    const title = sublink
      ? sublink.name
      : fallbackName || pathInArray[pathInArray.length - 1];

    // Compute the displayList
    const displayList = pathInArray.map((path, index) => {
      let displayName = path; // Default to the raw path segment

      // Replace the name conditionally based on params
      if (index === 1 && params.food_id) {
        displayName = sublink
          ? sublink.name
          : fallbackName || "Invalid Food ID";
      } else if (index === 1 && params.restaurant_id) {
        displayName = sublink
          ? sublink.name
          : fallbackName || "Invalid Restaurant ID";
      }

      return {
        path: `/${pathInArray.slice(0, index + 1).join("/")}`,
        name: displayName,
        isActive: index === pathInArray.length - 1, // Last item in the list
      };
    });

    const updatedDisplayList = [
      { path: "/", name: "Home", isActive: false },
      ...displayList,
    ];

    return { title, displayList: updatedDisplayList };
  }, [params, restaurants, foods, pathInArray]);

  const bgImageUrl = imageKitLoader({
    src: "heroImage/wrapper-layout.jpg",
    width: 1920,
    quality: 30,
  });

  return (
    <div
      className={`h-auto  bg-cover bg-center  relative flex justify-center items-center overflow-hidden`}
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className='z-1 flex flex-col justify-center items-center gap-y-6 py-10 md:py-20'>
        <h1
          className={`text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-white text-shadow-default text-center`}
        >
          {title}
        </h1>
        <div className='flex justify-center items-center gap-x-3 md:gap-x-10 divide-x-2 divide-dotted '>
          {displayList.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className={`text-sm sm:text-base md:text-xl font-medium font-robotoSlab uppercase text-shadow-default ${
                item.isActive
                  ? "pointer-events-none text-customYellow"
                  : "text-white hover:text-customYellow duration-150 ease-linear transition-colors"
              } pl-2 md:pl-6`}
              aria-disabled={item.isActive}
              tabIndex={item.isActive ? -1 : undefined}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default WrapperLayoutHeader;
