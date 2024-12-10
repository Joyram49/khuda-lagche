"use client";
import Spinner from "@/components/loader/spinner";
import UploadImage from "@/components/upload-image";
import { IKImage } from "imagekitio-next";
import { useState } from "react";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function AddImage({
  foodName,
  restaurantName,
  foodImagePath,
  setFoodImagePath,
}) {
  const [hoverImage, setHoverImage] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const name = foodName ?? "sample";

  return (
    <div className='w-full relative'>
      <p className='mb-2 font-robotoSlab text-[16px] text-pText'>
        Upload food image here.
      </p>
      <div
        className='relative w-full h-56 bg-topBackground flex items-center justify-center rounded-lg overflow-hidden  border-[1px] border-border dark:border-borderF'
        onMouseEnter={() => setHoverImage(true)}
        onMouseLeave={() => setHoverImage(false)}
      >
        {imageUploading ? (
          <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <Spinner />
            <span className='ml-2 text-white font-semibold'>Uploading...</span>
          </div>
        ) : foodImagePath ? (
          <IKImage
            urlEndpoint={urlEndpoint}
            fill
            path={foodImagePath}
            priority
            alt={name}
            className='absolute inset-0 object-cover  object-center   '
          />
        ) : (
          <p className='text-gray-500'>No image uploaded</p>
        )}

        {hoverImage && (
          <div className='absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-lg font-semibold hover:bg-opacity-75'>
            <UploadImage
              folderName={`/dish/${restaurantName}`}
              name={name}
              setImagePath={setFoodImagePath}
              imagePath={foodImagePath}
              type='foodImg'
              setUploading={setImageUploading}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default AddImage;
