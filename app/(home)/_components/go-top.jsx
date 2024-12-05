"use client";
import RippleButton from "@/components/ripple-effect";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

function GoTop() {
  const [visible, setVisible] = useState(false);

  // Function to handle scroll
  const toggleVisibility = () => {
    const triggerPoint = 115;

    if (window.scrollY > triggerPoint) {
      setVisible(true);
    } else if (window.scrollY <= triggerPoint) {
      setVisible(false);
    }
  };

  // Function to scroll to top smoothly
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  };

  // Effect to listen for scroll events
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div
      className={`fixed bottom-5 right-5 transition-all duration-500 ease-in-out transform ${
        visible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
      }`}
      style={{
        transitionProperty: "transform, opacity",
      }}
    >
      <RippleButton
        variant='warning'
        onClick={scrollToTop}
        className='p-3 h-12 w-12 text-white rounded-full shadow-lg  transition'
        aria-label='Go to top'
      >
        <ArrowUp className='h-6 w-6 ' />
      </RippleButton>
    </div>
  );
}

export default GoTop;
