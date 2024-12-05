import { getFoodItems } from "@/queries/foodItems";
import { getAllRestaurantPlain } from "@/queries/restaurants";
import WrapperLayoutHeader from "./_components/wrapper-layout-header";

async function WrapperLayout({ children }) {
  const foodItems = await getFoodItems();
  const restaurants = await getAllRestaurantPlain();
  return (
    <section className='min-h-screen  w-full'>
      <div className='relative w-full flex flex-col '>
        <WrapperLayoutHeader restaurants={restaurants} foods={foodItems} />
      </div>
      <div id='overlay-root'></div>
      {children}
    </section>
  );
}

export default WrapperLayout;
