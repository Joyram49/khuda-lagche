"use client";
import { addFoodToCart } from "@/app/actions/cartItems";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import RippleButton from "@/components/ripple-effect";
import { generateUUID } from "@/lib/generateUUID";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import TransparentSpinnerLoader from "./loader/transparent-spinner-loader";
import Portal from "./portal";

function OrderFoodFromHome({ data }) {
  const { cartData, setCartData } = useCartItemCount();
  const [cartId, setCartId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      <RippleButton
        type='button'
        variant='warning'
        size='custom'
        className='text-sm capitalize w-32'
        onClick={handleAddToCart}
      >
        Order
      </RippleButton>
      {isLoading && (
        <Portal>
          <TransparentSpinnerLoader />
        </Portal>
      )}
    </>
  );
}

export default OrderFoodFromHome;
