"use client";

import { credentialLogin } from "@/app/actions/auth";
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
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

function LoginForm() {
  const [error, setError] = useState("");
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data) {
    const { email, password } = data;
    setError("");
    try {
      const response = await credentialLogin(email, password);

      if (!!response.error) {
        setError(response.error);
      } else {
        router.push("/foodItems");
      }
    } catch (e) {
      setError(e.message);
    }
  }

  const { isSubmitting } = form.formState;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='mt-6 w-full  flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-slate-900/10 drop-shadow-sm rounded-sm p-4'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder='Enter your email'
                  type='email'
                  className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder='type password'
                  type='password'
                  className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-backgroundF border-border dark:border-borderF'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className='w-full'>
          {isSubmitting ? (
            <LoadingBtn type='submit' text='Submitting' />
          ) : (
            <Button type='submit' className='w-full'>
              Login
            </Button>
          )}
        </div>

        {error && (
          <p className='text-red-500 text-sm -mt-2 text-center'>{error}</p>
        )}
      </form>
    </Form>
  );
}

export default LoginForm;
