"use client";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { IoIosHeart, IoMdHeartEmpty } from "react-icons/io";

import { updateFavRestaurantsByUserId } from "@/app/actions/restaurants";
import TransparentSpinnerLoader from "@/components/loader/transparent-spinner-loader";
import Portal from "@/components/portal";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LoginModal from "@/modal/login-modal";
import { getUserByEmail } from "@/queries/account";
import { getSession } from "next-auth/react";
import { toast } from "sonner";

function AddToFav({ restaurantId, className, isFav, restaurantName }) {
  const [active, setActive] = useState(isFav);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const updateFav = async (e) => {
    setIsLoading(true);
    e.stopPropagation();
    const session = await getSession();
    if (!session || session?.error === "RefreshAccessTokenError") {
      setIsLoading(false);
      setIsModalOpen(true);
      return;
    }
    const loggedInUser = await getUserByEmail(session?.user?.email);

    const data = {
      userId: loggedInUser?.id,
      restaurantId,
    };
    try {
      const response = await updateFavRestaurantsByUserId(data);
      if (response?.id) {
        if (isFav) {
          toast.success(`${restaurantName} is removed from your fav list!`);
        } else {
          toast.success(`${restaurantName} is added to your fav list!`);
        }
        setActive((prev) => !prev);
      }
    } catch (error) {
      toast.error(`${restaurantName} failed to update your fav list!`);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Portal>
        <TransparentSpinnerLoader />
      </Portal>
    );
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip delayDuration={150}>
          <TooltipTrigger asChild>
            <button
              className={cn(
                "  w-7 h-7 bg-topBackground rounded-full flex justify-center items-center group/edit border-[1px] border-border dark:border-borderF",
                className
              )}
              onClick={(e) => updateFav(e)}
            >
              {active ? (
                <IoIosHeart className='fill-rose-600' />
              ) : (
                <IoMdHeartEmpty className='group-hover/edit:fill-rose-500 transition-colors duration-150 ease-linear' />
              )}
            </button>
          </TooltipTrigger>
          <TooltipContent side='left' sideOffset={10} arrowPadding={10}>
            <p>{active ? "Remove from Favourite" : "Add to Favourite"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {isModalOpen && (
        <Portal>
          <LoginModal
            onClose={() => setIsModalOpen(false)}
            fromRestaurant={true}
          />
        </Portal>
      )}
    </>
  );
}

export default AddToFav;
