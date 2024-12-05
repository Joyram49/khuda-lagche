"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { updatePassword } from "@/app/actions/account";
import LoadingBtn from "@/components/loader/loading-btn";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signOut } from "next-auth/react";

const PasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
    newPassword: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter.",
      })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter.",
      })
      .regex(/\d/, { message: "Password must contain at least one number." })
      .regex(/[@$!%*?&]/, {
        message: "Password must contain at least one special character.",
      }),

    confirmPassword: z
      .string()
      .min(1, { message: "Confirm password is required." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

function ChangePassword({ email }) {
  const [generalError, setGeneralError] = useState("");
  const form = useForm({
    resolver: zodResolver(PasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data) => {
    const passwords = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    try {
      const response = await updatePassword(email, passwords);
      if (response?.success) {
        form.reset();
        signOut();
      }
    } catch (error) {
      setGeneralError(error?.message);
    }
  };

  const { isSubmitting } = form.formState;

  return (
    <Card className='font-robotoSlab'>
      <CardHeader className='text-center'>
        <CardTitle>Change Password</CardTitle>
        <CardDescription>
          Change your password here. After saving, you'll be logged out.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4'
          >
            <FormField
              control={form.control}
              name='oldPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Old Password <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type='password'
                      placeholder='Enter old password'
                      className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage>{generalError}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password <span className='text-red-500'>*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter new password'
                      type='password'
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
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm New Password <span className='text-red-500'>*</span>{" "}
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter again new password '
                      type='password'
                      className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0'
                      {...field}
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
                className='self-end block max-w-fit'
              />
            ) : (
              <Button type='submit' className='capitalize self-end '>
                Submit
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

export default ChangePassword;
