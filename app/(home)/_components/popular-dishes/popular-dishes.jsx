import RippleButton from "@/components/ripple-effect";
import { getPopularFood } from "@/queries/foodItems";
import Link from "next/link";
import DishCard from "./dish-card";

async function PopularDishes() {
  const popularFoods = await getPopularFood();
  return (
    <section className='h-auto    bg-deepBackground '>
      <div className='container '>
        <div className=' h-full flex-col  flex justify-around items-center gap-y-10 md:gap-y-20 py-10 md:py-20'>
          {/* popular dishes header */}
          <div className='flex flex-col  items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              What's <span className='text-customYellow'>popular</span>
            </h1>
            <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              Clients’ Most Popular Choise
            </p>
          </div>

          {/* popular dishes card content */}
          <div className='w-full'>
            <div className='w-full  grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 md:gap-x-6 lg:gap-x-10 gap-y-10 '>
              {popularFoods?.slice(0, 4).map((food) => (
                <DishCard key={food?.id} data={food} />
              ))}
            </div>
          </div>

          {/* popular dishes footer */}
          <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-center items-center'>
            <h1 className='text-muted-foreground font-medium font-robotoSlab'>
              We’re here to spice things up.
            </h1>
            <Link href={"/foodItems"}>
              <RippleButton variant='warning' size='custom'>
                Explore all
              </RippleButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PopularDishes;
