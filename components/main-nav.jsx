"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

import { MobileNav } from "@/components/mobile-nav";
import { Menu } from "lucide-react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import CartButton from "./cart-btn";
import { Logo } from "./logo";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

export function MainNav({ items, children, session, path = null }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  let pathName = usePathname();

  const handleToggleMenu = (e) => {
    setShowMobileMenu((prev) => !prev);
  };

  return (
    <>
      <div className=''>
        <Link href='/'>
          <Logo />
        </Link>
      </div>
      <div className='flex-1 flex justify-end items-center gap-6 lg:gap-10 '>
        {items?.length ? (
          <nav className='hidden gap-6 lg:flex'>
            {items?.map((item, index) => {
              pathName = pathName === "/" ? "home" : pathName;
              const isInclude = pathName.includes(item.title);
              return (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    `flex items-center text-lg sm:text-sm font-medium transition-colors hover:text-foreground/80 capitalize  ${
                      isInclude && "text-customYellow hover:text-hoverYellow"
                    }  `
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
        ) : null}
        {showMobileMenu && items && (
          <MobileNav
            items={items}
            handleClick={handleToggleMenu}
            loginSession={session}
          >
            {children}
          </MobileNav>
        )}

        <div className='flex justify-center items-center gap-x-4'>
          <nav className='flex items-center gap-3'>
            {(!session?.user ||
              session?.error === "RefreshAccessTokenError") && (
              <div className='items-center gap-3 hidden lg:flex'>
                {!pathName.includes("login") && (
                  <Link
                    href='/login'
                    className={cn(buttonVariants({ size: "sm" }), "px-4")}
                  >
                    Login
                  </Link>
                )}
                {!pathName.includes("register") && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant='outline'
                        size='sm'
                        className='border-[1px] border-border dark:border-borderF'
                      >
                        Register
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align='end'
                      className='w-56 mt-4 bg-topBackground border-[1px] border-border dark:border-borderF'
                    >
                      <DropdownMenuItem className='cursor-pointer focus:bg-backgroundF'>
                        <Link href='/register/customer'>Customer</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer focus:bg-backgroundF'>
                        <Link href='/register/vendor'>Vendor</Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            )}

            {session?.user && session?.error !== "RefreshAccessTokenError" && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className='cursor-pointer'>
                    {session?.user?.profilePicture ? (
                      <Avatar>
                        <AvatarImage
                          src={`${urlEndpoint}${session?.user?.profilePicture}`}
                          alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    ) : (
                      <Avatar>
                        <AvatarImage
                          src='https://github.com/shadcn.png'
                          alt='@shadcn'
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </DropdownMenuTrigger>
                {session?.user?.role === "customer" ? (
                  <DropdownMenuContent
                    align='end'
                    className='w-56 mt-4 bg-topBackground border-[1px] border-border dark:border-borderF'
                  >
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/profile'>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/profile/orders'>My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/profile/reviews'>My reviews</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/profile/favourites'>
                        My Favourite Restaurants
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        session?.user
                          ? "block cursor-pointer focus:bg-backgroundF"
                          : "hidden cursor-pointer"
                      }`}
                      asChild
                    >
                      <Link href='#' onClick={() => signOut()}>
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                ) : (
                  <DropdownMenuContent
                    align='end'
                    className='w-56 mt-4 bg-topBackground border-[1px] border-border dark:border-borderF'
                  >
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/business-profile'>Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/business-profile/orders'>My Orders</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/business-profile/reviews'>My reviews</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className='cursor-pointer focus:bg-backgroundF'
                      asChild
                    >
                      <Link href='/business-profile/restaurants'>
                        My Restaurants
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className={`${
                        session?.user
                          ? "block cursor-pointer focus:bg-backgroundF"
                          : "hidden cursor-pointer"
                      }`}
                      asChild
                    >
                      <Link href='#' onClick={() => signOut()}>
                        Logout
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                )}
              </DropdownMenu>
            )}
            <button
              className='flex items-center space-x-2 lg:hidden'
              onClick={() => handleToggleMenu()}
            >
              <Menu />
            </button>
          </nav>
          <CartButton />
        </div>
      </div>
    </>
  );
}
