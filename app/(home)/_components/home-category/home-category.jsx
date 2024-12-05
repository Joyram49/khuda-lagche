import RippleButton from "@/components/ripple-effect";
import { getAllCategory } from "@/queries/category";
import Link from "next/link";
import CategoryCard from "./category-card";

async function HomeCategory() {
  const categories = await getAllCategory();

  return (
    <section className='h-auto bg-deepBackground '>
      <div className='container '>
        <div className=' h-full flex-col  flex justify-around items-center gap-y-10 md:gap-y-20 py-10 md:py-20'>
          {/* category header */}
          <div className='flex flex-col  items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              More than <span className='text-customYellow'>20,000 dishes</span>
              to order!
            </h1>
            <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              Welcome to The Biggest Network of Food Ordering & Delivery
            </p>
          </div>

          {/* category card content */}
          <div className='w-full'>
            <div className='w-ful grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 lg:gap-x-10 gap-y-6'>
              {categories?.slice(0, 4).map((category) => (
                <CategoryCard key={category.id} data={category} />
              ))}
            </div>
          </div>

          {/* category footer */}
          <div className='flex flex-col md:flex-row gap-y-4 md:gap-x-4 justify-center items-center'>
            <h1 className='text-muted-foreground font-medium font-robotoSlab'>
              and much more your favourite food
            </h1>
            <Link href={"/foodItems"}>
              <RippleButton
                variant='warning'
                size='custom'
                className='rounded-full'
              >
                More Categories
              </RippleButton>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeCategory;
