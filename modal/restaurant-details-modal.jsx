"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { Copy, MapPin, Phone, Star, X } from "lucide-react";
import Image from "next/image";

function RestaurantDetailsModal({ restaurant, onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-2xl h-full min-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-lg flex flex-col'>
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
                {restaurant?.name}
                <Button
                  size='icon'
                  variant='outline'
                  className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                >
                  <Copy className='h-3 w-3' />
                  <span className='sr-only'>Copy Restaurant Name</span>
                </Button>
              </CardTitle>
              <CardDescription className='text-sm text-gray-500'>
                {restaurant?.address}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className='p-6 text-sm'>
            <div className='grid gap-4'>
              {/* Thumbnail */}
              <div className='w-full h-56 relative rounded-lg overflow-hidden'>
                <Image
                  fill
                  src={restaurant?.thumbnail}
                  loader={({ src, width }) =>
                    imageKitLoader({ src, width: 400, quality: 60 })
                  }
                  alt={restaurant?.name}
                  className='absolute object-cover object-center transition-transform duration-150 hover:scale-110'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>

              {/* Contact Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex items-center gap-2 text-gray-700'>
                  <Phone className='w-5 h-5' />
                  {restaurant?.phone}
                </div>
                <div className='flex items-center gap-2 text-gray-700'>
                  <MapPin className='w-5 h-5' />
                  {restaurant?.address}
                </div>
              </div>

              {/* Categories */}
              <div className='flex flex-wrap gap-2 font-medium'>
                {restaurant?.categories.map((category, index) => (
                  <span
                    key={category.id}
                    className='px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs'
                  >
                    {category.name}
                  </span>
                ))}
              </div>

              {/* Additional Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Opening Hours</div>
                  <div>
                    {restaurant?.opening_time} - {restaurant?.closing_time}
                  </div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Delivery Charge</div>
                  <div>৳{restaurant?.delivery_charge}</div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Rating</div>
                  <div className='flex items-center text-yellow-500'>
                    <Star className='w-5 h-5' />
                    <span className='ml-2'>{restaurant?.rating}</span>
                  </div>
                </div>
                <div className='flex flex-col items-start'>
                  <div className='font-semibold'>Total Reviews</div>
                  <div>{restaurant?.totalReviews ?? 0} reviews</div>
                </div>
              </div>

              {/* Orders */}
              <div>
                <div className='font-semibold text-lg mb-2'>Orders</div>
                <div className='grid gap-4'>
                  {restaurant?.orders.map((order) => (
                    <div
                      key={order.order_id}
                      className='p-3 bg-gray-100 rounded-md flex justify-between items-center text-sm'
                    >
                      <div>
                        Order #{order.order_id}
                        <span className='block text-gray-500'>
                          Status: {order.status}
                        </span>
                      </div>
                      <div>৳{order.total_amount}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default RestaurantDetailsModal;
