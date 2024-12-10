"use client";

import HoverLink from "@/components/hover-link";

import { useEffect, useState } from "react";

import { imageKitLoader } from "@/lib/imageKitLoader";
import ImageModal from "@/modal/image-modal";
import GalleryCard from "./gallery-card";

const images = [
  { id: 1, src: "heroImage/hero-image.jpg" },
  { id: 2, src: "heroImage/hero-image2.jpg" },
  { id: 3, src: "heroImage/hero-image3.jpg" },
  { id: 4, src: "heroImage/hero-image4.jpg" },
  { id: 5, src: "heroImage/hero-image5.jpg" },
  { id: 6, src: "heroImage/hero-image11.jpg" },
  { id: 7, src: "heroImage/hero-image7.jpg" },
  { id: 8, src: "heroImage/hero-image8.jpg" },
];

function ImageGallery() {
  const [selectedImage, setSelectedImage] = useState(null);

  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image10.jpg",
    width: 1920,
    quality: 30,
  });

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
    <section
      className='h-auto min-h-screen  bg-cover bg-center relative drop-shadow-md'
      style={{
        backgroundImage: `url(${bgImageUrl})`,
      }}
    >
      <div className='h-full w-full bg-[#121211c2] backdrop-blur-sm absolute inset-0' />
      <div className='container h-full overflow-hidden relative z-10'>
        <div className='h-full w-full flex-col flex justify-around items-center gap-y-10 sm:gap-y-20 py-10 md:py-20'>
          <div className='flex flex-col items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl font-robotoSlab uppercase text-white'>
              View the dishes
            </h1>
            <p className='text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2'>
              From the Gallery
            </p>
          </div>

          <div className='w-full'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4 justify-center'>
              {images.map((image) => (
                <GalleryCard
                  key={image.id}
                  data={image}
                  selectImage={() => handleImageClick(image)}
                />
              ))}
            </div>
          </div>

          <div>
            <HoverLink text='Visit Gallery' link='gallery' />
          </div>
        </div>
      </div>

      {/* Use the ImageModal component */}
      {selectedImage && (
        <ImageModal
          selectedImage={selectedImage}
          onClose={closeModal}
          images={images}
          selectImage={handleImageClick}
        />
      )}
    </section>
  );
}

export default ImageGallery;
