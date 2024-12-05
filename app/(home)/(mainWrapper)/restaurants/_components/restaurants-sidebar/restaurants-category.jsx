"use client";

import { useRestaurantParams } from "@/app/hooks/useRestaurantParams";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function SelectCategory({ categories }) {
  const { categories: selectedCategories, setCategories } =
    useRestaurantParams();

  const toggleCategory = (categoryId) => {
    setCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className='w-full  flex items-center justify-start gap-x-2 flex-wrap space-y-4'>
      <h3 className='w-full font-medium text-muted-foreground'>
        Filter By Category:
      </h3>

      {/* Dropdown Menu */}
      <DropdownMenu className='w-full '>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='w-full max-w-[200px] justify-between'
          >
            {selectedCategories.length > 0
              ? `${selectedCategories.length} Selected`
              : "Select Categories"}
            <span>▼</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='w-full max-w-[200px] max-h-64 overflow-y-auto bg-white shadow-lg rounded-md py-4 px-2 space-y-2'>
          {categories.map((item) => (
            <div
              key={item.id}
              className='flex items-center justify-between hover:bg-gray-100 p-1 rounded-md'
              htmlFor={item.id}
            >
              <label
                htmlFor={item.id}
                className='text-sm text-gray-800 font-robotoSlab font-medium'
              >
                {item.name}
              </label>
              <Checkbox
                id={item.id}
                checked={selectedCategories.includes(item.id)}
                onCheckedChange={() => toggleCategory(item.id)}
              />
            </div>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Selected Categories as Badges */}
      {selectedCategories.length > 0 && (
        <div className='flex flex-wrap gap-2'>
          {selectedCategories.map((categoryId) => {
            const category = categories.find((item) => item.id === categoryId);
            return (
              <Badge
                key={categoryId}
                variant='secondary'
                className='capitalize text-sm font-medium px-3 py-1'
              >
                {category?.name}
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SelectCategory;
