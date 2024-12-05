"use client";
import { ListFilter, PlusCircle, Settings2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Link from "next/link";
function RestaurantsTableToolbar({ table, sortType, setSortType }) {
  return (
    <div className='flex flex-col xs:flex-row gap-y-2 xs:gap-y-0 gap-x-2 items-center py-4 font-robotoSlab  text-[#414549]'>
      {/* filter restaurants by restaurant name */}
      <Input
        placeholder='Find restaurant with name...'
        value={table.getColumn("name")?.getFilterValue() ?? ""}
        onChange={(event) =>
          table.getColumn("name")?.setFilterValue(event.target.value)
        }
        className='max-w-md'
      />
      <div className='ml-auto flex items-center gap-2'>
        {/* Sort restaurants by most popular, Top Favourite & Most Sales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 gap-1'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only md:not-sr-only md:whitespace-nowrap'>
                Sort
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-center'>
              Sort by
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={sortType === "Top Favourite"}
              onClick={() => setSortType("Top Favourite")}
            >
              Top Favourite
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortType === "Most Sales"}
              onClick={() => setSortType("Most Sales")}
            >
              Most Sales
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortType === "Popular"}
              onClick={() => setSortType("Popular")}
            >
              Popular
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortType === ""}
              onClick={() => setSortType("")}
            >
              All
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* filter columns view */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 gap-1'>
              <Settings2 className='h-3.5 w-3.5' />
              <span className='sr-only md:not-sr-only md:whitespace-nowrap'>
                View
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={`/dashboard/restaurants/add`}>
          <Button size='sm' className='h-8 gap-1'>
            <PlusCircle className='h-3.5 w-3.5' />
            <span className='sr-only md:not-sr-only md:whitespace-nowrap'>
              Add Restaurant
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default RestaurantsTableToolbar;
