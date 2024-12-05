"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updateOrderStatus } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

const FormSchema = z.object({
  order_status: z.enum(["pending", "delivered", "cancelled"], {
    required_error: "You need to select a status type.",
  }),
});

function EditOrderModal({ onClose, order }) {
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      order_status: order?.order_status,
    },
  });

  const onSubmit = async (data) => {
    const status = data?.order_status;

    try {
      const response = await updateOrderStatus({ orderId: order?.id, status });
      if (response?.status === 200) {
        onClose();
        toast.success("Order status updated successfully!");
      }
    } catch (error) {
      const errorMessage = error?.message || "Failed to update order status!";
      toast.error(errorMessage);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md  h-auto max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-md overflow-x-hidden flex flex-col justify-center items-center gap-y-6'>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6'
          >
            <FormField
              control={form.control}
              name='order_status'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel className='text-2xl '>
                    Update order status
                  </FormLabel>
                  <FormDescription>
                    This action will change the order status in database!!.
                  </FormDescription>
                  <FormControl className='pt-4'>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className='flex flex-col space-y-0 '
                    >
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='pending' />
                        </FormControl>
                        <FormLabel className='font-medium'>Pending</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='delivered' />
                        </FormControl>
                        <FormLabel className='font-medium'>Delivered</FormLabel>
                      </FormItem>
                      <FormItem className='flex items-center space-x-3 space-y-0'>
                        <FormControl>
                          <RadioGroupItem value='cancelled' />
                        </FormControl>
                        <FormLabel className='font-medium'>Cancelled</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='justify-self-end flex items-center gap-x-2 '>
              <Button
                type='button'
                variant='warning'
                className='capitalize  md:text-sm font-medium'
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button type='submit' variant='destructive'>
                Update
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default EditOrderModal;
