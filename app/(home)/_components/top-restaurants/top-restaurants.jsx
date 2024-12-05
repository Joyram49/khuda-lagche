import HoverLink from "@/components/hover-link";
import { getTopRatedRestaurants } from "@/queries/restaurants";
import TopRestaurantCard from "./top-restaurant-card";

async function TopRestaurants() {
  const topRestaurants = await getTopRatedRestaurants();

  return (
    <section className='h-auto bg-deepBackground '>
      <div className='container'>
        <div className=' h-full w-full  flex-col  flex justify-around items-center gap-y-10 sm:gap-y-20 py-10 md:py-20'>
          {/* top restaurants header */}
          <div className='flex flex-col  items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              Top Restaurants
            </h1>
            <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              Clients’ Most Popular Choise
            </p>
          </div>
          {/* top restaurants card content */}

          <div className='w-full h-full'>
            <div className='w-full h-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-6 gap-x-6 lg:gap-x-10 gap-y-6 md:gap-y-10 '>
              {topRestaurants?.slice(0, 6).map((restaurant) => (
                <TopRestaurantCard key={restaurant.id} data={restaurant} />
              ))}
            </div>
          </div>

          {/* top restaurants footer */}
          <div>
            <HoverLink text='View More Restaurants' link='restaurants' />
          </div>
        </div>
      </div>
    </section>
  );
}

export default TopRestaurants;
