"use client";
import { updateRestaurantById } from "@/app/actions/restaurants";
import Portal from "@/components/portal";
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
import AddCategoryModal from "@/modal/add-category-modal";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { default as AddNewCategoryBtn } from "./add-new-category";
import UpdateImages from "./update-images";

// Zod schema for form validation
const restaurantSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters long" }),
  phone: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  opening_time: z.string().nonempty({ message: "Opening time is required" }),
  closing_time: z.string().nonempty({ message: "Closing time is required" }),
  delivery_time: z.coerce.number().min(0).max(59),
  delivery_charge: z.coerce.number().min(0, "Price must be a positive number"),
  category_ids: z
    .array(z.string())
    .min(1, { message: "You have to select at least one item." }),
  thumbnail: z
    .string()
    .nonempty({ message: "restaurant thumbnail is required" }),
  imageUrl: z.string().optional(),
});

const RestaurantEditForm = ({ data, allCategories, foodItems, userId }) => {
  const {
    id: restaurantId,
    name,
    address,
    phone,
    email,
    opening_time,
    closing_time,
    categories,
    thumbnail,
    imageUrl,
    delivery_time,
    delivery_charge,
  } = data || {};

  const deliveryTime = delivery_time.split(" ")[0];

  const form = useForm({
    resolver: zodResolver(restaurantSchema), // Zod validation
    defaultValues: {
      name: name ?? "",
      address: address ?? "",
      phone: phone ?? "",
      email: email ?? "",
      opening_time: opening_time ?? "",
      closing_time: closing_time ?? "",
      delivery_time: Number(deliveryTime) ?? "",
      delivery_charge: Number(delivery_charge) ?? 0,
      category_ids: categories ? categories.map((cat) => cat.id) : [],
      thumbnail: thumbnail ?? null,
      imageUrl: imageUrl ?? null,
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantImagePath, setRestaurantImagePath] = useState(null);
  const [thumbnailPath, setThumbnailPath] = useState(null);
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (data) => {
    const requestData = {
      ...data,
      delivery_time: data.delivery_time
        ? `${data.delivery_time} minutes`
        : "15 minutes",
      delivery_charge: parseInt(data.delivery_charge),
      owner: userId,
    };

    try {
      const response = await updateRestaurantById({
        restaurantId,
        requestData,
      });
      if (response?.status === 200) {
        router.refresh();
      }
    } catch (error) {
      setError(error?.message);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 font-robotoSlab '
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

          {/* phone and email field */}
          <div className='w-full flex flex-col space-y-6 lg:space-y-0 sm:flex-row sm:gap-x-6 sm:items-center sm:space-y-0'>
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

          {/* opening and closing time field */}
          <div className='w-full flex flex-col space-y-6 lg:space-y-0 sm:flex-row sm:gap-x-6 sm:items-center sm:space-y-0'>
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

          {/* delivery time and charge */}
          <div className='w-full flex flex-col space-y-6 lg:space-y-0 sm:flex-row sm:gap-x-6 sm:items-center sm:space-y-0'>
            {/* delivery Time Field */}
            <FormField
              control={form.control}
              name='delivery_time'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Delivery Time</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='enter delivery time'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* delivery charge Field */}
            <FormField
              control={form.control}
              name='delivery_charge'
              render={({ field }) => (
                <FormItem className='w-full'>
                  <FormLabel>Delivery Charge</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='enter delivery charge'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* cateory field */}
          <FormField
            control={form.control}
            name='category_ids'
            render={({ field }) => (
              <FormItem>
                <div className='mb-4'>
                  <FormLabel className='text-base'>Sidebar</FormLabel>
                  <FormDescription>
                    Select the items you want to add as your restaurant
                    category.
                  </FormDescription>
                </div>
                <div className='w-full h-aut grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2'>
                  {allCategories.map((item) => {
                    return (
                      <FormItem
                        key={item.id}
                        className='flex flex-row items-start space-x-3 space-y-0'
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value.includes(item.id)}
                            onCheckedChange={(checked) => {
                              // Update the outer field's value directly
                              const updatedCategories = checked
                                ? [...field.value, item.id] // Add category
                                : field.value.filter((cat) => cat !== item.id); // Remove category

                              field.onChange(updatedCategories); // Sync outer field value
                            }}
                          />
                        </FormControl>
                        <FormLabel className='font-normal capitalize'>
                          {item.name}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <AddNewCategoryBtn setIsModalOpen={setIsModalOpen} />

          {/* Restaurant Image (Thumbnail and image) */}
          <UpdateImages
            name={name}
            setRestaurantImagePath={setRestaurantImagePath}
            restaurantImagePath={restaurantImagePath}
            setThumbnailPath={setThumbnailPath}
            thumbnailPath={thumbnailPath}
            data={data}
          />

          {/* Submit Button */}
          <div className='w-full max-w-40 '>
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
      {isModalOpen && (
        <Portal>
          <AddCategoryModal onClose={() => setIsModalOpen(false)} />
        </Portal>
      )}
    </>
  );
};

export default RestaurantEditForm;
