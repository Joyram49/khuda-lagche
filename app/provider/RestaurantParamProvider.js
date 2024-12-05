"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useEffect, useMemo, useState } from "react";
import { RestaurantParamsContext } from "../context";

function RestaurantParamsProvider({ children, initialFilter }) {
  const [searchTerm, setSearchTerm] = useState(initialFilter?.search);
  const [sortBy, setSortBy] = useState(initialFilter?.sortBy);
  const [categories, setCategories] = useState(initialFilter?.categoryIds);
  const [debouncedValue, setDebouncedValue] = useState("");

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  // **1. Generate query string whenever state changes**
  const paramString = useMemo(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.append("search", searchTerm);
    }
    if (sortBy) {
      params.append("sortBy", sortBy);
    }
    if (categories?.length > 0) {
      params.append("categoryIds", categories.join(","));
    }
    return params.toString();
  }, [searchTerm, sortBy, categories]);

  // **2. Update URL whenever `paramString` changes**
  useEffect(() => {
    if (paramString) {
      router.replace(`${pathName}?${paramString}`);
    } else {
      router.replace(pathName);
    }
  }, [paramString, router, pathName]);

  //   initialize state from URL on load
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setSearchTerm(params.get("search") || "");
    setSortBy(params.get("sortBy") || "default");
    const categoryIds = params.get("categoryIds");
    setCategories(categoryIds ? categoryIds.split(",") : []);
  }, [searchParams]);

  return (
    <RestaurantParamsContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        sortBy,
        setSortBy,
        categories,
        setCategories,
        paramString,
        debouncedValue,
        setDebouncedValue,
      }}
    >
      {children}
    </RestaurantParamsContext.Provider>
  );
}

export default RestaurantParamsProvider;
