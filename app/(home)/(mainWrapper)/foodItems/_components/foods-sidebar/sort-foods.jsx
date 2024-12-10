"use client";
import { useFoodParams } from "@/app/hooks/usefoodParams";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
function SortFoods() {
  const { sortBy, setSortBy } = useFoodParams();
  const handleSortChange = (value) => {
    setSortBy(value);
  };
  return (
    <div>
      <h3 className='   font-robotoSlab pb-2'>Sort By</h3>
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
            className='border-muted-foreground '
          />
          <Label htmlFor='r1' className=' font-robotoSlab font-[400]'>
            Default
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='most_sales'
            id='r2'
            className='border-muted-foreground   '
          />
          <Label htmlFor='r2' className=' font-robotoSlab font-[400]'>
            Most Sales
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='top_rated'
            id='r3'
            className='border-muted-foreground  '
          />
          <Label htmlFor='r3' className=' font-robotoSlab font-[400]'>
            Top Rating
          </Label>
        </div>
        <div className='flex items-center space-x-2'>
          <RadioGroupItem
            value='least_prepared_time'
            id='r4'
            className='border-muted-foreground  '
          />
          <Label htmlFor='r4' className=' font-robotoSlab font-[400]'>
            Minimum Preparation Time
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
}

export default SortFoods;
