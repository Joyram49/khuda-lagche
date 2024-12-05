"use client";
import { useRestaurantParams } from "@/app/hooks/useRestaurantParams";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
function SortFoods() {
  const { sortBy, setSortBy } = useRestaurantParams();
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  return (
    <div>
      <h3 className='  text-muted-foreground font-robotoSlab pb-2'>Sort By</h3>
      <RadioGroup
        defaultValue='default'
        className='gap-3'
        value={sortBy}
        onValueChange={handleSortChange}
      >
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='default'
            id='r1'
            className='border-muted-foreground text-muted-foreground'
          />
          <Label
            htmlFor='r1'
            className='text-muted-foreground font-robotoSlab font-[400]'
          >
            Default
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='most_sales'
            id='r2'
            className='border-muted-foreground text-muted-foreground  '
          />
          <Label
            htmlFor='r2'
            className='text-muted-foreground font-robotoSlab font-[400]'
          >
            Top Seller
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='top_rated'
            id='r3'
            className='border-muted-foreground text-muted-foreground '
          />
          <Label
            htmlFor='r3'
            className='text-muted-foreground font-robotoSlab font-[400]'
          >
            Top Rated
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='favourites'
            id='r4'
            className='border-muted-foreground text-muted-foreground '
          />
          <Label
            htmlFor='r4'
            className='text-muted-foreground font-robotoSlab font-[400]'
          >
            Most Favourites
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default SortFoods;
