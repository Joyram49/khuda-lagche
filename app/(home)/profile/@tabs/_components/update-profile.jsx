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
import UploadImage from "@/components/upload-image";
import { getSession } from "next-auth/react";
import { useState } from "react";
import { toast } from "sonner";

const FormSchema = z.object({
  firstName: z.string({ required_error: "first name is required" }).min(2, {
    message: "first name must be at least 2 characters.",
  }),
  lastName: z.string().optional(),
  phone: z
    .string({ required_error: "Phone number is required" })
    .nonempty("Phone number is required")
    .regex(/^\d+$/, "Phone number must be digits only"),
  email: z
    .string({ required_error: "Email is required" })
    .nonempty("Email is required"),
  avatar: z
    .any()
    .optional()
    .refine((file) => !file || (file instanceof FileList && file.length > 0), {
      message: "Invalid file or no file selected.",
    }),
});

function UpdateProfile({ user }) {
  const [imagePath, setImagePath] = useState(null);
  const [uploading, setUploading] = useState(false);

  const firstName =
    user?.name.split(" ").length > 3
      ? user?.name.split(" ").pop().join("")
      : user?.name.split(" ")[0];
  const lastName = user?.name.split(" ").at(-1);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: firstName ?? "",
      lastName: lastName ?? "",
      phone: user?.phone ?? "",
      email: user?.email ?? "",
    },
  });

  async function onSubmit(data) {
    const name = data.firstName + " " + data.lastName;
    const formData = {
      name,
      email: data.email,
      phone: data.phone,
      profilePicture: imagePath,
    };
    try {
      const response = await updatePrfileInfo(formData);
      if (response?.id) {
        await getSession();
        toast.success("user profile updated");
        form.reset();
        setImagePath(null);
      }
    } catch (error) {
      toast.error("failed to update profile");
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-sm p-4'
      >
        <div className=' grid sm:grid-cols-2 gap-6'>
          <FormField
            control={form.control}
            name='firstName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  First Name <span className='text-red-500'>*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter first name'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='lastName'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter last name'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Mobile No. <span className='text-red-500'>*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder='Enter mobile no.'
                    className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-[1px] border-border dark:border-borderF'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Email <span className='text-red-500'>*</span>{" "}
                </FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type='email'
                    {...field}
                    className='bg-topBackground border-[1px] border-border dark:border-borderF'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <UploadImage
          folderName='/person'
          setUploading={setUploading}
          name={name}
          setImagePath={setImagePath}
          imagePath={imagePath}
          type='Avatar'
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
  );
}

export default UpdateProfile;
