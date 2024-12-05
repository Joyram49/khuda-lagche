"use client";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";

function DeleteUserModal({ onClose }) {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-md  h-auto max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-md overflow-x-hidden flex flex-col justify-center items-center gap-y-6'>
        <div className='flex items-center justify-center gap-x-3'>
          <TriangleAlert className='text-customYellow self-start' />
          <h1 className='font-medium font-robotoSlab'>
            This section is under construction please stay tuned!!
          </h1>
        </div>

        <Button
          variant='warning'
          className='capitalize  md:text-sm font-medium text-white'
          onClick={onClose}
        >
          Return
        </Button>
      </div>
    </div>
  );
}

export default DeleteUserModal;
