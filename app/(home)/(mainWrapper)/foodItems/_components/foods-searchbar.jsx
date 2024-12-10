"use client";
import { useFoodParams } from "@/app/hooks/usefoodParams";
import { useSearchOverlay } from "@/app/hooks/useSearchOverlay";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Overlay from "../../_components/search-overlay";

function FoodsSearchBar() {
  const [placeholderText, setPlaceholderText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null); // Create a ref for the input element
  const fullText = "Search for food";
  const { searchTerm, setSearchTerm, debouncedValue, setDebouncedValue } =
    useFoodParams();

  const { searchOverlay, setSearchOverlay } = useSearchOverlay();

  // Function to handle the typing effect
  useEffect(() => {
    if (isTyping) return;

    let currentIndex = 0;
    let typingForward = true;

    const typingInterval = setInterval(() => {
      if (typingForward) {
        setPlaceholderText(fullText.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === fullText.length) {
          typingForward = false;
        }
      } else {
        setPlaceholderText(fullText.slice(0, currentIndex - 1));
        currentIndex--;
        if (currentIndex === 0) {
          typingForward = true;
        }
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, [isTyping]);

  // Handle debouncing for input changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(debouncedValue);
      setSearchOverlay(false);
    }, 300); // 300ms debounce time

    return () => {
      clearTimeout(handler);
      setSearchOverlay(true);
    };
  }, [debouncedValue, setSearchTerm, setSearchOverlay]);

  // handle search text
  const handleInputChange = (e) => {
    setDebouncedValue(e.target.value);
  };

  // Handle input change to stop placeholder animation
  const handleInputFocus = () => {
    setIsTyping(true);
    setPlaceholderText(""); // Clear placeholder when typing
  };

  const handleInputBlur = () => {
    if (inputRef.current.value === "") {
      // Use ref to access input value
      setIsTyping(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className='w-full max-w-xl relative '>
      {searchOverlay && <Overlay />}
      <form
        className='w-full flex items-center gap-2  relative z-20'
        onSubmit={handleSubmit}
      >
        <input
          ref={inputRef}
          type='text'
          value={debouncedValue}
          placeholder={isTyping ? "" : placeholderText}
          onFocusCapture={() => setSearchOverlay(true)}
          onBlurCapture={() => setSearchOverlay(false)}
          className='w-full py-2   drop-shadow-sm rounded-md pl-12 bg-topBackground text-pText text-sm font-robotoSlab outline-none focus:outline-customYellow outline-offset-0 placeholder-[#e9a321] caret-customYellow border-[1px] border-border dark:border-borderF'
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChange={handleInputChange}
        />
        <div className='absolute top-0 w-10 h-full bg-topBackground rounded-l-md border-[1px] border-border dark:border-borderF drop-shadow-sm '></div>
        <Search
          className='stroke-2 stroke-[#e9a321] absolute top-1/2 -translate-y-1/2 left-3 z-10'
          size={18}
        />
      </form>
    </div>
  );
}

export default FoodsSearchBar;
