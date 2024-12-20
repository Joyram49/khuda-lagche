"use client";
import Link from "next/link";

import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { usePathname } from "next/navigation";

import { useEffect } from "react";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export function MobileNav({ items, children, handleClick, loginSession }) {
  useLockBody();
  let pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      handleClick();
    }
  }, [pathName, handleClick]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 lg:hidden"
      )}
    >
      <div className='relative z-20 grid gap-6 rounded-md bg-topBackground p-4 text-popover-foreground shadow-md border-[1px] border-border dark:border-borderF mt-10'>
        <button
          className='flex items-center space-x-2 lg:hidden absolute top-4 right-4'
          onClick={() => handleClick()}
        >
          <X />
        </button>
        <nav className='grid grid-flow-row auto-rows-max text-sm'>
          {items.map((item, index) => {
            pathName = pathName === "/" ? "home" : pathName;
            const isInclude = pathName.includes(item.title);
            return (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline capitalize",
                  isInclude && "text-customYellow hover:text-hoverYellow",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
        {!loginSession?.user && (
          <div className='items-center gap-3 flex lg:hidden'>
            <Link
              href='/login'
              className={cn(buttonVariants({ size: "sm" }), "px-4")}
            >
              Login
            </Link>
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
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
