import RestaurantCard from "@/app/(home)/(mainWrapper)/restaurants/_components/restaurants-content/restaurant-card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import RestaurantAddForm from "./_components/restaurant-add-form";

export const metadata = {
  title: "My Restaurants | Khuda-Lagche",
  description: "Restaurants List  Information that a particular user own",
};

import { auth } from "@/auth";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getUserByEmail } from "@/queries/account";
import { getRestaurantByOwnerId } from "@/queries/restaurants";
import { redirect } from "next/navigation";

async function BusinessProfileRestaurantPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  let restaurants = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
    restaurants = await getRestaurantByOwnerId(loggedInUser?.id);
  }

  return (
    <div className='flex flex-col justify-center items-start gap-y-6 font-robotoSlab text-[#414549]'>
      <div className='w-full flex justify-between items-center'>
        <h1 className='font-medium text-lg capitalize flex justify-center items-center gap-x-2'>
          Restaurants I own
          <ArrowRight className='hidden xs:block' />
        </h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add New</Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[1280px] h-[600px] overflow-y-scroll'>
            <div className='flex flex-col gap-y-6'>
              <DialogTitle className='self-center font-medium text-xl'>
                Add New Restaurant
              </DialogTitle>
              <RestaurantAddForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-6 '>
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant?.id}
            data={restaurant}
            business={true}
          />
        ))}
      </div>
    </div>
  );
}

export default BusinessProfileRestaurantPage;
