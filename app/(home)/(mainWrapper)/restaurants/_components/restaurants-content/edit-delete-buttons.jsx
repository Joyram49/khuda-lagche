import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";

function EditOrDeleteBtn({ restaurant }) {
  return (
    <div className='absolute bottom-4 right-4 flex justify-center items-center gap-x-2'>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/business-profile/edit/${restaurant?.id}`}>
              <FaRegEdit
                size={24}
                className='stroke-pText hover:stroke-cyan-500 transition-colors duration-150 ease-linear '
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit {restaurant?.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Trash
              size={24}
              className='stroke-pText hover:stroke-red-500 transition-colors duration-150 ease-linear '
            />
          </TooltipTrigger>
          <TooltipContent>
            <p>delete your restaurant</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default EditOrDeleteBtn;
