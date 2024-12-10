import { addOrder } from "@/app/actions/orders";
import { auth } from "@/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { convertUnixTimestampToLocalTime } from "@/lib/converTime";
import { sendEmails } from "@/lib/emails";
import { stripe } from "@/lib/stripe";
import { getUserByEmail } from "@/queries/account";
import { checkIfOrderExists } from "@/queries/orders";
import { getRestaurantById } from "@/queries/restaurants";
import { CircleCheckIcon } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Order Completed | Khuda-Lagche",
  description: "Order Information for particular user",
};

async function OrderCompletePage({ searchParams: { session_id } }) {
  const session = await auth();

  // throw error if session id is not found.
  if (!session_id) throw new Error("Invalid session ID.");

  // redirect to login if logged in use info is not found
  if (!session?.user?.email || session?.error === "RefreshAccessTokenError")
    redirect("/login");

  // get the logged in user info
  const userInfo = await getUserByEmail(session?.user?.email);

  // retrieve checkout session from stripe
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });
  const { userId, restaurantId, address, addressType, items } =
    checkoutSession?.metadata;
  const { status, id: paymentId } = checkoutSession.payment_intent;
  const totalAmount = checkoutSession.amount_total / 100;
  const currency = checkoutSession.currency.toUpperCase();

  const { customer_datails, line_items } = checkoutSession;

  // get restaurant info using restaurant id
  const restaurant = await getRestaurantById(restaurantId);

  const timeInMinute = +restaurant?.delivery_time.split(" ")[0];
  const time = timeInMinute * 60 + checkoutSession?.created;
  const deliveryTime = convertUnixTimestampToLocalTime(time);

  //  display title text based on payment  status
  let titleText;
  switch (status) {
    case "succeeded":
      titleText = "Payment Successful";
      break;
    case "pending":
      titleText = "Payment Pending";
      break;
    case "failed":
      titleText = "Payment Failed";
      break;
    default:
      titleText = "Payment Status Unknown";
      break;
  }

  // check if order is already in the database
  const orderIsInDB = await checkIfOrderExists(paymentId);

  // after successfully completed payment store data in database and get orderId and finally send emails to user, billing user and restaurant
  if (status === "succeeded") {
    let orderId = null;
    const passedItems = JSON.parse(items);
    const orderInfo = {
      user_id: userInfo?.id,
      restaurant_id: restaurantId,
      items: passedItems,
      total_price: totalAmount,
      order_status: "pending",
      billing_address: "",
      delivery_address: addressType + ", " + address,
      payment_method: "stripe",
      paymentId,
    };

    // check if the order is already in database then don't add the order in the database otherwise add order to database
    if (!orderIsInDB?.id) {
      try {
        const response = await addOrder(orderInfo);
        if (response?.status === 201) {
          orderId = `#${response?.data}`;
        }

        // if order has successfully to database then send email to users
        if (orderId) {
          const emailsToSend =
            checkoutSession?.customer_details?.email === userInfo.email
              ? [
                  {
                    to: userInfo?.email,
                    subject:
                      "Order Confirmation - Thank You for Your Purchase!",
                    details: {
                      type: "user",
                      userName: userInfo?.name,
                      orderNumber: orderId,
                      orderItems: checkoutSession?.line_items?.data,
                      totalAmount: totalAmount,
                    },
                  },
                  {
                    to: restaurant?.email,
                    subject: `New Order Notification - Order ${orderId}`,
                    details: {
                      type: "restaurant",
                      restaurantName: restaurant?.name,
                      userName: userInfo?.name,
                      orderNumber: orderId,
                      orderItems: checkoutSession?.line_items?.data,
                      totalAmount: totalAmount,
                      deliveryTime: deliveryTime,
                    },
                  },
                ]
              : [
                  {
                    to: userInfo?.email,
                    subject:
                      "Order Confirmation - Thank You for Your Purchase!",
                    details: {
                      type: "user",
                      userName: userInfo?.name,
                      orderNumber: orderId,
                      orderItems: checkoutSession?.line_items?.data,
                      totalAmount: totalAmount,
                    },
                  },
                  {
                    to: checkoutSession?.customer_details?.email,
                    subject: `Payment Confirmation for Order ${orderId}`,
                    details: {
                      type: "billing",
                      billingName: checkoutSession?.customer_details?.name,
                      orderNumber: orderId,
                      totalAmount: totalAmount,
                    },
                  },
                  {
                    to: restaurant?.email,
                    subject: `New Order Notification - Order ${orderId}`,
                    details: {
                      type: "restaurant",
                      restaurantName: restaurant?.name,
                      userName: userInfo?.name,
                      orderNumber: orderId,
                      orderItems: checkoutSession?.line_items?.data,
                      totalAmount: totalAmount,
                      deliveryTime: deliveryTime,
                    },
                  },
                ];

          const emailResponse = await sendEmails(emailsToSend);
        }
      } catch (error) {
        console.log(error?.message);
      }
    }
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-112px)] bg-backgroundF'>
      <Card className='w-full max-w-lg px-4 py-6 bg-topBackground border-[1px] border-border dark:border-borderF '>
        <CardHeader>
          <CardTitle className='text-center text-2xl font-bold'>
            {titleText}!!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex flex-col items-center gap-4 font-robotoSlab'>
            <CircleCheckIcon className='w-16 h-16 text-green-500 animate-bounce' />
            <p className='text-pText text-center'>
              Thank you for your purchase, <strong>{userInfo?.name}</strong>!
              Your order is being processed and will be delivered shortly. Take
              love from <strong>{restaurant?.name}</strong>
            </p>
          </div>
          <div className='mt-8 font-robotoSlab text-pText'>
            <h2 className='font-semibold text-initial'>Order Details</h2>
            <div className='grid gap-4 mt-4'>
              {checkoutSession?.line_items.data.map((item, index) => (
                <div
                  key={index}
                  className='w-full text-pText flex items-center justify-between  border-[1px] border-border dark:border-borderF p-4 rounded-sm drop-shadow-sm'
                >
                  <div className='flex items-center'>
                    <p>{item.description}</p>
                    <Badge className='ml-2'>x{item.quantity}</Badge>
                  </div>
                  <p className='justify-self-end font-medium text-pText'>
                    {item.price.unit_amount / 100} BDT
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className='mt-6 flex items-center gap-x-2 text-pText font-robotoSlab'>
            <h2 className='font-semibold text-initial'>Total Amount :</h2>
            <p className='text-xl font-bold '>
              {totalAmount} {currency}
            </p>
          </div>
          <div className='mt-2 flex items-center gap-x-2 font-robotoSlab text-pText'>
            <h2 className=' font-semibold text-initial'>Delivered To:</h2>
            <p className='text-base font-medium'>{address}.</p>
            <Badge>{addressType}</Badge>
          </div>
        </CardContent>
        <CardFooter className='flex justify-between mt-6'>
          <Link
            href={
              userInfo?.role === "customer"
                ? "/profile/orders"
                : "/business-profile/orders"
            }
          >
            <Button variant='outline' className='dark:border-borderF'>
              View Order History
            </Button>
          </Link>
          <Link href='/'>
            <Button>Go to Home</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}

export default OrderCompletePage;
