"use client";
import { useHeaderHeight } from "@/app/hooks/useHeaderHeight";
import { useEffect, useRef, useState } from "react";
import { MainNav } from "./main-nav";
import TopBar from "./top-bar";

const navLinks = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "gallery", href: "/gallery" },
  { title: "foodItems", href: "/foodItems" },
  { title: "contact", href: "/contact" },
];

function Header({ session }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [topBarVisible, setTopBarVisible] = useState(true);
  const { setHeaderHeight } = useHeaderHeight();

  const headerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY;
      const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
      const headerHeight =
        headerRef.current?.offsetHeight || (isSmallScreen ? 135 : 115);
      const maxScrollPosition = isSmallScreen ? 62 : 42;

      let newScrollPosition = scrollPosition + deltaY;
      if (newScrollPosition < 0) newScrollPosition = 0;
      if (newScrollPosition > maxScrollPosition)
        newScrollPosition = maxScrollPosition;

      if (currentScrollY > headerHeight) {
        if (topBarVisible) {
          setTopBarVisible(false);
          setHeaderHeight(headerHeight - maxScrollPosition);
        }
      } else {
        if (!topBarVisible) {
          setTopBarVisible(true);
          setHeaderHeight(headerHeight); // Full height when top bar is visible
        }
      }

      setScrollPosition(newScrollPosition);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollPosition, lastScrollY, topBarVisible, setHeaderHeight]);
  return (
    <header
      ref={headerRef}
      className='z-30 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b h-auto'
      style={{
        transition: "transform 0.3s ease",
        transform: topBarVisible ? "translateY(0)" : `translateY(-50px)`,
      }}
    >
      <div className='bg-accent w-full py-[1px]'>
        <TopBar />
      </div>
      <div className='container flex items-center justify-between py-4'>
        <MainNav items={navLinks} session={session} />
      </div>
    </header>
  );
}

export default Header;
