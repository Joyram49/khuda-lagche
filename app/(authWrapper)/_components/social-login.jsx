import { doSocialLogin } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";

function SocialLogins({ mode, role }) {
  const updateActionWithPathName = doSocialLogin.bind(null, "/foodItems");
  return (
    <>
      <div className='text-center text-xs text-muted-foreground font-robotoSlab '>
        {mode === "register" ? (
          <>
            <p>Already have an account?</p>
            <Link className='underline font-medium text-primary' href='/login'>
              Login
            </Link>
          </>
        ) : (
          <>
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
          </>
        )}{" "}
        or Signup with
      </div>
      <form
        className='flex gap-4 justify-center items-center'
        action={updateActionWithPathName}
      >
        <Input type='hidden' name='role' value={role} readOnly />
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
    </>
  );
}

export default SocialLogins;
