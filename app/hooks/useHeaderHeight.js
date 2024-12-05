"use client";
import { useContext } from "react";
import { HeaderHeightContext } from "../context";

export const useHeaderHeight = () => useContext(HeaderHeightContext);
