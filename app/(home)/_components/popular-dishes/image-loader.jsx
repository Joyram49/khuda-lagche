"use client";
import { addFoodToCart } from "@/app/actions/cartItems";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import TransparentSpinnerLoader from "@/components/loader/transparent-spinner-loader";
import Portal from "@/components/portal";
import { generateUUID } from "@/lib/generateUUID";
import { imageKitLoader } from "@/lib/imageKitLoader";
import { LinkIcon, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function ImageLoader({ data }) {
  const { cartData, setCartData } = useCartItemCount();
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const hasIndex = cartData.items?.findIndex(
    (item) => item?.food_item_id?.id === data?.id
  );

  useEffect(() => {
    let existingCartId = localStorage.getItem("cartId");
    if (!existingCartId) {
      existingCartId = generateUUID();
      localStorage.setItem("cartId", existingCartId);
    }
    setCartId(existingCartId);
  }, []);

  async function handleAddToCart() {
    setIsLoading(true);
    const cartData = {
      cartId,
      foodItemId: data?.id,
      restaurantId: data?.restaurant?.id,
      quantity: 1,
      type: "plus",
    };
    try {
      const response = await addFoodToCart(cartData);
      if (response.status === 202) {
        toast.success(`${data?.name} is added to the cart`);
        setCartData(response?.cartData);
      }
    } catch (error) {
      toast.error(`failed to add ${data?.name} to the cart`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className='w-full h-44 md:h-56 relative group'>
        <Image
          fill
          src={data?.image_url}
          loader={({ src, width }) =>
            imageKitLoader({ src, width: 400, quality: 60 })
          }
          alt={data?.name}
          className='absolute object-cover  object-center rounded-t-[16px]'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          placeholder='blur'
          blurDataURL={imageKitLoader({
            src: data?.image_url,
            width: 10,
            quality: 60,
            blur: 10,
          })}
        />
        <div className='absolute inset-0 z-10 w-full h-full flex justify-center items-center bg-transparent transition-all duration-300 ease-linear rounded-t-[16px] opacity-0 group-hover:opacity-100 group-hover:bg-slate-800/60'>
          <div className='border-0 group-hover:border-[3px] border-customYellow p-2 rotate-45  hover:bg-customYellow transition-all duration-200 ease-linear cursor-pointer '>
            <Link href={`/foodItems/${data?.id}`}>
              <LinkIcon
                className='text-white font-bold w-0 group-hover:w-full transition-width duration-300 ease-linear'
                size={20}
                strokeWidth={4}
              />
            </Link>
          </div>
          <div
            className={`border-0 group-hover:border-[3px] group-hover:delay-300 border-customYellow p-2 rotate-45  hover:bg-customYellow transition-all duration-200 ease-linear cursor-pointer  ml-4 ${
              hasIndex >= 0 && "bg-customYellow"
            }`}
          >
            <div onClick={handleAddToCart}>
              <ShoppingCart
                className='text-white font-bold transform w-0 group-hover:w-full transition-width duration-300 ease-linear'
                size={20}
                strokeWidth={4}
              />
            </div>
          </div>
        </div>
      </div>
      {isLoading && (
        <Portal>
          <TransparentSpinnerLoader />
        </Portal>
      )}
    </>
  );
}

export default ImageLoader;
