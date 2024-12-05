"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLockBody } from "@/hooks/use-lock-body";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Copy, Star, X } from "lucide-react";
import Image from "next/image";

function FoodDetailsModal({ data, onClose }) {
  useLockBody();

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-xl h-full min-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-lg flex flex-col'>
        {/* Close Button */}
        <div
          className='absolute top-4 right-4 w-10 h-10 rounded-full flex justify-center items-center bg-white ring-[1px] ring-slate-900/10 drop-shadow hover:ring-customYellow cursor-pointer group'
          onClick={onClose}
        >
          <X className='text-slate-600 group-hover:text-customYellow' />
        </div>

        {/* Card Content */}
        <Card className='overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200'>
          <CardHeader className='flex flex-col items-start bg-muted/50 p-4'>
            <div className='grid gap-2'>
              <CardTitle className='flex items-center gap-2 text-2xl font-bold'>
                {data?.name}
                <Button
                  size='icon'
                  variant='outline'
                  className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                >
                  <Copy className='h-3 w-3' />
                  <span className='sr-only'>Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                FoodID: {data?.id}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='p-6 text-sm'>
            <div className='grid gap-4'>
              {/* Image Section */}
              <div className='w-full h-56 relative rounded-lg overflow-hidden'>
                {data?.image_url ? (
                  <Image
                    fill
                    src={data?.image_url}
                    loader={({ src, width }) =>
                      imageKitLoader({ src, width: 400, quality: 60 })
                    }
                    alt={data?.name}
                    className='absolute object-cover object-center '
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    placeholder='blur'
                    blurDataURL={imageKitLoader({
                      src: data?.image_url,
                      width: 10,
                      quality: 60,
                      blur: 10,
                    })}
                  />
                ) : (
                  <Image
                    fill
                    src='/sample-folder/placeholder-1.png'
                    alt={data?.name}
                    loader={({ src, width }) =>
                      imageKitLoader({ src, width: 400, quality: 60 })
                    }
                    className='absolute object-cover object-center '
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    placeholder='blur'
                    blurDataURL={imageKitLoader({
                      src: "/sample-folder/placeholder-1.png",
                      width: 10,
                      quality: 60,
                      blur: 10,
                    })}
                  />
                )}
              </div>

              {/* Restaurant Info */}
              <div className='flex items-center gap-4'>
                <div className='relative w-16  md:w-20 aspect-square rounded-md overflow-hidden'>
                  {data?.restaurant.imageUrl ? (
                    <Image
                      fill
                      src={data?.restaurant.imageUrl}
                      loader={({ src, width }) =>
                        imageKitLoader({ src, width: 400, quality: 60 })
                      }
                      alt={data?.restaurant?.name}
                      className='absolute object-cover object-center transition-transform duration-150 hover:scale-110'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      placeholder='blur'
                      blurDataURL={imageKitLoader({
                        src: data?.image_url,
                        width: 10,
                        quality: 60,
                        blur: 10,
                      })}
                    />
                  ) : (
                    <Image
                      fill
                      src='/sample-folder/image.png'
                      alt={data?.restaurant?.name}
                      loader={({ src, width }) =>
                        imageKitLoader({ src, width: 400, quality: 60 })
                      }
                      className='absolute object-cover object-center transition-transform duration-150 hover:scale-110'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                      placeholder='blur'
                      blurDataURL={imageKitLoader({
                        src: "/sample-folder/image.png",
                        width: 10,
                        quality: 60,
                        blur: 10,
                      })}
                    />
                  )}
                </div>
                <div>
                  <div className='font-semibold text-lg'>
                    {data?.restaurant?.name}
                  </div>
                  <div className='text-sm text-gray-500'>
                    Delivery: {data?.delivery_time}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className='text-gray-700'>{data?.description}</div>

              {/* Tags */}
              <div className='flex flex-wrap gap-2 font-medium'>
                {data?.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs'
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Additional Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Price</div>
                  <div className='text-xl font-bold text-green-600'>
                    ৳{data?.price}
                  </div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Rating</div>
                  <div className='flex items-center text-yellow-500'>
                    <Star className='w-5 h-5' />
                    <span className='ml-2'>{data?.averageRating ?? 0}</span>
                  </div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Sales</div>
                  <div>{data?.totalSales ?? 0} sold</div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Available Quantity</div>
                  <div>{data?.quantity} pcs</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default FoodDetailsModal;
