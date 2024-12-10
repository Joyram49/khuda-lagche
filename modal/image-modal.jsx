"use client";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { ChevronLeft, ChevronRight, LayoutGrid, Share, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import ReactDOM from "react-dom";

function ImageModal({
  selectedImage,
  onClose,
  images,
  selectImage,
  fromPage = false,
}) {
  const [showLayout, setShowLayout] = useState(false);
  if (!selectedImage.id) return null;
  const nextOrPrevImage = (type) => {
    let imageId = null;
    if (type === "next") {
      imageId = selectedImage.id + 1;
    } else if (type === "prev") {
      imageId = selectedImage.id - 1;
    }
    let desiredImage = null;
    if (imageId > 0) {
      desiredImage = images.find((image) => image.id === imageId);
    } else {
      desiredImage = selectedImage;
    }
    selectImage(desiredImage);
  };

  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-[999] flex flex-col items-center justify-around md:justify-between bg-black bg-opacity-80'>
      {/* showing image in modal */}
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-[80%] max-w-full flex justify-center items-center'>
        <div className=' w-[80%] h-auto flex justify-center items-center'>
          <div
            className={`relative  ${
              showLayout ? "w-[80%]" : "w-full"
            } aspect-[4/3] transition-all duration-300 ease-linear `}
          >
            {fromPage ? (
              <Image
                fill
                src={selectedImage.src}
                alt={selectedImage.alt}
                className=' object-cover bg-center border-2 rounded-lg shadow-white shadow-md '
              />
            ) : (
              <Image
                fill
                src={selectedImage.src}
                loader={({ src, width }) =>
                  imageKitLoader({ src, width: 800, quality: 80 })
                }
                alt='Selected'
                className=' object-cover bg-center border-2 rounded-lg shadow-white shadow-md '
              />
            )}
          </div>
        </div>
      </div>
      {/* close, layout grid and download button */}
      <div className='absolute top-0 right-0  z-100'>
        <div className='relative bg-primary/60  w-auto flex justify-center items-center box-border'>
          <button
            className=' text-initial hover:text-white font-medium cursor-pointer hover:bg-primary px-3 py-2 transition-colors duration-200 ease-linear '
            onClick={() => setShowLayout((prev) => !prev)}
          >
            <LayoutGrid />
          </button>
          <button
            className=' text-initial hover:text-white font-medium cursor-pointer hover:bg-primary px-3 py-2 transition-colors duration-200 ease-linear '
            onClick={onClose}
          >
            <Share />
          </button>
          <button
            className=' text-initial hover:text-white font-medium cursor-pointer hover:bg-primary px-3 py-2 transition-colors duration-200 ease-linear '
            onClick={onClose}
          >
            <X />
          </button>
        </div>
      </div>

      {/* image count div */}
      <div className='absolute top-0 3xl:top-4 left-4 lg:left-16  z-100 text-initial font-medium font-robotoSlab'>
        {selectedImage.id} / {images.length}
      </div>

      {/* left  arrow for  prev image*/}
      <button
        className={`absolute text-initial top-[60%] xs:top-1/2 left-2 3xl:left-24 w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#fff3] flex justify-center items-center  transition-all duration-150 ease-linear ${
          selectedImage.id === 1
            ? "cursor-default"
            : "hover:bg-initial hover:text-accent cursor-pointer"
        } flex`}
        onClick={() => nextOrPrevImage("prev")}
        disabled={selectedImage === 1}
      >
        <ChevronLeft size={32} />
      </button>

      {/* right  arrow for  next image*/}
      <button
        className={`absolute text-initial top-[60%]  xs:top-1/2  right-2 3xl:right-24 w-8 h-8 lg:w-12 lg:h-12 rounded-full bg-[#fff3]  justify-center items-center  transition-all duration-150 ease-linear ${
          selectedImage.id === images.length
            ? "cursor-default"
            : "hover:bg-initial hover:text-accent cursor-pointer"
        } flex`}
        onClick={() => nextOrPrevImage("next")}
        disabled={selectedImage.id === images.length}
      >
        <ChevronRight size={32} />
      </button>

      {/* all image show with a carousel */}
      {showLayout && (
        <div className='absolute bottom-0 h-auto container text-white  my-10'>
          <div className='h-full w-full grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] justify-center items-center  gap-3'>
            {images.map((image) => (
              <div key={image.id} className='col-span-1 '>
                <div
                  className={`relative aspect-[4/3] cursor-pointer ${
                    selectedImage.id === image.id && "border-2 rounded-lg"
                  }`}
                >
                  {fromPage ? (
                    <Image
                      fill
                      src={image.src}
                      alt={image.alt}
                      className='absolute object-cover rounded-md'
                    />
                  ) : (
                    <Image
                      fill
                      src={image.src}
                      loader={({ src, width }) =>
                        imageKitLoader({ src, width: 400, quality: 60 })
                      }
                      alt='images in gallery'
                      className='absolute object-cover rounded-md'
                    />
                  )}
                  <div
                    onClick={() => selectImage(image)}
                    className={`absolute inset-0 ${
                      selectedImage.id === image.id
                        ? "bg-[#fff5]"
                        : "bg-transparent"
                    } hover:bg-[#fff5] transition-colors duration-150 ease-linear rounded-md`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>,
    document.body
  );
}

export default ImageModal;
