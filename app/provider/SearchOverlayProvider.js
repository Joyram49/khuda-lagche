"use client";
import { useState } from "react";
import { SearchOverlayContext } from "../context";

function SearchOverlayProvider({ children }) {
  const [searchOverlay, setSearchOverlay] = useState(false);
  return (
    <SearchOverlayContext.Provider value={{ searchOverlay, setSearchOverlay }}>
      {children}
    </SearchOverlayContext.Provider>
  );
}

export default SearchOverlayProvider;
