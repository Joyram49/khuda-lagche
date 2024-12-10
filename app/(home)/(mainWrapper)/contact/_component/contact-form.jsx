import RippleButton from "@/components/ripple-effect";

function ContactForm() {
  return (
    <form action='' className='min-w-lg flex justify-center items-center'>
      <div className='flex flex-col justify-center items-center gap-y-5'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-10 '>
          <div className='relative  '>
            <input
              id='name'
              type='text'
              placeholder=' '
              className='peer block w-full min-w-[300px] px-3 py-2 border-[1px] border-border dark:border-borderF bg-backgroundF drop-shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-customYellow focus:border-hoverYellow transition-all '
            />
            <label
              htmlFor='name'
              className='font-robotoSlab absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-muted-foreground peer-focus:top-0 peer-focus:text-muted-foreground peer-focus:text-sm peer-focus:font-medium bg-backgroundF px-1'
            >
              Enter your name*
            </label>
          </div>
          <div className='relative  '>
            <input
              id='email'
              type='email'
              placeholder=''
              className='peer block w-full min-w-[300px] px-3 py-2 border-[1px] border-border dark:border-borderF bg-backgroundF drop-shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-customYellow focus:border-hoverYellow transition-all '
            />
            <label
              htmlFor='email'
              className='font-robotoSlab absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-muted-foreground peer-focus:top-0 peer-focus:text-muted-foreground peer-focus:text-sm peer-focus:font-medium bg-backgroundF px-1'
            >
              Your Email*
            </label>
          </div>
        </div>
        <div className='relative w-full '>
          <textarea
            id='email'
            type='text'
            placeholder=''
            className='peer block  w-full min-w-[300px] min-h-56 max-h-96 px-3 py-2 border-[1px] border-border dark:border-borderF bg-backgroundF drop-shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-customYellow focus:border-hoverYellow transition-all '
          />
          <label
            htmlFor='email'
            className='font-robotoSlab absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground duration-300 peer-placeholder-shown:top-5 peer-placeholder-shown:text-muted-foreground peer-focus:top-0 peer-focus:text-muted-foreground peer-focus:text-sm peer-focus:font-medium bg-backgroundF px-1'
          >
            Your Email*
          </label>
        </div>
        <RippleButton
          variant='warning'
          className='self-end text-white capitalize text-lg font-robotoSlab'
          type='button'
        >
          Submit
        </RippleButton>
      </div>
    </form>
  );
}

export default ContactForm;
