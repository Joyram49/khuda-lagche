"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { FoodItemsParamsContext } from "../context";

function FoodParamsProvider({ children, initialFilters }) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.search);
  const [sortBy, setSortBy] = useState(initialFilters.sortBy);
  const [priceRange, setPriceRange] = useState([
    initialFilters.minPrice,
    initialFilters.maxPrice,
  ]);
  const [categories, setCategories] = useState(initialFilters.categoryIds);
  const [debouncedValue, setDebouncedValue] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // **1. Generate query string whenever state changes**
  const paramString = useMemo(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.append("search", searchTerm);
    }

    if (sortBy && sortBy !== "default") {
      params.append("sortBy", sortBy);
    }

    if (priceRange?.length === 2) {
      params.append("minPrice", priceRange[0]);
      params.append("maxPrice", priceRange[1]);
    }

    if (categories.length > 0) {
      params.append("categoryIds", categories.join(","));
    }

    return params.toString();
  }, [searchTerm, sortBy, priceRange, categories]);

  // **2. Update URL whenever `paramString` changes**
  useEffect(() => {
    if (paramString) {
      router.replace(`${pathname}?${paramString}`);
    }
  }, [paramString, router, pathname]);

  // **3. Initialize state from URL on load**
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setSearchTerm(params.get("search") || "");
    setSortBy(params.get("sortBy") || "default");
    const categoryIds = params.get("categoryIds");
    setCategories(categoryIds ? categoryIds.split(",") : []);
    const minPrice = parseInt(params.get("minPrice") || "20", 10);
    const maxPrice = parseInt(params.get("maxPrice") || "3000", 10);
    setPriceRange([minPrice, maxPrice]);
  }, [searchParams]);

  return (
    <FoodItemsParamsContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        priceRange,
        setPriceRange,
        categories,
        setCategories,
        paramString,
        debouncedValue,
        setDebouncedValue,
      }}
    >
      {children}
    </FoodItemsParamsContext.Provider>
  );
}

export default FoodParamsProvider;
