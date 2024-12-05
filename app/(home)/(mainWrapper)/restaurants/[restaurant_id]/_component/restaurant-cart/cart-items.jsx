"use client";
import AddToCart from "@/components/add-to-cart";
import { DialogDescription } from "@/components/ui/dialog";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";

function CartItems({ items, delivery_fee, small }) {
  const subtotal =
    items?.length > 0
      ? items?.reduce((acc, item) => {
          return (acc += item?.food_item_id?.price * item?.quantity);
        }, 0)
      : 0;

  const total = delivery_fee ? subtotal + delivery_fee : 0;
  return (
    <div className='flex flex-col gap-y-2 '>
      <h1 className='text-initial font-medium text-xl font-robotoSlab '>
        Your Items({items?.length})
      </h1>
      <div className='flex flex-col gap-y-2'>
        {items?.map((item) => {
          const organizedForCart = {
            quantity: item?.quantity,
            name: item?.food_item_id?.name,
            foodItemId: item?.food_item_id?.id,
            restaurant: item?.food_item_id?.restaurant,
          };
          return (
            <div
              key={item.id}
              className='flex flex-row   justify-between items-between  border-b-[1px] border-slate-900/10 py-4 mr-2 gap-x-4 font-robotoSlab'
            >
              <div className='w-1/2  aspect-video relative overflow-hidden rounded-md'>
                {item?.food_item_id?.image_url ? (
                  <Image
                    fill
                    src={item?.food_item_id?.image_url}
                    alt={item?.food_item_id?.name}
                    loader={({ src, width }) =>
                      imageKitLoader({ src, width: 400, quality: 60 })
                    }
                    className='absolute object-cover object-center'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                ) : (
                  <Image
                    fill
                    src='/sample-folder/placeholder-1.png'
                    alt={item?.food_item_id?.name}
                    loader={({ src, width }) =>
                      imageKitLoader({ src, width: 400, quality: 60 })
                    }
                    className='absolute object-cover object-center'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                )}
              </div>

              <div className=' flex flex-col gap-y-2 '>
                {small ? (
                  <DialogDescription className='text-sm text-primary '>
                    {item?.quantity} <span className='uppercase'> x </span>{" "}
                    {item?.food_item_id?.name}
                  </DialogDescription>
                ) : (
                  <p className='text-sm text-primary '>
                    {item?.quantity} <span className='uppercase'> x </span>{" "}
                    {item?.food_item_id?.name}
                  </p>
                )}
                <p className='text-initial text-sm block whitespace-nowrap text-end '>
                  Tk. {item?.food_item_id?.price}
                </p>
                <div className='w-full flex justify-end items-center'>
                  <AddToCart data={organizedForCart} fromCart={true} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='flex flex-col gap-y-2 mt-10 mr-2'>
        <h1 className='font-robotoSlab'>Order Summary</h1>
        <div className='flex justify-between items-center border-b-[1px] border-slate-900/10 mb-1 text-[12px] font-robotoSlab'>
          <p>Sub total</p>
          <p>Tk {subtotal.toFixed()}</p>
        </div>
        <div className='flex justify-between items-center border-b-[1px] border-slate-900/10 mb-1 text-[12px] font-robotoSlab'>
          <p>Delivery Fee</p>
          <p>Tk {delivery_fee}</p>
        </div>
        <div className='flex justify-between items-center border-b-[1px] border-slate-900/10 mb-1 text-[12px] font-robotoSlab'>
          <p>Service Charge</p>
          <p>Tk 0</p>
        </div>
        <div className='flex justify-between items-center border-b-[1px] border-slate-900/10 mb-1 text-[12px] font-robotoSlab'>
          <p>Total</p>
          <p>Tk {total.toFixed()}</p>
        </div>
      </div>
    </div>
  );
}

export default CartItems;
