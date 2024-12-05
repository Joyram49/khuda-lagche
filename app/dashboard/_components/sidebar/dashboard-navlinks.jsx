"use client";
import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";

function DashBoardNavlinks({ activeOrder }) {
  const pathName = usePathname();

  return (
    <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
      <Link
        href='/dashboard'
        className={`${
          pathName === "/dashboard"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        } flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2  transition-all `}
      >
        <Home className='h-4 w-4' />
        Dashboard
      </Link>
      <Link
        href='/dashboard/orders'
        className={`${
          pathName === "/dashboard/orders"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        } flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2  transition-all `}
      >
        <ShoppingCart className='h-4 w-4' />
        Orders
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          {activeOrder?.length}
        </Badge>
      </Link>
      <Link
        href='/dashboard/restaurants'
        className={`${
          pathName === "/dashboard/restaurants"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        } flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2  transition-all `}
      >
        <Package className='h-4 w-4' />
        Restaurants
      </Link>
      <Link
        href='/dashboard/customers'
        className={`${
          pathName === "/dashboard/customers"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        } flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2  transition-all `}
      >
        <Users className='h-4 w-4' />
        Customers
      </Link>
      <Link
        href='/dashboard/analytics'
        className={`${
          pathName === "/dashboard/analytics"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        } flex items-center gap-3 rounded-lg px-3 text-muted-foreground py-2  transition-all `}
      >
        <LineChart className='h-4 w-4' />
        Analytics
      </Link>
    </nav>
  );
}

export default DashBoardNavlinks;
