"use client";
import { useRestaurantParams } from "@/app/hooks/useRestaurantParams";
import FoodCardSkeletonLoader from "@/components/loader/food-card-loader";
import Spinner from "@/components/loader/spinner";
import NoFoodItemsFound from "@/components/not-found/empty-fooditems";
import RippleButton from "@/components/ripple-effect";
import { Settings } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RestaurantCard from "./restaurant-card";

const limit = 5;

function RestaurantsContent({ restaurants, favRestaurants, loggedInUser }) {
  const [dynamicRestaurants, setDynamicRestaurants] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [previousParamString, setPreviousParamString] = useState("");
  const loaderRef = useRef(null);

  const {
    searchTerm,
    setSearchTerm,
    setSortBy,
    setCategories,
    paramString,
    setDebouncedValue,
  } = useRestaurantParams();

  // useEffect for fetch initial restaurants
  useEffect(() => {
    async function fetchInitialData() {
      setInitialLoading(true);
      try {
        const response = await fetch(`/api/restaurants?${paramString}`);
        const result = await response.json();
        setDynamicRestaurants(result);
        setPage(2);
        setHasMore(result?.length === limit);
      } catch (error) {
        console.error("Error fetching initial restrants:", error);
        setDynamicRestaurants([]);
      } finally {
        setInitialLoading(false);
      }
    }
    if (paramString !== previousParamString) {
      setDynamicRestaurants([]);
      fetchInitialData();
      setPreviousParamString(paramString);
    }
  }, [paramString, previousParamString]);

  // fetch additional restaurants when infinite scroll active
  useEffect(() => {
    const fetchUpdatedRestaurants = async () => {
      if (isLoading || !hasMore || page === 1) return;
      setIsLoading(true);

      try {
        const response = await fetch(
          `/api/restaurants?page=${page}&limit=${limit}&${paramString}`
        );
        const updatedRestaurants = await response.json();

        if (updatedRestaurants?.length === 0) {
          setHasMore(false);
        } else {
          setDynamicRestaurants((prevItems) => [
            ...prevItems,
            ...updatedRestaurants,
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
        fetchUpdatedRestaurants();
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
    setCategories([]);
    setPreviousParamString("");
  };

  return (
    <div className='w-full flex flex-col items-start gap-y-5'>
      <div className='w-full flex flex-col gap-2 md:flex-row md:justify-between items-center  pl-1 text-customYellow '>
        {initialLoading ? (
          <p>Loading Restaurants</p>
        ) : dynamicRestaurants?.length > 0 ? (
          searchTerm ? (
            <p className='text-sm font-robotoSlab '>
              restaurant searches with{" "}
              <span className='font-bold'>"{searchTerm}"</span> keyword are
              matched with {dynamicRestaurants?.length} restaurant(s).
            </p>
          ) : (
            <p className='text-sm font-robotoSlab '>
              Showing total{" "}
              <span className='font-bold'>{dynamicRestaurants?.length}</span>{" "}
              restaurant(s).
            </p>
          )
        ) : (
          <p>No Restaurants found</p>
        )}

        {paramString && (
          <RippleButton
            className='flex items-center gap-x-2 dark:bg-topBackground dark:text-pText dark:hover:bg-backgroundF border-[1px] border-border dark:border-borderF'
            onClick={handleResetFilter}
          >
            <Settings
              size={20}
              className='font-medium stroke-[3px]  stroke-white'
            />
            Clear Filter
          </RippleButton>
        )}
      </div>
      <div className='w-full grid grid-cols-[repeat(auto-fit,minmax(275px,1fr))] gap-6 '>
        {initialLoading ? (
          <FoodCardSkeletonLoader count={6} />
        ) : dynamicRestaurants?.length > 0 ? (
          dynamicRestaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant?.id}
              data={restaurant}
              favRestaurants={favRestaurants}
              loggedInUser={loggedInUser}
            />
          ))
        ) : (
          <NoFoodItemsFound />
        )}
      </div>
      {hasMore && (
        <div
          ref={loaderRef}
          className='self-center flex justify-center items-center my-10'
        >
          <Spinner className={"fill-customYellow stroke-[8px]"} />
        </div>
      )}
    </div>
  );
}

export default RestaurantsContent;
