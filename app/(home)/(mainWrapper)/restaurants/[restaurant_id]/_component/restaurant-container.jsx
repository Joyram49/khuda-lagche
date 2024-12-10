import FoodItemCard from "./foodItem-card";
function RestaurantFoodContainer({ category, foodItems }) {
  return (
    <div className='flex flex-col'>
      <h2 className='text-xl font-semibold text-pText mb-4'>
        {category?.name}
      </h2>
      <div className='grid grid-cols-1 lg:grid-cols-2  gap-4'>
        {foodItems
          .filter((food) => food?.category?.id === category?.id)
          .map((food) => (
            <FoodItemCard key={food.id} data={food} />
          ))}
      </div>
    </div>
  );
}

export default RestaurantFoodContainer;
