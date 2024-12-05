"use client";
import { useState } from "react";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function FoodImageLoader({ selectedFood = {} }) {
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <div
      className='w-full aspect-square  relative rounded-lg overflow-hidden cursor-pointer'
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {selectedFood?.image_url ? (
        <Image
          fill
          src={selectedFood.image_url}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 1920, quality: 100 })
          }
          alt={selectedFood.name}
          className={`absolute inset-0 object-cover object-center transition-transform duration-300 ease-linear ${
            isHovered ? "scale-[2.0]" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      ) : (
        <Image
          fill
          src='/sample-folder/placeholder-1.png'
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 1920, quality: 100 })
          }
          alt={selectedFood.name ?? "food name"}
          className={`absolute inset-0 object-cover object-center transition-transform duration-300 ease-linear ${
            isHovered ? "scale-[2.0]" : "scale-100"
          }`}
          style={{
            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
          }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      )}
    </div>
  );
}

export default FoodImageLoader;
