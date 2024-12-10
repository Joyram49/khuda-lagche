import RestaurantDescriptionLoader from "@/components/loader/restaurant/restaurant-description-loader";
import RestaurantFoodSkeletonLoader from "@/components/loader/restaurant/restaurant-food-loader";
import RestaurantHeaderInfoLoader from "@/components/loader/restaurant/restaurant-header-info-loader";

export default function RestaurantLoadingPage() {
  return (
    <div className='min-h-screen w-full mt-10 bg-backgroundF'>
      <div className='w-full flex flex-col  justify-center  items-center gap-y-6 '>
        <RestaurantHeaderInfoLoader />
        <div className='w-full h-[1px] bg-slate-900/10 drop-shadow-sm' />
        <RestaurantDescriptionLoader />
        <RestaurantFoodSkeletonLoader />
      </div>
    </div>
  );
}
