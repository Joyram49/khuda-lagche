"use client";
import RippleButton from "@/components/ripple-effect";
import { Input } from "@/components/ui/input";

function CallToAction() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <section className='h-auto  bg-customYellow'>
      <div className='container'>
        <div className='h-full w-full  flex-col  flex justify-around items-center gap-y-10  py-10 lg:py-20'>
          <h1 className='text-xl sm:text-3xl 2xl:text-4xl   font-robotoSlab capitalize text-accent'>
            Want Coupons or Deep Thoughts About Food? Get Our Weekly Email:
          </h1>
          <form
            className='flex w-full max-w-md items-center space-x-2'
            onSubmit={handleSubmit}
          >
            <Input
              type='email'
              placeholder='Enter Your Email'
              className='font-robotoSlab text-base '
            />

            <RippleButton
              type='submit'
              variant='outline'
              className='uppercase text-lg font-robotoSlab font-medium  hover:text-accent hover:bg-foreground px-6'
            >
              Subscribe
            </RippleButton>
          </form>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
