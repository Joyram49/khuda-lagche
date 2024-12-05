"use client";
import { resetToEmptyCart } from "@/app/actions/cartItems";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@/components/ui/dialog";
import { generateUUID } from "@/lib/generateUUID";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import EmptyCart from "./cart-empty";
import CartItems from "./cart-items";

function RestaurantCart({ small, delivery_time }) {
  const { cartData, setCartData } = useCartItemCount();
  const [cartId, setCartId] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const { data } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const params = useParams();

  const isInRestaurantIdPage =
    pathName.startsWith("/restaurants/") && params.restaurant_id;

  // this useEffect for set logged in user details
  useEffect(() => {});

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
  }, [isInRestaurantIdPage]);

  return (
    <div className='w-full h-[calc(100vh-200px)] flex flex-col  justify-between items-center gap-y-6 my-4  relative p-4 lg:p-0'>
      <div className='w-full  md:pr-2'>
        {small ? (
          <DialogTitle className='w-full flex justify-center items-center py-2 rounded-md drop-shadow-sm bg-gradient-to-r from-customYellow to-hoverYellow font-robotoSlab text-background'>
            Delivery ({delivery_time})
          </DialogTitle>
        ) : (
          <div className='w-full flex justify-center items-center py-4 rounded-md drop-shadow-sm bg-gradient-to-r from-customYellow to-hoverYellow font-robotoSlab text-background'>
            Delivery ({delivery_time})
          </div>
        )}
      </div>
      <div className='flex-grow w-full overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200'>
        {cartData?.items && cartData?.items?.length > 0 ? (
          <CartItems
            small={small}
            items={cartData?.items}
            delivery_fee={cartData?.restaurant?.delivery_charge}
          />
        ) : (
          <EmptyCart small={small} />
        )}
      </div>

      {cartData?.items?.length > 0 && (
        <Link href={"/checkout"} className='w-full  md:pr-2'>
          <Button className='w-full flex justify-center items-center py-2 rounded-md drop-shadow-sm bg-gradient-to-r from-customYellow to-hoverYellow font-robotoSlab text-background'>
            Proceed Checkout
          </Button>
        </Link>
      )}
    </div>
  );
}

export default RestaurantCart;
