"use client";
import TableColumnHeader from "@/components/table-column-header";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

export const FoodItemsTableColumns = ({
  handleEditModal,
  handleDeleteModal,
}) => [
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const image_url = row.getValue("image_url");
      return (
        <div className='w-24 h-20 relative overflow-hidden rounded-md'>
          {image_url ? (
            <Image
              fill
              src={image_url}
              alt={row.getValue("name")}
              loader={({ src, width }) =>
                imageKitLoader({ src, width: 400, quality: 60 })
              }
              className='absolute object-cover  object-center   '
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
      <TableColumnHeader column={column} title='Name' hide={false} />
    ),
    cell: ({ row }) => (
      <div className='capitalize font-robotoSlab text-pText'>
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => (
      <div className='text-center'>{row.getValue("quantity")}</div>
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <TableColumnHeader column={column} title='Price' hide={false} />
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "BDT",
        currencyDisplay: "narrowSymbol",
      }).format(amount);
      return <div className='text-end mr-4 font-medium'>{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const foodInfo = row.original;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align='end'
            className='bg-topBackground border-[1px] border-border dark:border-borderF'
          >
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className='cursor-pointer hover:bg-sky-500 hover:text-background dark:hover:bg-backgroundF'
              onClick={() => handleEditModal(foodInfo)}
            >
              Edit Food
            </DropdownMenuItem>
            <DropdownMenuItem
              className='cursor-pointer hover:bg-red-500 hover:text-background dark:hover:bg-backgroundF'
              onClick={() => handleDeleteModal(foodInfo)}
            >
              Delete Food
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
