"use client";
import { useContext } from "react";
import { FoodItemsParamsContext } from "../context";

export const useFoodParams = () => useContext(FoodItemsParamsContext);
