"use client";

import Spinner from "@/components/loader/spinner";
import UploadImage from "@/components/upload-image";
import { IKImage } from "imagekitio-next";
import { useState } from "react";

import ImgPlaceholder from "@/public/assets/placeholder-1.png";
import Image from "next/image";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function AddThumbnailImage({
  name,
  setRestaurantImagePath,
  restaurantImagePath,
  setThumbnailPath,
  thumbnailPath,
  errors,
}) {
  // States to manage hover for update button display
  const [hoverImage, setHoverImage] = useState(false);
  const [hoverThumbnail, setHoverThumbnail] = useState(false);
  const [restaurantImageUploading, setRestaurantImageUploading] =
    useState(false);
  const [thumbnailUploading, setThumbnailUploading] = useState(false);

  return (
    <div className='flex flex-col md:flex-row justify-between gap-6'>
      {/* Restaurant Image Upload */}
      <div className='flex-1 relative'>
        <p className='mb-2 font-robotoSlab text-[16px] text-[#414549]'>
          Upload restaurant image here.
        </p>
        <div
          className='relative w-full h-56 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden'
          onMouseEnter={() => setHoverImage(true)}
          onMouseLeave={() => setHoverImage(false)}
        >
          {restaurantImageUploading ? (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <Spinner />
              <span className='ml-2 text-white font-semibold'>
                Uploading...
              </span>
            </div>
          ) : restaurantImagePath ? (
            <IKImage
              urlEndpoint={urlEndpoint}
              fill
              path={restaurantImagePath}
              priority
              alt={name}
              className='absolute inset-0 object-cover  object-center   '
            />
          ) : (
            <Image
              fill
              src={ImgPlaceholder}
              alt='restaurant-image'
              className='absolute inset-0 object-cover object-center'
            />
          )}

          {hoverImage && (
            <div className='absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-lg font-semibold hover:bg-opacity-75'>
              <UploadImage
                folderName='/restaurants'
                name={name}
                setImagePath={setRestaurantImagePath}
                imagePath={restaurantImagePath}
                type='image'
                setUploading={setRestaurantImageUploading}
              />
            </div>
          )}
        </div>
      </div>

      {/* Restaurant Thumbnail Upload */}
      <div className='flex-1 relative'>
        <p className='mb-2 font-robotoSlab text-[16px] text-[#414549]'>
          Upload restaurant thumbnail here.
        </p>
        <div
          className='relative w-full h-56 bg-gray-100 flex items-center justify-center rounded-lg overflow-hidden'
          onMouseEnter={() => setHoverThumbnail(true)}
          onMouseLeave={() => setHoverThumbnail(false)}
        >
          {thumbnailUploading ? (
            <div className='absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
              <Spinner />
              <span className='ml-2 text-white font-semibold'>
                Uploading...
              </span>
            </div>
          ) : thumbnailPath ? (
            // Display the preview if a thumbnail path or imageplaceholder
            <IKImage
              urlEndpoint={urlEndpoint}
              fill
              path={thumbnailPath}
              priority
              alt={name}
              className='absolute inset-0 object-cover  object-center   '
            />
          ) : (
            <Image
              fill
              src={ImgPlaceholder}
              alt='restaurant-image'
              className='absolute inset-0 object-cover object-center'
            />
          )}

          {hoverThumbnail && (
            <div className='absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center text-lg font-semibold hover:bg-opacity-75'>
              <UploadImage
                folderName='/restaurants/thumbnail'
                name={`${name}-thumbnail`}
                setImagePath={setThumbnailPath}
                imagePath={thumbnailPath}
                type='thumbnail'
                setUploading={setThumbnailUploading}
              />
            </div>
          )}
        </div>
        {errors?.thumbnail && (
          <p className='text-destructive font-medium text-sm font-robotoSlab'>
            {errors.thumbnail.message}
          </p>
        )}
      </div>
    </div>
  );
}

export default AddThumbnailImage;
