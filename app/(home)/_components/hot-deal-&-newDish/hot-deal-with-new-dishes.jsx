import NewDishCardSkeleton from "@/components/loader/food/new-dish-loader-skeleton";
import { Suspense } from "react";
import HotDeal from "./hot-deal";
import NewDish from "./new-dish";

function HotDealWithNewDishes() {
  return (
    <section className='h-auto min-h-screen bg-background '>
      <div className='container'>
        <div className='h-full flex-col  flex justify-around items-center gap-y-10 py-10 md:py-20'>
          <HotDeal />
          <Suspense fallback={<NewDishCardSkeleton />}>
            <NewDish />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default HotDealWithNewDishes;
