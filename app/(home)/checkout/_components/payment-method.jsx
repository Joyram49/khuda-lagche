import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import bkashImg from "@/public/assets/bkash.png";
import codImg from "@/public/assets/cod.png";
import OtherImg from "@/public/assets/other.png";
import stripeImg from "@/public/assets/stripe.png";
import Image from "next/image";

function PaymentMethod({ form }) {
  return (
    <div className='bg-white border border-gray-200 rounded-md p-6'>
      <FormField
        control={form.control}
        name='payment_method'
        render={({ field }) => (
          <FormItem>
            <FormLabel className='text-xl font-medium'>
              Select Payment Method
            </FormLabel>
            <FormControl className='pt-4'>
              <RadioGroup className='space-y-2' defaultValue='stripe'>
                <Label
                  htmlFor='r1'
                  className='flex items-center space-x-4 border border-slate-800/10 hover:border-slate-800 rounded-sm p-4 cursor-pointer transition-colors duration-100 ease-linear drop-shadow-sm group'
                >
                  <RadioGroupItem value='cash on delivery' id='r1' disabled />
                  <div className='flex items-center gap-x-2'>
                    <Image
                      src={codImg}
                      alt='payment-method-1'
                      width={24}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <p className='capitalize'>cash on delivery</p>
                  </div>
                </Label>

                <Label
                  htmlFor='r2'
                  className='flex items-center space-x-4 border border-slate-800 rounded-sm p-4'
                >
                  <RadioGroupItem value='stripe' id='r2' />
                  <div className='flex items-center gap-x-2'>
                    <Image
                      src={stripeImg}
                      alt='payment-method-1'
                      width={24}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <p className='capitalize'>stripe</p>
                  </div>
                </Label>
                <Label
                  htmlFor='r3'
                  className='flex items-center space-x-4 border border-slate-800/10 hover:border-slate-800 rounded-sm p-4 cursor-pointer transition-colors duration-100 ease-linear drop-shadow-sm group'
                >
                  <RadioGroupItem value='bkash' id='r3' disabled />
                  <div className='flex items-center gap-x-2'>
                    <Image
                      src={bkashImg}
                      alt='payment-method-1'
                      width={24}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <p>Bkash</p>
                  </div>
                </Label>
                <Label
                  htmlFor='r4'
                  className='flex items-center space-x-4 border border-slate-800/10 hover:border-slate-800 rounded-sm p-4 cursor-pointer transition-colors duration-100 ease-linear drop-shadow-sm group'
                >
                  <RadioGroupItem value='other' id='r4' disabled />
                  <div className='flex items-center gap-x-2'>
                    <Image
                      src={OtherImg}
                      alt='payment-method-1'
                      width={24}
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                    <p>Other Online payment</p>
                  </div>
                </Label>
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}

export default PaymentMethod;
