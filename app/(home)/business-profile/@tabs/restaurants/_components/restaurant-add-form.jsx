"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Textarea } from "@/components/ui/textarea";
import categories from "@/database/local-categories.json";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Zod schema for form validation
const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  opening_time: z.string().nonempty({ message: "Opening time is required" }),
  closing_time: z.string().nonempty({ message: "Closing time is required" }),
  category_ids: z
    .array(z.number())
    .min(1, { message: "Select at least one category" }),
  thumbnail: z.any().optional(),
});

const RestaurantAddForm = () => {
  const form = useForm({
    resolver: zodResolver(restaurantSchema), // Zod validation
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
      opening_time: "",
      closing_time: "",
      category_ids: [],
      thumbnail: null,
    },
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      form.setValue("thumbnail", file);
    }
  };

  const onSubmit = (data) => {
    // For now, we can log the form data
    // console.log(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 font-robotoSlab'
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Restaurant Name' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name='address'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder='Restaurant Address'
                  {...field}
                  className='max-h-[180px]'
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='w-full flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:gap-x-6'>
          {/* Phone Field */}
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder='Phone Number' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Field */}
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email Address' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className='w-full flex flex-col space-y-6 lg:space-y-0 lg:flex-row lg:gap-x-6'>
          {/* Opening Time Field */}
          <FormField
            control={form.control}
            name='opening_time'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Opening Time</FormLabel>
                <FormControl>
                  <Input type='time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Closing Time Field */}
          <FormField
            control={form.control}
            name='closing_time'
            render={({ field }) => (
              <FormItem className='w-full'>
                <FormLabel>Closing Time</FormLabel>
                <FormControl>
                  <Input type='time' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Categories Field */}

        <FormField
          control={form.control}
          name='category_ids'
          render={() => (
            <FormItem>
              <div className='mb-4'>
                <FormLabel className='text-base'>Category</FormLabel>
                <FormDescription>
                  Select the category you want to add your restaurant.
                </FormDescription>
              </div>
              {categories.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name='category_ids'
                  render={({ field }) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            id={`category-${item.id}`}
                            checked={field.value?.includes(item.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, item.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (value) => value !== item.id
                                    )
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel
                          htmlFor={`category-${item.id}`}
                          className='font-normal'
                        >
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Restaurant Image (Thumbnail) */}
        <FormField
          control={form.control}
          name='thumbnail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Restaurant Thumbnail</FormLabel>
              <FormControl>
                <div className='relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden border border-gray-300'>
                  {imagePreview ? (
                    // Show the preview of the uploaded image
                    <Image
                      fill
                      src={imagePreview}
                      alt='Thumbnail Preview'
                      className='absolute object-cover object-center'
                      sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    />
                  ) : (
                    // Placeholder for when no image is uploaded
                    <div className='flex items-center justify-center h-full'>
                      <span className='text-gray-500'>
                        Upload Restaurant Image
                      </span>
                    </div>
                  )}

                  {/* Overlay Upload Button */}
                  <label
                    htmlFor='thumbnail'
                    className='absolute bottom-3 right-3 bg-background text-pText text-sm font-medium py-2 px-4 rounded cursor-pointer flex items-center gap-x-2'
                  >
                    <Camera className='fill-[#414549] stroke-white' />
                    <span className='hidden xs:block'>
                      {imagePreview ? "Change Image" : "Upload Image"}
                    </span>
                  </label>
                  <Input
                    id='thumbnail'
                    type='file'
                    accept='image/*'
                    className='hidden'
                    onChange={(e) => {
                      const file = e.target.files[0];
                      field.onChange(file); // Register file input
                      if (file) {
                        setImagePreview(URL.createObjectURL(file)); // Set preview image
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type='submit'>Submit</Button>
      </form>
    </Form>
  );
};

export default RestaurantAddForm;
