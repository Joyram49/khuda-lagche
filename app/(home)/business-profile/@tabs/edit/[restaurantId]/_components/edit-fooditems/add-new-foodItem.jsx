"use client";

import Portal from "@/components/portal";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import AddFoodItemModal from "./add-foodItem-modal";

function AddNewFoodItem({ restaurant, categories }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleClick = (e) => {
    setIsModalOpen(true);
  };
  return (
    <>
      <Button className='text-[12px] h-10' onClick={handleClick}>
        Add New Food
      </Button>
      {isModalOpen && (
        <Portal>
          <AddFoodItemModal
            onClose={() => setIsModalOpen(false)}
            restaurantInfo={restaurant}
            categories={categories}
          />
        </Portal>
      )}
    </>
  );
}

export default AddNewFoodItem;
