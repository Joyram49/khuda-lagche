"use client";
import { addFoodReview, addRestaurantReview } from "@/app/actions/reviews";
import CreateRating from "@/components/create-rating";
import Portal from "@/components/portal";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import LoginModal from "@/modal/login-modal";
import { getUserByEmail } from "@/queries/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingBtn from "./loader/loading-btn";

const reviewFormSchema = z.object({
  comment: z
    .string({
      required_error: "rating is required",
    })
    .min(2, {
      message: "review comment must be at least 2 characters",
    }),
  rating: z
    .number({
      required_error: "rating is required",
    })
    .gte(1, { message: "rating must be at least 1 star!!" }),
});

function ReviewForm({ itemId, fromRestaurant = false }) {
  const form = useForm({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const { data } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const onSubmit = async (formData) => {
    const session = await getSession();
    const loggedInUser = await getUserByEmail(session?.user?.email);
    if (!loggedInUser?.email || session?.error === "RefreshAccessTokenError") {
      setIsLoginModalOpen(true);
      return;
    }
    if (fromRestaurant) {
      const reviewData = {
        user_id: loggedInUser?.id,
        restaurant_id: itemId,
        rating: formData.rating,
        comment: formData.comment,
      };
      try {
        const response = await addRestaurantReview(reviewData);
        if (response?.id) {
          form.reset();
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const reviewData = {
        user_id: loggedInUser?.id,
        fooditem_id: itemId,
        rating: formData.rating,
        comment: formData.comment,
      };
      try {
        const response = await addFoodReview(reviewData);
        if (response?.id) {
          form.reset();
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    if (data?.user && isLoginModalOpen) {
      setIsLoginModalOpen(false);
    }
  }, [data, isLoginModalOpen]);

  const { isSubmitting } = form.formState;

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full flex flex-col justify-start gap-y-4 '
        >
          <FormField
            control={form.control}
            name='comment'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder='Write about food here...'
                    className='max-h-[400px] text-pText placeholder:text-initial font-robotoSlab border-[1px] border-border dark:border-borderF bg-topBackground'
                    {...field}
                  />
                </FormControl>
                <FormMessage className='block' />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='rating'
            render={({ field }) => (
              <FormItem className='text-sm sm:text-base text-pText font-robotoSlab flex justify-start items-center gap-x-2'>
                <h1 className='mt-2'>Your Rating : </h1>
                <FormControl>
                  <CreateRating
                    value={field.value}
                    setValue={(value) => form.setValue("rating", value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {isSubmitting ? (
            <LoadingBtn
              type='submit'
              text='Submitting'
              className='self-end  max-w-fit'
            />
          ) : (
            <Button type='submit' className='capitalize self-end '>
              Submit
            </Button>
          )}
        </form>
      </Form>
      {isLoginModalOpen && (
        <Portal>
          <LoginModal onClose={() => setIsLoginModalOpen(false)} />
        </Portal>
      )}
    </>
  );
}

export default ReviewForm;
