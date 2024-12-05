"use client";
import { useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

import { addFood } from "@/app/actions/foodItems";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLockBody } from "@/hooks/use-lock-body";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import AddImage from "./add-image";
import SelectCategories from "./select-category";

const foodItemZodSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().optional(),
  restaurant: z.string().optional(),
  delivery_time: z.coerce.number().min(0).max(59).optional(),
  preparation_time: z.coerce.number().min(0).max(59).optional(),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  quantity: z.coerce.number().min(1, "Quantity must be at least 1"),
  category: z.string().nonempty("Category is required"),
  tags: z.string().optional(),
});

function AddFoodItemModal({ onClose, restaurantInfo, categories }) {
  useLockBody();
  const [error, setError] = useState("");
  const [foodImagePath, setFoodImagePath] = useState("");

  const form = useForm({
    resolver: zodResolver(foodItemZodSchema),
    defaultValues: {
      name: "",
      description: "",
      restaurant: restaurantInfo?.id || "",
      delivery_time: 30,
      preparation_time: 15,
      price: "",
      quantity: 1,
      category: "",
      tags: "",
    },
  });

  const onSubmit = async (data) => {
    const requestData = {
      name: data.name,
      description: data.description ?? "",
      restaurant: data.restaurant,
      delivery_time: data.delivery_time
        ? `${data.delivery_time} minutes`
        : "30 minutes",
      preparation_time: data.preparation_time
        ? `${data.preparation_time} minutes`
        : "15 minutes",
      price: Number(data.price),
      quantity: Number(data.quantity) || 0,
      category: data.category,
      tags: data.tags.split(","),
      image_url: foodImagePath || "",
    };
    try {
      const response = await addFood(requestData);
      if (response?.status === 201) {
        toast.success(response?.message);
        form.reset();
        onClose();
      }
    } catch (error) {
      toast.error(error?.message);
      setError(error?.message);
    }
  };

  const foodName = form.watch("name");
  const restaurantName =
    restaurantInfo?.name === "Best Fried Chicken (BFC)"
      ? "bfc"
      : restaurantInfo?.name
          .toLowerCase()
          .split(" ")
          .slice(0, 2)
          .join("-")
          .replace(/['.,]/g, "");

  const { isSubmitting } = form.formState;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='w-full max-w-2xl  h-full max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-10 bg-background rounded-lg flex flex-col justify-start items-center overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200 overflow-x-hidden'>
        <div className='w-full h-auto flex flex-col justify-center items-center'>
          <h1 className='font-robotoSlab capitalize  text-muted-foreground text-xl'>
            Add New Food to the{" "}
            <span
              dangerouslySetInnerHTML={{
                __html: ` &quot;<strong>${restaurantInfo?.name}</strong>&quot;`,
              }}
            />
          </h1>
        </div>
        <div className='w-full h-auto flex flex-col justify-center items-center'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4 bg-gray-200'
            >
              {/* food name field */}
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Enter your food name'
                        type='text'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* food description field */}
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='write something about food..'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549] min-h-[80px] max-h-[180px]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* restaurant id field */}
              <FormField
                control={form.control}
                name='restaurant'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>RestaurantId</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type='text'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* prepared and delivery time field */}
              <div className='w-full  flex flex-col md:flex-row gap-4 md:justify-between'>
                <FormField
                  control={form.control}
                  name='preparation_time'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Prepared In</FormLabel>
                      <FormDescription className='text-initial'>
                        write prepared time in number and maximum is 59
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='e.g. 15 minutes '
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
                  name='delivery_time'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Delivery time</FormLabel>
                      <FormDescription className='text-initial'>
                        write delivery time in number and maximum is 59
                      </FormDescription>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='e.g. 15 minutes '
                          className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/*price and quantity field */}
              <div className='w-full  flex flex-col md:flex-row gap-4 md:justify-between'>
                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          placeholder='enter food price '
                          className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='quantity'
                  render={({ field }) => (
                    <FormItem className='flex-1'>
                      <FormLabel> Quantity</FormLabel>

                      <FormControl>
                        <Input
                          type='number'
                          placeholder='enter food amount here '
                          className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549]'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* category field */}
              <SelectCategories form={form} categories={categories} />

              {/* write tags here */}
              <FormField
                control={form.control}
                name='tags'
                render={({ field }) => (
                  <FormItem className='flex-1'>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='add comma after each tag'
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 placeholder-[#414549]'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* food image field */}
              <AddImage
                foodName={foodName}
                restaurantName={restaurantName}
                foodImagePath={foodImagePath}
                setFoodImagePath={setFoodImagePath}
              />

              <div className='w-full'>
                {isSubmitting ? (
                  <Button type='submit' className='w-full'>
                    <svg
                      aria-hidden='true'
                      role='status'
                      className='inline w-4 h-4 me-3 text-white animate-spin'
                      viewBox='0 0 100 101'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                        fill='#E5E7EB'
                      />
                      <path
                        d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                        fill='currentColor'
                      />
                    </svg>
                    Submitting...
                  </Button>
                ) : (
                  <Button type='submit' className='w-full'>
                    Submit
                  </Button>
                )}
              </div>

              {error && (
                <p className='text-destructive font-robotoSlab font-medium'>
                  {error}
                </p>
              )}
            </form>
          </Form>
        </div>

        <div
          className='absolute top-2 right-2.5 w-8 h-8 rounded-full flex justify-center items-center ring-[1px] ring-slate-900/10 drop-shadow-sm hover:ring-customYellow cursor-pointer group'
          onClick={onClose}
        >
          <X className='text-slate-600 group-hover:text-customYellow' />
        </div>
      </div>
    </div>
  );
}

export default AddFoodItemModal;
