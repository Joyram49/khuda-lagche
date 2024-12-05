"use client";
import { MoreHorizontal } from "lucide-react";

import TableColumnHeader from "@/components/table-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFallbackName } from "@/lib/getFallbackName";
import { format } from "date-fns";
import Link from "next/link";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export const UsersTableColumns = ({ handleDeleteModal, handleViewModal }) => [
  {
    accessorKey: "profilePicture",
    header: ({ column }) => <p className='hidden md:block'>Thumbnail</p>,
    cell: ({ row }) => {
      const profileImg = row.getValue("profilePicture");
      let name = row.getValue("name").split(" ");

      return (
        <div className=' relative overflow-hidden rounded-md hidden md:flex justify-start items-center'>
          {profileImg ? (
            <Avatar>
              <AvatarImage
                src={`${urlEndpoint}${profileImg}`}
                alt='@shadcn'
                className='absolute object-cover object-center'
              />
              <AvatarFallback>{getFallbackName(name)}</AvatarFallback>
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
              <AvatarFallback>{getFallbackName(name)}</AvatarFallback>
            </Avatar>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <p className='font-medium text-[#414549]'>UserId</p>
    ),
    cell: ({ row }) => {
      return (
        <div className='font-robotoSlab text-[#414549]'>
          {row.getValue("id")}
        </div>
      );
    },
  },

  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title='Name' />,
    cell: ({ row }) => {
      return (
        <div className='font-robotoSlab text-[#414549]'>
          {row.getValue("name")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <p className='font-medium text-[#414549]'>Email</p>,
    cell: ({ row }) => {
      return (
        <div className='font-robotoSlab text-[#414549]'>
          {row.getValue("email")}
        </div>
      );
    },
  },

  {
    accessorKey: "role",
    header: ({ column }) => <p className='font-medium text-[#414549]'>Role</p>,
    cell: ({ row }) => {
      const role = row.getValue("role");
      return (
        <div
          className={`px-3 rounded-md border-[1px] border-slate-800/70 ${
            role === "vendor" ? "bg-rose-300" : "bg-gray-400"
          }`}
        >
          <p className='font-robotoSlab text-white font-medium'>{role}</p>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const userInfo = row.original;

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
              onClick={() => handleViewModal(userInfo)}
            >
              View User
            </DropdownMenuItem>

            <DropdownMenuItem className='cursor-pointer hover:bg-sky-500 hover:text-background'>
              <Link href={`/dashboard/customerws/edit/${userInfo?.id}`}>
                Edit User
              </Link>
            </DropdownMenuItem>
            {/* here I want to delete food handler */}
            <DropdownMenuItem
              className='cursor-pointer hover:bg-red-500 hover:text-background'
              onClick={() => handleDeleteModal(userInfo)}
            >
              Delete User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
