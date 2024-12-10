"use client";

import { addFoodToCart } from "@/app/actions/cartItems";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import { generateUUID } from "@/lib/generateUUID";
import clsx from "clsx";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { toast } from "sonner";
import TransparentSpinnerLoader from "./loader/transparent-spinner-loader";
import Portal from "./portal";
import { Button } from "./ui/button";

function AddToCart({
  data,
  quantity = 1,
  type = "plus",
  className,
  fromCart = false,
}) {
  const { cartData, setCartData } = useCartItemCount();
  const [cartId, setCartId] = useState(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    let existingCartId = localStorage.getItem("cartId");
    if (!existingCartId) {
      existingCartId = generateUUID();
      localStorage.setItem("cartId", existingCartId);
    }
    setCartId(existingCartId);
  }, []);

  async function handleAddToCart(type) {
    const tempCartData = {
      cartId,
      foodItemId: data?.foodItemId,
      restaurantId: data?.restaurant,
      quantity: quantity,
      type,
    };
    try {
      const response = await addFoodToCart(tempCartData);
      if (response.status === 202) {
        if (data?.quantity > 1) {
          if (type === "plus") {
            toast.success(
              `${data?.name} successfully added one item to the cart.`
            );
          } else if (type === "minus") {
            toast.success(
              `${data?.name} successfully sliced one item from the cart.`
            );
          }
        } else if (data.quantity === 0 || data.quantity === 1) {
          if (type === "plus") {
            toast.success(`${data?.name} successfully added to the cart.`);
          } else if (type === "minus") {
            toast.success(`${data?.name} successfully removed from the cart.`);
          }
        } else {
          toast.success(`${data?.name} successfully added to the cart.`);
        }

        return { items: response.cartData };
      }
    } catch (error) {
      toast.error(`${data?.name} failed to add into the cart.`);
    }
  }

  if (isPending) {
    return (
      <Portal>
        <TransparentSpinnerLoader />
      </Portal>
    );
  }

  return fromCart ? (
    <div className=' bg-[#fffafa] dark:bg-topBackground border-[1px] border-[#fed5c0] dark:border-borderF drop-shadow-sm  rounded-sm flex justify-center items-center gap-x-2 overflow-hidden'>
      <div className=' py-1 px-2 cursor-pointer hover:bg-[#e4d8d6] rounded-sm'>
        {data?.quantity > 1 ? (
          <Minus
            size={16}
            className='stroke-rose-400'
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                const data = await handleAddToCart("minus");
                setCartData(data?.items);
              });
            }}
          />
        ) : (
          <Trash2
            size={16}
            className='stroke-rose-400'
            onClick={(e) => {
              e.preventDefault();
              startTransition(async () => {
                const data = await handleAddToCart("minus");
                setCartData(data?.items);
              });
            }}
          />
        )}
      </div>
      <div className='text-initial text-sm font-medium font-robotoSlab'>
        {data?.quantity}
      </div>
      <div className='py-1 px-2 cursor-pointer hover:bg-[#e4d8d6] rounded-sm'>
        <Plus
          size={16}
          className='stroke-rose-400'
          onClick={(e) => {
            e.preventDefault();
            startTransition(async () => {
              const data = await handleAddToCart("plus");
              setCartData(data?.items);
            });
          }}
        />
      </div>
    </div>
  ) : (
    <Button
      variant='warning'
      className={clsx(className)}
      onClick={(e) => {
        e.preventDefault();
        startTransition(async () => {
          const data = await handleAddToCart("plus");
          setCartData(data?.items);
        });
      }}
    >
      <ShoppingCart />
      <span className='ml-2 text-sm capitalize'>Add To Cart</span>
    </Button>
  );
}

export default AddToCart;
