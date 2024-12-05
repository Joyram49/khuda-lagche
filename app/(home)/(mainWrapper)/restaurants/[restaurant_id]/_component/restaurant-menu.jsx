"use client";
import { useHeaderHeight } from "@/app/hooks/useHeaderHeight";
import React, { useState } from "react";
import CategoryNavigation from "./category-navigation";

function RestaurantMenu({ children, uniqueCategories }) {
  const [activeCategory, setActiveCategory] = useState(uniqueCategories[0]?.id);

  const { headerHeight: headerheight } = useHeaderHeight();

  const handleScrollToCategory = (categoryId) => {
    const categoryElement = document.getElementById(categoryId);
    setActiveCategory(categoryId); // Set the active category
    if (categoryElement) {
      categoryElement.scrollIntoView({
        behavior: "smooth",
        block: "center", // Ensure the category section is centered on scroll
      });
    }
  };

  return (
    <div className='w-full'>
      {/* Category Navigation */}
      <CategoryNavigation
        uniqueCategories={uniqueCategories}
        activeCategory={activeCategory}
        handleScrollToCategory={handleScrollToCategory}
      />

      {/* Food Content */}
      {React.cloneElement(children, { headerheight })}
    </div>
  );
}

export default RestaurantMenu;
