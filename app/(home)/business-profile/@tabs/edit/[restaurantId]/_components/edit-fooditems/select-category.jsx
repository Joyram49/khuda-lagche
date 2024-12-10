"use client";
import { Check, ChevronsUpDown } from "lucide-react";

import Portal from "@/components/portal";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
function SelectCategories({ categories, form }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <FormField
      control={form.control}
      name='category'
      render={({ field }) => (
        <FormItem className='flex flex-col'>
          <FormLabel>Select Category</FormLabel>

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant='outline'
                  role='combobox'
                  className={cn(
                    "w-[200px] justify-between border-[1px] border-border dark:border-borderF",
                    !field.value && "text-pText"
                  )}
                >
                  {field.value
                    ? categories.find((category) => category.id === field.value)
                        ?.name
                    : "Select Category"}
                  <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <Portal>
              <PopoverContent className='w-[200px] p-0 z-[999] border-[1px] border-border dark:border-borderF'>
                <Command className='bg-topBackground'>
                  <CommandInput
                    placeholder='Search Category...'
                    onValueChange={(value) => setSearchTerm(value)}
                  />
                  <CommandList>
                    <CommandEmpty>No Category found.</CommandEmpty>
                    <CommandGroup>
                      {filteredCategories?.map((category) => (
                        <CommandItem
                          value={category?.id}
                          key={category?.id}
                          className='hover:bg-backgroundF'
                          onSelect={() => {
                            form.setValue("category", category?.id);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              category.id === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {category.name}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Portal>
          </Popover>
          <FormDescription>
            This is the category that will be used in the food.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default SelectCategories;
