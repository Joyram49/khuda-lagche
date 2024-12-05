"use client";

import Portal from "@/components/portal";
import { useState } from "react";
import RestaurantReviewModal from "./restaurant-review-modal";

function RestaurantReviews({ restaurantId, userInfo, reviews }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div
      className='ml-2 text-foreground font-inter hover:underline hover:text-hoverYellow font-[400] text-sm cursor-pointer'
      onClick={handleModal}
    >
      <p>See Reviews</p>
      {isModalOpen && (
        <Portal>
          <RestaurantReviewModal
            restaurantId={restaurantId}
            userInfo={userInfo}
            reviews={reviews}
            onClose={() => setIsModalOpen(false)}
          />
        </Portal>
      )}
    </div>
  );
}

export default RestaurantReviews;
