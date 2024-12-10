"use client";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { credentialLogin, doSocialLogin } from "@/app/actions/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";

function LoginModal({ onClose }) {
  const [error, setError] = useState("");
  const router = useRouter();
  const pathName = usePathname();

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
        router.refresh();
      }
    } catch (e) {
      setError(e.message);
    } finally {
      onClose();
    }
  }

  const updateActionWithPathName = doSocialLogin.bind(null, pathName);

  const { isSubmitting } = form.formState;
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-xl  h-auto   md:max-h-[60vh] drop-shadow-sm p-10 bg-backgroundF rounded-lg flex justify-center items-center border-[1px] border-border dark:border-borderF'>
        <div className='w-full flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-y-2 mb-5'>
            <FaUserCircle className='fill-initial' size={44} />
            <h1 className='font-robotoSlab capitalize  text-pText text-3xl'>
              Sign In
            </h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='mt-6 w-full flex flex-col gap-y-6 font-robotoSlab  border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-sm p-4'
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
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-topBackground border-[1px] border-border dark:border-borderF'
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
                        className='focus-visible:ring-2 focus-visible:ring-hoverYellow focus-visible:ring-offset-0 bg-topBackground border-[1px] border-border dark:border-borderF'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
                    Login
                  </Button>
                )}
              </div>

              {error && (
                <p className='text-red-500 text-sm -mt-2 text-center'>
                  {error}
                </p>
              )}
            </form>
          </Form>
          <div className='text-center text-xs text-pText font-robotoSlab mt-4'>
            <p>New Here?</p>
            <div className='flex gap-x-2'>
              <p>Register as </p>{" "}
              <Link
                className='underline font-medium text-primary'
                href='/register/customer'
              >
                Customer
              </Link>
              <span>or</span>
              <Link
                className='underline font-medium text-primary'
                href='/register/vendor'
              >
                Vendor
              </Link>
            </div>
          </div>
          <form
            className='flex gap-4 justify-center items-center'
            action={updateActionWithPathName}
          >
            <Button
              variant='outline'
              className=' w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center'
              type='submit'
              name='action'
              value='facebook'
            >
              <div className='w-6 h-6 relative'>
                <Image
                  fill
                  src='/assets/fb.png'
                  alt='facebook'
                  className='absolute object-cover object-center'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>

              <span>Facebook</span>
            </Button>
            <div className='mt-3 relative mx-2'>
              <div
                className='block absolute h-[2px] w-4 bg-muted-foreground left-0 -translate-x-[100%] top-1/2'
                aria-hidden='true'
              />
              <span className='  px-1 font-medium font-robotoSlab text-muted-foreground '>
                Or
              </span>
              <div
                className='block absolute h-[2px] w-4  bg-muted-foreground right-0 translate-x-[100%] top-1/2'
                aria-hidden='true'
              />
            </div>
            <Button
              variant='outline'
              className=' w-full mt-4 py-2 border-gray-600/30 border rounded-md flex items-center gap-2 justify-center'
              type='submit'
              name='action'
              value='google'
            >
              <div className='w-6 h-6 relative'>
                <Image
                  fill
                  src='/assets/google.png'
                  alt='google'
                  className='absolute object-cover object-center'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                />
              </div>
              <span>Google</span>
            </Button>
          </form>
        </div>
        {error && (
          <p className='text-destructive font-robotoSlab font-medium'>
            {error}
          </p>
        )}
        <div
          className='absolute top-2 right-2.5 w-8 h-8 rounded-full flex justify-center items-center border-[1px] border-border dark:border-borderF drop-shadow-sm hover:ring-customYellow cursor-pointer group'
          onClick={onClose}
        >
          <X className='text-pText group-hover:text-customYellow' />
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
