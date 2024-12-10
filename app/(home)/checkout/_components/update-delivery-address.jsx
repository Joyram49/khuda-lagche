import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function UpdateDeliverAddress({ form, setIsDeliveryEdit, setDeliveryAddress }) {
  const handleDeliveryAddress = (e) => {
    e.stopPropagation();
    const house = form.getValues("delivery_address_house");
    const road = form.getValues("delivery_address_road");
    const block = form.getValues("delivery_address_block");
    setDeliveryAddress(`${house},${road},${block}`);
    setIsDeliveryEdit((prev) => !prev);
  };
  return (
    <div className=' grid sm:grid-cols-2 gap-4'>
      <FormField
        control={form.control}
        name='delivery_address_type'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Address Type <span className='text-red-500'>*</span>
            </FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue='home'>
                <SelectTrigger className='bg-backgroundF border-[1px] border-border dark:border-borderF'>
                  <SelectValue placeholder='Select an address type' />
                </SelectTrigger>
                <SelectContent className='font-robotoSlab bg-backgroundF border-[1px] border-border dark:border-borderF'>
                  <SelectItem value='home' className='focus:bg-topBackground'>
                    Home
                  </SelectItem>
                  <SelectItem value='office' className='focus:bg-topBackground'>
                    Office
                  </SelectItem>
                  <SelectItem value='other' className='focus:bg-topBackground'>
                    Other
                  </SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='delivery_address_house'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              House# <span className='text-red-500'>*</span>{" "}
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter  house no.'
                className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='delivery_address_road'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Road <span className='text-red-500'>*</span>{" "}
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter road no.'
                className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='delivery_address_block'
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Block <span className='text-red-500'>*</span>{" "}
            </FormLabel>
            <FormControl>
              <Input
                placeholder='Enter block no.'
                className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Button
        className='self-end max-w-fit'
        type='button'
        onClick={(e) => handleDeliveryAddress(e)}
      >
        Save
      </Button>
    </div>
  );
}

export default UpdateDeliverAddress;
