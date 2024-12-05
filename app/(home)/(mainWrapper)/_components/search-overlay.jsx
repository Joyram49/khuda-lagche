"use client";
import { useSearchOverlay } from "@/app/hooks/useSearchOverlay";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Overlay = () => {
  const { searchOverlay } = useSearchOverlay();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!searchOverlay || !mounted) return null;

  return createPortal(
    <div
      className='fixed inset-0 bg-black bg-opacity-50 z-10'
      style={{ height: "100%" }}
    />,
    document.getElementById("overlay-root")
  );
};

export default Overlay;
