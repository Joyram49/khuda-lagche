import { BsCartXFill } from "react-icons/bs";
function EmptyCart({ small }) {
  return (
    <div className=' h-full flex flex-col justify-center items-center gap-y-4 '>
      <div className='w-24 h-24 bg-topBackground border-[1px] border-border dark:border-borderF rounded-full flex justify-center items-center '>
        <BsCartXFill size={40} className='fill-pText' />
      </div>
      {small ? (
        <div className='flex flex-col justify-center items-center gap-y-2 font-robotoSlab '>
          <h1 className='text-primary font-medium text-xl'>Hungry?</h1>
          <p className='text-center text-initial text-sm'>
            Your cart is currently empty. Please add items from the menu.
          </p>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center gap-y-2 font-robotoSlab '>
          <h1 className='text-primary font-medium text-xl'>Hungry?</h1>
          <p className='text-center text-initial text-sm'>
            Your cart is currently empty. Please add items from the menu.
          </p>
        </div>
      )}
    </div>
  );
}

export default EmptyCart;
