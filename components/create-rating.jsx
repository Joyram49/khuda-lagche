"use client";

import { Star } from "lucide-react";

function CreateRating({ value, setValue }) {
  const handleClick = (rating) => {
    setValue(rating);
  };

  return (
    <div className='flex items-center'>
      {Array(5)
        .fill()
        .map((_, index) => (
          <Star
            key={index}
            className={`
              star cursor-pointer hover:bg-deepBackground px-1 rounded-md 
              ${
                value > index
                  ? "fill-yellow-300 stroke-yellow-500"
                  : "fill-gray-300 stroke-gray-500"
              } `}
            onClick={() => handleClick(index + 1)}
          />
        ))}
    </div>
  );
}

export default CreateRating;
