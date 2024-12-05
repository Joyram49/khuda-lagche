"use client";
import { useContext } from "react";
import { CartItemCountContext } from "../context";

export const useCartItemCount = () => useContext(CartItemCountContext);
