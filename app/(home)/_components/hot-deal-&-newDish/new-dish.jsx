import HoverLink from "@/components/hover-link";
import { getAllFood } from "@/queries/foodItems";
import NewDishCard from "./new-dish-card";

async function NewDish() {
  const foods = await getAllFood();
  return (
    <div className=' h-full w-full flex-col  flex justify-around items-center gap-y-10 md:gap-y-20 pt-10  '>
      {/* new dish header */}
      <div className='flex flex-col  items-center text-center'>
        <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
          New Dishes
        </h1>
        <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
          Clients’ Most Popular Choise
        </p>
      </div>

      {/* new dish card content */}
      <div className='w-full'>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row md:gap-x-3 lg:gap-x-10 gap-y-6 md:gap-y-0'>
          {foods
            ?.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
            .slice(0, 3)
            .map((food, index) => {
              // Conditional rendering to customize the third item layout
              if (index === 2) {
                return (
                  <div
                    key={food?.id}
                    className='md:col-span-2 lg:col-span-1 flex justify-center'
                  >
                    <NewDishCard data={food} />
                  </div>
                );
              }

              return <NewDishCard key={food?.id} data={food} />;
            })}
        </div>
      </div>
      {/* new dish footer */}
      <div>
        <HoverLink text='View More New Dishes' link={"foodItems"} />
      </div>
    </div>
  );
}

export default NewDish;
