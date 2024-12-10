"use client";

import { createCheckoutSession } from "@/app/actions/stripe";
import { useCartItemCount } from "@/app/hooks/useCartItemCount";
import LoadingBtn from "@/components/loader/loading-btn";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { scrollToView } from "@/lib/scrollToView";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building, House, Map, MapPin, User2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import OrderSummary from "./order-summary";
import PaymentMethod from "./payment-method";
import UpdateDeliverAddress from "./update-delivery-address";

const orderFormSchema = z.object({
  delivery_address_house: z.string().nonempty(" Address house is required"),
  delivery_address_road: z.string().nonempty(" Address road is required"),
  delivery_address_block: z.string().nonempty(" Address block is required"),
  delivery_address_type: z.enum(["home", "office", "other"]),
  payment_method: z.string().nonempty("Payment method is required"),
});

function CheckoutContainer({ user }) {
  const { cartData } = useCartItemCount();
  const [isDeliveryEdit, setIsDeliveryEdit] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(
    user?.address ? user?.address.split(",").slice(1).join(",") : ""
  );

  const type = user?.address ? user?.address.split(", ")[0] : "home";
  const total_price = useMemo(
    () =>
      cartData?.items?.reduce((total, item) => {
        return (total += item?.food_item_id?.price * item?.quantity);
      }, 0),
    [cartData]
  );

  const IconComponent =
    type === "office"
      ? Building
      : type === "home"
      ? House
      : type === "location"
      ? MapPin
      : Map;

  const form = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      delivery_address_house:
        deliveryAddress !== "" ? deliveryAddress.split(", ")[1] : "",
      delivery_address_road:
        deliveryAddress !== "" ? deliveryAddress.split(", ")[2] : "",
      delivery_address_block:
        deliveryAddress !== "" ? deliveryAddress.split(", ")[3] : "",
      delivery_address_type: type,
      payment_method: "stripe",
    },
  });

  const onSubmit = async (data) => {
    const orderInfo = {
      cart_id: cartData?.id,
      user_id: user?.id,
      restaurantId: cartData?.restaurant?.id,
      items: cartData?.items,
      total_price,
      order_status: "pending",
      billing_address: user?.address ?? "",
      delivery_address_type: data?.delivery_address_type,
      delivery_address: deliveryAddress,
      payment_method: data?.payment_method,
      delivery_charge: cartData?.restaurant?.delivery_charge ?? 0,
    };

    const { url } = await createCheckoutSession(orderInfo);
    window.location.assign(url);
  };

  let error = null;
  if (form.formState.errors) {
    error = form.formState.errors;
  }

  const { isSubmitting } = form.formState;

  console.log(error);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='font-robotoSlab text-pText'
      >
        <div className='container mx-auto px-4 lg:px-10 py-6'>
          {/* Main grid layout */}
          <div className='grid grid-cols-1 lg:grid-cols-12 gap-6'>
            {/* Left Section: Address & Payment */}
            <div className='flex flex-col space-y-6 lg:col-span-8'>
              {/* Personal Details */}
              <div className='bg-topBackground border-[1px] border-border dark:border-borderF rounded-md p-6'>
                <h2 className='text-xl font-medium mb-4'>Personal Details</h2>
                <div className='flex justify-start items-start gap-x-4'>
                  <User2 />
                  <div className='flex flex-col '>
                    <p className='capitalize font-medium'>{user?.name}</p>
                    <p className=''>{user?.email}</p>
                    <p>{user?.phone ?? "N/A"}</p>
                  </div>
                </div>
              </div>
              {/* Delivery Address Section */}
              <div className='bg-topBackground border-[1px] border-border dark:border-borderF  rounded-md p-6'>
                <div className='flex justify-between items-center'>
                  <h2
                    className={`${
                      error?.delivery_address && "text-destructive"
                    } text-xl font-medium mb-4`}
                  >
                    Delivery Address
                  </h2>
                  <div
                    className={`cursor-pointer  px-2 py-1 rounded-md flex justify-center items-center text-sm ${
                      isDeliveryEdit
                        ? "text-destructive  hover:bg-backgroundF"
                        : "text-blue-500 hover:bg-backgroundF"
                    }`}
                    onClick={() => setIsDeliveryEdit((prev) => !prev)}
                  >
                    {!deliveryAddress
                      ? "Add"
                      : isDeliveryEdit
                      ? "Cancel"
                      : "Change"}
                  </div>
                </div>
                {isDeliveryEdit ? (
                  <UpdateDeliverAddress
                    form={form}
                    setIsDeliveryEdit={setIsDeliveryEdit}
                    setDeliveryAddress={setDeliveryAddress}
                  />
                ) : (
                  <div className='flex justify-start items-start gap-x-4'>
                    <IconComponent />
                    <div className='flex flex-col '>
                      <p className='capitalize'>{type}</p>
                      <p className='capitalize'>{deliveryAddress}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Billing Address */}
              <div className='bg-topBackground border-[1px] border-border dark:border-borderF rounded-md p-6'>
                <h2 className='text-xl font-medium mb-4'>Billing Address</h2>
                <div className='flex justify-start items-start gap-x-4'>
                  <IconComponent />
                  <div className='flex flex-col '>
                    <p className='capitalize'>{type}</p>
                    <p className='capitalize'>{user?.address ?? "N/A"}</p>
                  </div>
                </div>
              </div>

              {/* Payment Section */}
              <PaymentMethod form={form} />

              {/* Submit Button */}

              {isSubmitting ? (
                <LoadingBtn
                  className='w-full py-3 text-primary-foreground bg-blue-600 dark:text-primary dark:hover:text-primary-foreground rounded-md font-semibold'
                  type='submit'
                  text='Order Submitting'
                />
              ) : (
                <Button
                  className='w-full py-3 text-primary-foreground bg-blue-600  rounded-md font-semibold dark:text-primary dark:hover:text-primary-foreground'
                  type='submit'
                  disabled={isSubmitting || isDeliveryEdit}
                >
                  Place Order
                </Button>
              )}
            </div>

            {/* Right Section: Order Summary */}
            <OrderSummary />
          </div>
        </div>
        <div className='lg:hidden fixed inset-x-0 bottom-0 shadow-lg bg-topBackground p-4 flex flex-col  z-[999] border-t-[1px] border-border dark:border-borderF'>
          <div className='flex justify-between items-center'>
            <div className='flex flex-col justify-start items-start '>
              <h1 className='font-inter'>
                Total{" "}
                <span className='font-[300] text-[12px]'>
                  (incl. fees and tax)
                </span>
              </h1>
              <Link
                href='#'
                className='hover:underline text-sm hover:bg-backgroundF  rounded-md transition-colors ease-linear duration-100 underline-offset-2 font-medium pb-2'
                onClick={(e) => {
                  e.preventDefault(); // Prevent default link behavior
                  scrollToView("order");
                }}
              >
                See Summary
              </Link>
            </div>
            <p>TK {total_price + cartData?.restaurant?.delivery_charge}</p>
          </div>
          {(error?.delivery_address_road ||
            error?.delivery_address_block ||
            error?.delivery_address_house) && (
            <p className='text-destructive font-robotoSlab font-medium  block lg:hidden'>
              {error?.delivery_address_house?.message ||
                error?.delivery_address_block?.message ||
                error?.delivery_address_road?.message}
            </p>
          )}
          {isSubmitting ? (
            <LoadingBtn
              className='w-full py-3 text-primary-foreground bg-blue-600 dark:text-primary dark:hover:text-primary-foreground rounded-md font-semibold'
              type='submit'
              text='Order Submitting'
            />
          ) : (
            <Button
              className='w-full py-3 text-primary-foreground bg-blue-600  rounded-md font-semibold dark:text-primary dark:hover:text-primary-foreground'
              type='submit'
              disabled={isSubmitting || isDeliveryEdit}
            >
              Place Order
            </Button>
          )}
        </div>
        {error && (
          <p className='text-destructive font-robotoSlab font-medium text-center hidden text-[12px] lg:block'>
            {error?.delivery_address?.message}
          </p>
        )}
      </form>
    </Form>
  );
}

export default CheckoutContainer;
