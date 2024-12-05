"use client";
import {
  Home,
  LineChart,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
function DashboardHeaderNavlinks({ activeOrder }) {
  const pathName = usePathname();

  return (
    <nav className='grid gap-2 text-lg font-medium'>
      <Link href='/' className='flex items-center gap-2 text-lg font-semibold'>
        <Package2 className='h-6 w-6' />
        <span className='sr-only'>Acme Inc</span>
      </Link>
      <Link
        href='/dashboard'
        className=''
        className={`${
          pathName === "/dashboard"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        }  transition-all  mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 `}
      >
        <Home className='h-5 w-5' />
        Dashboard
      </Link>
      <Link
        href='/dashboard/orders'
        className={`${
          pathName === "/dashboard/orders"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        }  transition-all  mx-[-0.65rem] flex items-center gap-4  rounded-xl px-3 py-2 `}
      >
        <ShoppingCart className='h-5 w-5' />
        Orders
        <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>
          {activeOrder}
        </Badge>
      </Link>
      <Link
        href='/dashboard/restaurants'
        className={`${
          pathName === "/dashboard/restaurants"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        }  transition-all  mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 `}
      >
        <Package className='h-5 w-5' />
        Restaurants
      </Link>
      <Link
        href='/dashboard/customers'
        className={`${
          pathName === "/customers"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        }  transition-all  mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 `}
      >
        <Users className='h-5 w-5' />
        Customers
      </Link>
      <Link
        href='/dashboard/analytics'
        className={`${
          pathName === "/dashboard/analytics"
            ? "bg-muted text-primary"
            : "hover:text-primary hover:bg-muted"
        }  transition-all  mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 `}
      >
        <LineChart className='h-5 w-5' />
        Analytics
      </Link>
    </nav>
  );
}

export default DashboardHeaderNavlinks;
