"use client";
import { ListFilter, Settings2 } from "lucide-react";

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
import { useState } from "react";
function UsersTableToolbar({ table, sortType, setSortType }) {
  const [searchFilter, setSearchFilter] = useState("name");
  return (
    <div className='flex flex-col xs:flex-row gap-y-2 xs:gap-y-0 gap-x-2 items-center py-4 font-robotoSlab  text-[#414549]'>
      {/* filter restaurants by restaurant name */}
      <div className='flex gap-x-2'>
        <Input
          placeholder={`Find user with ${searchFilter}...`}
          value={table.getColumn(searchFilter)?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn(searchFilter)?.setFilterValue(event.target.value)
          }
          className='max-w-sm h-8 text-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 gap-1'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only md:not-sr-only md:whitespace-nowrap text-sm'>
                Search Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-center'>
              Filter By
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={searchFilter === "name"}
              onClick={() => setSearchFilter("name")}
            >
              name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchFilter === "email"}
              onClick={() => setSearchFilter("email")}
            >
              email
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={searchFilter === "id"}
              onClick={() => setSearchFilter("id")}
            >
              id
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='ml-auto flex items-center gap-2'>
        {/* Sort restaurants by most popular, Top Favourite & Most Sales */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' size='sm' className='h-8 gap-1'>
              <ListFilter className='h-3.5 w-3.5' />
              <span className='sr-only md:not-sr-only md:whitespace-nowrap'>
                Filter
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel className='text-center'>
              Filter By
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuCheckboxItem
              checked={sortType === "customer"}
              onClick={() => setSortType("customer")}
            >
              Customer
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={sortType === "vendor"}
              onClick={() => setSortType("vendor")}
            >
              Vendor
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
      </div>
    </div>
  );
}

export default UsersTableToolbar;
