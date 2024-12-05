"use client";
import { useEffect, useState } from "react";
import { HeaderHeightContext } from "../context";
const HeaderHeightProvider = ({ children }) => {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Check for cartId in localStorage, and set it if not present
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      const newCartId = crypto.randomUUID(); // Generate a unique cartId
      localStorage.setItem("cartId", newCartId);
    }
  }, []);
  return (
    <HeaderHeightContext.Provider value={{ headerHeight, setHeaderHeight }}>
      {children}
    </HeaderHeightContext.Provider>
  );
};

export default HeaderHeightProvider;
