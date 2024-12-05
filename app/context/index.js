"use client";
import { createContext } from "react";

const HeaderHeightContext = createContext();
const SearchOverlayContext = createContext();
const CartItemCountContext = createContext();
const FoodItemsParamsContext = createContext();
const RestaurantParamsContext = createContext();

export {
  CartItemCountContext,
  FoodItemsParamsContext,
  HeaderHeightContext,
  RestaurantParamsContext,
  SearchOverlayContext,
};
