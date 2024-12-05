"use client";
import { useFoodParams } from "@/app/hooks/usefoodParams";
import FoodCardSkeletonLoader from "@/components/loader/food-card-loader";
import Spinner from "@/components/loader/spinner";
import NoFoodItemsFound from "@/components/not-found/empty-fooditems";
import RippleButton from "@/components/ripple-effect";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import FoodContentCard from "./food-content";
import FoodsSearchBar from "./foods-searchbar";

const limit = 10;

function FoodItemsContainer() {
  const [dynamicFoodItems, setDynamicFoodItems] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [previousParamString, setPreviousParamString] = useState("");
  const loaderRef = useRef(null);
  const {
    paramString,
    searchTerm,
    setSearchTerm,
    setSortBy,
    setPriceRange,
    setCategories,
    setDebouncedValue,
  } = useFoodParams();

  // use effect for fetch initial food items
  useEffect(() => {
    async function fetchInitialData() {
      setInitialLoading(true);
      try {
        const response = await fetch(`/api/foodItems?${paramString}`);
        const result = await response.json();
        setDynamicFoodItems(result);
        setPage(2);
        setHasMore(result?.length === limit);
      } catch (error) {
        console.error("Error fetching initial foods:", error);
        setDynamicFoodItems([]);
      } finally {
        setInitialLoading(false);
      }
    }

    if (paramString !== previousParamString) {
      setDynamicFoodItems([]);
      fetchInitialData();
      setPreviousParamString(paramString);
    }
  }, [previousParamString, paramString]);

  // Fetch additional food items when infinite scroll active
  useEffect(() => {
    const fetchUpdatedFoodItems = async () => {
      if (isLoading || !hasMore || page === 1) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/foodItems?page=${page}&limit=${limit}&${paramString}`
        );
        const updatedFoodItems = await response.json();

        if (updatedFoodItems?.length === 0) {
          setHasMore(false);
        } else {
          setDynamicFoodItems((prevItems) => [
            ...prevItems,
            ...updatedFoodItems,
          ]);

          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const onIntersection = (entries) => {
      const loaderEntry = entries[0];
      if (loaderEntry.isIntersecting) {
        fetchUpdatedFoodItems();
      }
    };

    const observer = new IntersectionObserver(onIntersection, {
      threshold: 1.0,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [paramString, page, hasMore, isLoading]);

  const handleResetFilter = () => {
    setDebouncedValue("");
    setSearchTerm("");
    setSortBy("default");
    setPriceRange([20, 3000]);
    setCategories([]);
    setPreviousParamString("");
  };

  return (
    <div className='flex flex-col gap-y-6 font-robotoSlab'>
      <div className='w-full flex flex-col gap-2 md:flex-row md:justify-between items-center'>
        <div className='w-full'>
          <FoodsSearchBar />
        </div>
        <RippleButton
          className='flex items-center gap-x-2'
          onClick={handleResetFilter}
        >
          <Settings
            size={26}
            className='font-medium stroke-[3px]  stroke-white'
          />
          Clear Filter
        </RippleButton>
      </div>
      <div className='py-2 pl-1 text-customYellow '>
        {initialLoading ? (
          <p>Loading food items</p>
        ) : dynamicFoodItems?.length > 0 ? (
          searchTerm ? (
            <p className='text-sm font-robotoSlab '>
              Food searches with{" "}
              <span className='font-bold'>"{searchTerm}"</span> keyword are
              matched with {dynamicFoodItems?.length} food item(s).
            </p>
          ) : (
            <p className='text-sm font-robotoSlab '>
              Showing total{" "}
              <span className='font-bold'>{dynamicFoodItems?.length}</span> food
              item(s).
            </p>
          )
        ) : (
          <p>No food items found</p>
        )}
      </div>
      <div className='w-full h-auto mb-10'>
        <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-6'>
          {initialLoading ? (
            <FoodCardSkeletonLoader count={6} />
          ) : dynamicFoodItems?.length > 0 ? (
            dynamicFoodItems.map((food) => (
              <FoodContentCard key={food.id} data={food} />
            ))
          ) : (
            <NoFoodItemsFound />
          )}
        </div>
      </div>
      {hasMore && (
        <div ref={loaderRef} className='flex justify-center items-center my-10'>
          <Spinner className={"fill-customYellow stroke-[8px]"} />
        </div>
      )}
    </div>
  );
}

export default FoodItemsContainer;
