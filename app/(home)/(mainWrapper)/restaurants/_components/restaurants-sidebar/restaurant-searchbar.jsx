"use client";
import { useRestaurantParams } from "@/app/hooks/useRestaurantParams";
import { Search } from "lucide-react";
import { useEffect } from "react";

function RestauranSearchBar() {
  const { searchTerm, setSearchTerm, debouncedValue, setDebouncedValue } =
    useRestaurantParams();

  // Handle debouncing for input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(debouncedValue);
    }, 300); // 300ms debounce time

    return () => clearTimeout(handler);
  }, [debouncedValue, setSearchTerm]);

  // handle search text
  const handleInputChange = (e) => {
    setDebouncedValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='max-w-sm'>
      <h1 className='text-lg font-medium text-muted-foreground font-robotoSlab pb-2'>
        Search Restaurant
      </h1>
      <form className='w-full relative' onSubmit={handleSubmit}>
        <input
          type='text'
          value={debouncedValue}
          placeholder='search by restaurant name...'
          onChange={handleInputChange}
          className={`w-full h-8 border border-slate-900/10 drop-shadow-sm rounded-md pl-8  bg-deepBackground text-muted-foreground text-sm font-robotoSlab outline-none focus:outline-customYellow outline-offset-0 peer`}
        />
        <Search
          className='stroke-2 stroke-muted-foreground absolute top-0 left-0 z-10 bg-white h-8 w-7 p-1 border-[1px] border-slate-900/10 drop-shadow-sm  rounded-md peer-focus:stroke-hoverYellow peer-focus:stroke-4'
          size={18}
        />
      </form>
    </div>
  );
}

export default RestauranSearchBar;
