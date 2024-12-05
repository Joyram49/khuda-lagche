"use client";

import { resetToEmptyCart } from "@/app/actions/cartItems";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import { generateUUID } from "@/lib/generateUUID";
import { ShoppingCart } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function CartButton() {
  const { cartData, setCartData } = useCartItemCount();
  const [cartId, setCartId] = useState(null);
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();

  const isInRestaurantIdPage =
    pathName.startsWith("/restaurants/") && params.restaurant_id;
  // this useEffect for set cart data details
  useEffect(() => {
    let ignore = false;
    let existingCartId = localStorage.getItem("cartId");
    if (!existingCartId) {
      existingCartId = generateUUID();
      localStorage.setItem("cartId", existingCartId);
    }
    setCartId(existingCartId);

    async function cartDataFetch() {
      const res = await fetch(`/api/cart/${existingCartId}`, {
        next: { revalidate: 0 },
      });
      const data = await res.json();
      if (!ignore) {
        setCartData(data);
        if (isInRestaurantIdPage) {
          const currentRestaurantId = params.restaurant_id;

          if (
            data?.restaurant &&
            currentRestaurantId !== data?.restaurant?.id
          ) {
            await resetToEmptyCart(existingCartId);
            setCartData({ items: [] });
          }
        }
      }
    }
    cartDataFetch();
    return () => {
      ignore = true;
    };
  }, [isInRestaurantIdPage, params.restaurant_id, setCartData]);

  const cartBtnClick = () => {
    if (
      cartData &&
      cartData?.items?.length > 0 &&
      cartData?.restaurant &&
      !isInRestaurantIdPage
    ) {
      const restaurantId = cartData?.restaurant?.id;
      router.push(`/restaurants/${restaurantId}`);
    } else {
      return null;
    }
  };

  return (
    <div
      className='text-deepText text-sm relative cursor-pointer'
      onClick={() => cartBtnClick()}
    >
      <ShoppingCart className='text-primary/60' size={24} />
      <div className='absolute w-5 h-5 bg-customYellow rounded-full top-[-40%] right-[-50%] flex justify-center items-center'>
        <p className='text-white text-[12px] font-medium'>
          {cartData?.items?.length ?? 0}
        </p>
      </div>
    </div>
  );
}

export default CartButton;
