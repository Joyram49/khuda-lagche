"use client";
import { useFoodParams } from "@/app/hooks/usefoodParams";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { TbCurrencyTaka } from "react-icons/tb";

function PriceRangeSlider() {
  const { priceRange, setPriceRange } = useFoodParams();
  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className='w-full flex flex-col'>
      <div className='w-full flex lg:flex-col xl:flex-row  justify-start items-center text-muted-foreground font-robotoSlab pb-3 font-medium '>
        <h1 className='flex items-center mr-2'>
          Price Range ( <TbCurrencyTaka className='stroke-[2.5px]' />) :{" "}
        </h1>
        <span>
          {priceRange[0]} - {priceRange[1]}
        </span>
      </div>
      <Slider
        value={priceRange}
        min={20}
        max={3000}
        step={10}
        className={cn("w-full")}
        onValueChange={handlePriceRangeChange}
      />
    </div>
  );
}

export default PriceRangeSlider;
