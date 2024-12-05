"server-only";

import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16",

  appInfo: {
    name: "FoodAnyDay",
  },
});

//localhost:3000/order-complete?session_id=cs_test_b1OJVNfN3DVNL1vKHhLSO6e9AI0S65MbB35anrmBLcEL2hPgKy3eW9jYHm&cartId=6719e613512e893b34840795
