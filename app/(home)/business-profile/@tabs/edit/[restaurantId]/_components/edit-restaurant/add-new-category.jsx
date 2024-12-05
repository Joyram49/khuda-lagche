"use client";

import { Button } from "@/components/ui/button";

function AddNewCategoryBtn({ setIsModalOpen }) {
  const handleModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };
  return (
    <p className='text-sm font-normal text-deepInitial'>
      Didn't find the category? Add new{" "}
      <Button
        type='button'
        variant='link'
        className='py-0 px-1 underline hover:text-hoverYellow'
        onClick={(e) => handleModal(e)}
      >
        here
      </Button>
      .
    </p>
  );
}

export default AddNewCategoryBtn;
