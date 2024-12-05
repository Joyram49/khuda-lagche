"use client";

import Portal from "@/components/portal";
import RippleButton from "@/components/ripple-effect";
import FoodDetailsModal from "@/modal/food-details-modal";
import { useState } from "react";

function DishCardBtn({ data }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleModal = () => {
    setIsOpenModal(true);
  };

  return (
    <>
      <RippleButton
        variant='warning'
        size='custom'
        className='text-sm capitalize '
        onClick={handleModal}
      >
        Quick View
      </RippleButton>
      {isOpenModal && (
        <Portal>
          <FoodDetailsModal data={data} onClose={() => setIsOpenModal(false)} />
        </Portal>
      )}
    </>
  );
}

export default DishCardBtn;
