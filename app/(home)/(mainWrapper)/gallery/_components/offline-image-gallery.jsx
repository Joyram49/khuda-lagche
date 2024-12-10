"use client";
import ImageModal from "@/modal/image-modal";
import { Link as LinkIcon, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import photos from "./photos";

const photoSub1 = photos.slice(0, 4);
const photoSub2 = photos.slice(4, 8);
const photoSub3 = photos.slice(8, 12);
const photoSub4 = photos.slice(12, 16);

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);
  return (
    <div className='w-full'>
      <div className='w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4  gap-4  grid-flow-dense auto-rows-max'>
        <div className='grid gap-4'>
          {photoSub1.map((photo) => (
            <div
              key={photo.id}
              className='w-full relative rounded-lg overflow-hidden bg-black/75 group/image  transition-opacity duration-150 ease-linear'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                fill
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={photo.blurDataURL}
                sizes='(max-width: 768px) 50vw,  
              (max-width: 1024px) 33vw, 
              25vw'
                className='absolute inset-0 object-cover object-center rounded-lg group-hover/image:scale-90 transition-transform duration-150 ease-linear'
              />
              <div className='absolute inset-0 hidden group-hover/image:flex flex-col justify-center items-center text-white group-hover/image:bg-slate-900/75 transition-all duration-150 ease-linear group/content gap-y-2'>
                <div className='flex gap-x-2'>
                  <div onClick={() => handleImageClick(photo)}>
                    <Search className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 -translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow' />
                  </div>
                  <LinkIcon className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow ' />
                </div>
                <div className='hidden xs:block w-full py-2 bg-white/20 text-center translate-y-[150%] group-hover/content:translate-y-0 transition-transform duration-300 ease-linear delay-100'>
                  <h1 className='font-robotoSlab uppercase font-medium text-sm '>
                    This is image content for practice.
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='grid gap-4'>
          {photoSub2.map((photo) => (
            <div
              key={photo.id}
              className='w-full relative rounded-lg overflow-hidden bg-black/75 group/image  transition-opacity duration-150 ease-linear'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                fill
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={photo.blurDataURL}
                sizes='(max-width: 768px) 50vw,  
              (max-width: 1024px) 33vw, 
              25vw'
                className='absolute inset-0 object-cover object-center rounded-lg group-hover/image:scale-90 transition-transform duration-150 ease-linear'
              />
              <div className='absolute inset-0 hidden group-hover/image:flex flex-col justify-center items-center text-white group-hover/image:bg-slate-900/75 transition-all duration-150 ease-linear group/content gap-y-2'>
                <div className='flex gap-x-2'>
                  <div onClick={() => handleImageClick(photo)}>
                    <Search className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 -translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow' />
                  </div>
                  <LinkIcon className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow ' />
                </div>
                <div className='hidden xs:block w-full py-2 bg-white/20 text-center translate-y-[150%] group-hover/content:translate-y-0 transition-transform duration-300 ease-linear delay-100'>
                  <h1 className='font-robotoSlab uppercase font-medium text-sm '>
                    This is image content for practice.
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='grid gap-4'>
          {photoSub3.map((photo) => (
            <div
              key={photo.id}
              className='w-full relative rounded-lg overflow-hidden bg-black/75 group/image  transition-opacity duration-150 ease-linear'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                fill
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={photo.blurDataURL}
                sizes='(max-width: 768px) 50vw,  
              (max-width: 1024px) 33vw, 
              25vw'
                className='absolute inset-0 object-cover object-center rounded-lg group-hover/image:scale-90 transition-transform duration-150 ease-linear'
              />
              <div className='absolute inset-0 hidden group-hover/image:flex flex-col justify-center items-center text-white group-hover/image:bg-slate-900/75 transition-all duration-150 ease-linear group/content gap-y-2'>
                <div className='flex gap-x-2'>
                  <div onClick={() => handleImageClick(photo)}>
                    <Search className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 -translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow' />
                  </div>
                  <LinkIcon className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow ' />
                </div>
                <div className='hidden xs:block w-full py-2 bg-white/20 text-center translate-y-[150%] group-hover/content:translate-y-0 transition-transform duration-300 ease-linear delay-100'>
                  <h1 className='font-robotoSlab uppercase font-medium text-sm '>
                    This is image content for practice.
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className='grid gap-4 md:hidden xl:grid'>
          {photoSub4.map((photo) => (
            <div
              key={photo.id}
              className='w-full relative rounded-lg overflow-hidden bg-black/75 group/image  transition-opacity duration-150 ease-linear'
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                fill
                src={photo.src}
                alt={photo.alt}
                placeholder='blur'
                blurDataURL={photo.blurDataURL}
                sizes='(max-width: 768px) 50vw,  
              (max-width: 1024px) 33vw, 
              25vw'
                className='absolute inset-0 object-cover object-center rounded-lg group-hover/image:scale-90 transition-transform duration-150 ease-linear'
              />
              <div className='absolute inset-0 hidden group-hover/image:flex flex-col justify-center items-center text-white group-hover/image:bg-slate-900/75 transition-all duration-150 ease-linear group/content gap-y-2'>
                <div className='flex gap-x-2'>
                  <div onClick={() => handleImageClick(photo)}>
                    <Search className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 -translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow' />
                  </div>
                  <LinkIcon className='cursor-pointer stroke-[3px] opacity-0 stroke-gray-200 translate-x-[150%] group-hover/content:translate-x-0 group-hover/content:opacity-100 transition-all duration-300 ease-linear hover:stroke-hoverYellow ' />
                </div>
                <div className='hidden xs:block w-full py-2 bg-white/20 text-center translate-y-[150%] group-hover/content:translate-y-0 transition-transform duration-300 ease-linear delay-100'>
                  <h1 className='font-robotoSlab uppercase font-medium text-sm '>
                    This is image content for practice.
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={closeModal}
          images={photos}
          selectImage={handleImageClick}
          fromPage={true}
        />
      )}
    </div>
  );
}

export default ImageGallery;
