"use client";
import { useState } from "react";
import { CartItemCountContext } from "../context";

function CartItemCountProvider({ children }) {
  const [cartData, setCartData] = useState({});
  return (
    <CartItemCountContext.Provider value={{ cartData, setCartData }}>
      {children}
    </CartItemCountContext.Provider>
  );
}

export default CartItemCountProvider;
