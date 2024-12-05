"use server";

import { stripe } from "@/lib/stripe";
import { formatAmountForStripe } from "@/lib/stripe-helpers";
import { headers } from "next/headers";
import Stripe from "stripe";

const CURRENCY = "BDT";

function calculateTotalAmount(items, deliveryCharge, serviceCharge) {
  let total = items.reduce((sum, item) => {
    return sum + item.quantity * item.food_item_id.price;
  }, 0);

  if (deliveryCharge) total += deliveryCharge;
  if (serviceCharge) total += serviceCharge;

  return formatAmountForStripe(total, CURRENCY);
}

export async function createCheckoutSession(formData) {
  const ui_mode = "hosted";
  const origin = headers().get("origin");

  const processedItems = formData?.items?.map((item) => {
    return {
      food_item_id: item?.food_item_id?.id,
      quantity: item?.quantity,
      price: item?.food_item_id?.price,
    };
  });

  const lineItems = formData.items.map((item) => {
    return {
      quantity: item.quantity,
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: item.food_item_id.name,
        },
        unit_amount: formatAmountForStripe(item.food_item_id.price, CURRENCY),
      },
    };
  });

  if (formData?.delivery_charge) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: formatAmountForStripe(formData?.delivery_charge, CURRENCY),
      },
    });
  }

  if (formData?.service_charge) {
    lineItems.push({
      quantity: 1,
      price_data: {
        currency: CURRENCY,
        product_data: {
          name: "Service Charge",
        },
        unit_amount: formatAmountForStripe(formData?.service_charge, CURRENCY),
      },
    });
  }

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      submit_type: "auto",
      line_items: lineItems,
      metadata: {
        userId: formData.user_id,
        restaurantId: formData.restaurantId,
        address: formData?.delivery_address,
        addressType: formData?.delivery_address_type,
        items: JSON.stringify(processedItems),
      },
      ...(ui_mode === "hosted" && {
        success_url: `${origin}/order-complete?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/fooditems`,
      }),
      ui_mode,
    });

    return {
      client_secret: checkoutSession.client_secret,
      url: checkoutSession.url,
    };
  } catch (error) {
    throw new Error("Could not create checkout session. Please try again.");
  }
}

export async function createPaymentIntent(data) {
  const totalAmount = calculateTotalAmount(
    data.items,
    data.delivery_charge,
    data.service_charge
  );
  const paymentIntent = await Stripe.paymentIntent.create({
    amount: formatAmountForStripe(totalAmount, CURRENCY),
    automatic_payment_methods: { enabled: true },
    currency: CURRENCY,
    customer: data.user_id,
  });

  return { client_secret: paymentIntent.client_secret };
}
