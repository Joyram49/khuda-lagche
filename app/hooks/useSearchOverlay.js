"use client";
import { useContext } from "react";
import { SearchOverlayContext } from "../context";

export const useSearchOverlay = () => useContext(SearchOverlayContext);
