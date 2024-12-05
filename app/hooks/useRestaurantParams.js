"use client";

import { useContext } from "react";
import { RestaurantParamsContext } from "../context";

export const useRestaurantParams = () => useContext(RestaurantParamsContext);
