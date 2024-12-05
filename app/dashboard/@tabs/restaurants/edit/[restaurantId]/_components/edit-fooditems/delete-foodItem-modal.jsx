"use client";
import { deleteFoodById } from "@/app/actions/foodItems";
import { Button } from "@/components/ui/button";

function DeleteFoodItemModal({ onClose, foodInfo, restaurantName }) {
  const deleteFood = async (foodId) => {
    try {
      const response = await deleteFoodById(foodInfo.id);
      if (response?.status === 200) {
        onClose();
      }
    } catch (error) {
      console.log(error.message || `Error deleting food`);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-md  h-auto max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-md overflow-x-hidden flex flex-col justify-center items-center gap-y-6'>
        <div className='flex flex-col'>
          <h1 className='font-robotoSlab'>
            Do you want to remove
            <span
              dangerouslySetInnerHTML={{
                __html: ` &quot;<strong>${foodInfo?.name}</strong>&quot;`,
              }}
            />{" "}
            from resturant?
          </h1>
          <p className='text-initial font-robotoSlab text-sm'>
            This action will remove the food item permanantly!!.
          </p>
        </div>
        <div className='self-end flex items-center gap-x-2 '>
          <Button
            variant='warning'
            className='capitalize  md:text-sm font-medium'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant='destructive' onClick={deleteFood}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteFoodItemModal;
