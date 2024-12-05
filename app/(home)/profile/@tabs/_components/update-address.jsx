"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updatePrfileInfo } from "@/app/actions/account";
import LoadingBtn from "@/components/loader/loading-btn";
import { Button } from "@/components/ui/button";
import {
  Form,
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
} from "@/components/ui/select"; // Import Shadcn select components
import { toast } from "sonner";

const FormSchema = z.object({
  addressType: z
    .string({ required_error: "address type is required" })
    .nonempty("address type is required"),
  house: z
    .string({ required_error: "house name is required" })
    .nonempty("house name is required"),
  road: z
    .string({ required_error: "road no.  is required" })
    .nonempty("road no.  is required"),
  block: z
    .string({ required_error: "block no.  is required" })
    .nonempty("block no.  is required"),
});

function UpdateAddress({ user }) {
  const addressInArray = user?.address ? user.address.split(", ") : [];
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      addressType: addressInArray[0] ?? "",
      house: addressInArray[1] ?? "",
      road: addressInArray[2] ?? "",
      block: addressInArray[3] ?? "",
    },
  });

  async function onSubmit(data) {
    const address = Object.values(data).join(", ");
    const formData = {
      email: user?.email,
      address,
    };
    try {
      const response = await updatePrfileInfo(formData);
      if (response?.id) {
        toast.success("user address successfully updated");
        form.reset();
      }
    } catch (error) {
      toast.error("failed to update user address");
    }
  }
  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4'
      >
        <div className=' grid sm:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='addressType'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Address Type <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={addressInArray[0]}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select an address type' />
                    </SelectTrigger>
                    <SelectContent className='font-robotoSlab'>
                      <SelectItem value='home'>Home</SelectItem>
                      <SelectItem value='office'>Office</SelectItem>
                      <SelectItem value='other'>Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='house'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  House# <span className='text-red-500'>*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter  house no.'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='road'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Road <span className='text-red-500'>*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter road no.'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='block'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Block <span className='text-red-500'>*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter block no.'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {isSubmitting ? (
          <LoadingBtn
            type='submit'
            text='Submitting'
            className='self-end block max-w-fit'
          />
        ) : (
          <Button type='submit' className='capitalize self-end '>
            Submit
          </Button>
        )}
      </form>
    </Form>
  );
}

export default UpdateAddress;
