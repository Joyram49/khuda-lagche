import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import RestaurantCart from "./restaurant-cart/restaurant-cart";
import RestaurantFoodContainer from "./restaurant-container";

function RestaurantMenuContainer({
  headerheight,
  data,
  delivery_time,
  uniqueCategories,
}) {
  const headerHeight = headerheight ?? 0;
  return (
    <div className='w-full sm:container mt-8 space-y-16 p-4 sm:p-0'>
      <div className='w-full lg:flex relative'>
        <div className='lg:w-3/4 md:px-3 mt-[30px] lg:mt-0 '>
          {uniqueCategories.map((category) => (
            <div id={category?.id} key={category?.id} className='mb-8 '>
              <RestaurantFoodContainer category={category} foodItems={data} />
            </div>
          ))}
        </div>
        <div
          className={`lg:w-1/4 md:pr-2 md:pl-4 ring-[1px]   ring-slate-900/10 rounded-md drop-shadow-sm  h-full hidden lg:block`}
          style={{
            position: "sticky",
            top: headerHeight + 68,
            zIndex: 6,
            transition: "top 0.3s ease",
          }}
        >
          {/* I need to start from restaurant cart */}
          <RestaurantCart data={data} delivery_time={delivery_time} />
        </div>

        {/* restaurant cart for smaller screen */}
        <div
          className={`w-full fixed bottom-10 z-20 left-1/2 -translate-x-1/2 flex justify-center items-center lg:hidden`}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button className='container bg-gradient-to-r from-customYellow to-hoverYellow py-2  flex justify-center items-center gap-x-2  rounded-md mx-6 sm:mx-10 font-robotoSlab text-white hover:from-hoverYellow hover:to-customYellow'>
                <ShoppingCart size={18} className='stroke-white stroke-[3px]' />
                <p className='text-lg'>Your Carts</p>
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[625px]'>
              <RestaurantCart small={true} delivery_time={delivery_time} />
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenuContainer;
