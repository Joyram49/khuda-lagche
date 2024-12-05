"use client";
import { MoreHorizontal } from "lucide-react";

import Portal from "@/components/portal";
import TableColumnHeader from "@/components/table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { imageKitLoader } from "@/lib/imageKitLoader";
import RestaurantDetailsModal from "@/modal/restaurant-details-modal";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const RestaurantsTableColumns = ({ handleDeleteModal }) => {
  const [isViewModal, setIsViewModal] = useState(false);
  const [selectData, setSelectData] = useState(null);
  const handleModal = (data) => {
    setIsViewModal(true);
    setSelectData(data);
  };
  return [
    {
      accessorKey: "thumbnail",
      header: ({ column }) => <p className='hidden md:block'>Thumbnail</p>,
      cell: ({ row }) => {
        const thumbnail = row.getValue("thumbnail");
        return (
          <div className='w-24 h-20 relative overflow-hidden rounded-md hidden md:block'>
            {thumbnail ? (
              <Image
                fill
                src={thumbnail}
                alt={row.getValue("name")}
                loader={({ src, width }) =>
                  imageKitLoader({ src, width: 400, quality: 60 })
                }
                priority
                className='absolute object-cover  object-center  '
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            ) : (
              <Image
                fill
                src='/sample-folder/image.png'
                alt={row.getValue("name")}
                loader={({ src, width }) =>
                  imageKitLoader({ src, width: 400, quality: 60 })
                }
                priority
                className='absolute object-cover  object-center  '
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <TableColumnHeader column={column} title='Name' />
      ),
      cell: ({ row }) => {
        const restaurant = row.original;
        return (
          <div className='font-robotoSlab text-[#414549] '>
            <h1 className=' font-medium'>{restaurant.name}</h1>
            <p className='hidden sm:block'>{restaurant.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "created_at",
      header: ({ column }) => (
        <TableColumnHeader column={column} title='CreatedAt' hide={true} />
      ),
      cell: ({ row }) => {
        const formattedDate = format(
          new Date(row.getValue("created_at")),
          "MM/dd/yyyy, HH:mm:ss"
        );
        return (
          <div className='capitalize font-robotoSlab text-[#414549] font-medium hidden xl:block'>
            {formattedDate}
          </div>
        );
      },
    },
    {
      accessorKey: "owner",
      header: ({ table }) => <p className='hidden sm:block'>Owner Info</p>,
      cell: ({ row }) => {
        const { owner } = row.original;
        return (
          <div className='font-robotoSlab text-[#414549] hidden sm:block'>
            <h1 className=' font-medium'>{owner.name}</h1>
            <p>{owner.email}</p>
          </div>
        );
      },
    },
    {
      accessorKey: "opening_time",
      header: "Opened At",
      cell: ({ row }) => {
        return (
          <div className='font-robotoSlab text-[#414549]'>
            {row.getValue("opening_time")}
          </div>
        );
      },
    },
    {
      accessorKey: "closing_time",
      header: "Closed At",
      cell: ({ row }) => {
        return (
          <div className='font-robotoSlab text-[#414549]'>
            {row.getValue("closing_time")}
          </div>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const restaurantInfo = row.original;

        return (
          <DropdownMenu className='fixed'>
            <DropdownMenuTrigger asChild>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                className='cursor-pointer hover:bg-sky-500 hover:text-background'
                onClick={() => handleModal(restaurantInfo)}
              >
                View Restaurant
              </DropdownMenuItem>

              <DropdownMenuItem className='cursor-pointer hover:bg-sky-500 hover:text-background'>
                <Link
                  href={`/dashboard/restaurants/edit/${restaurantInfo?.id}`}
                >
                  Edit Restaurant
                </Link>
              </DropdownMenuItem>
              {/* here I want to delete food handler */}
              <DropdownMenuItem
                className='cursor-pointer hover:bg-red-500 hover:text-background'
                onClick={() => handleDeleteModal(restaurantInfo)}
              >
                Delete Restaurant
              </DropdownMenuItem>
            </DropdownMenuContent>
            {isViewModal && (
              <Portal>
                <RestaurantDetailsModal
                  restaurant={selectData}
                  onClose={() => setIsViewModal(false)}
                />
              </Portal>
            )}
          </DropdownMenu>
        );
      },
    },
  ];
};
