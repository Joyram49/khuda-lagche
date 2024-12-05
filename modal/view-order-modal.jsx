"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Copy, CreditCard, MoreVertical, Truck, X } from "lucide-react";

function ViewOrderModal({ order, onClose }) {
  const placedAt = format(
    new Date(order?.placed_at),
    "eeee, MMMM do, yyyy, hh:mm a"
  );
  const updatedAt = format(
    new Date(order?.updated_at),
    "eeee, MMMM do, yyyy, hh:mm a"
  );
  const subtotal = order?.items?.reduce(
    (total, item) => (total += item.price * item.quantity),
    0
  );

  const billingAddress = order?.billingAddress
    ? order?.billing_address.split(",")
    : order?.delivery_address.split(",");
  const shippingAddress = order?.delivery_address.split(",");

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='w-full max-w-2xl  h-full min-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-10 bg-background rounded-lg flex flex-col justify-start items-center '>
        <Card
          className='overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200 overflow-x-hidden'
          x-chunk='dashboard-05-chunk-4'
        >
          <CardHeader className='flex flex-row items-start bg-muted/50'>
            <div className='grid gap-0.5'>
              <CardTitle className='group flex items-center gap-2 text-lg'>
                Order {order?.id}
                <Button
                  size='icon'
                  variant='outline'
                  className='h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                >
                  <Copy className='h-3 w-3' />
                  <span className='sr-only'>Copy Order ID</span>
                </Button>
              </CardTitle>
              <CardDescription>Date : {placedAt}</CardDescription>
            </div>
            <div className='ml-auto flex items-center gap-1'>
              <Button size='sm' variant='outline' className='h-8 gap-1'>
                <Truck className='h-3.5 w-3.5' />
                <span className='lg:sr-only xl:not-sr-only xl:whitespace-nowrap'>
                  Track Order
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size='icon' variant='outline' className='h-8 w-8'>
                    <MoreVertical className='h-3.5 w-3.5' />
                    <span className='sr-only'>More</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Export</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Trash</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent className='p-6 text-sm'>
            <div className='grid gap-3'>
              <div className='font-semibold text-xl'>Order Details</div>
              <h1 className='font-medium text-{#414549]'>
                {order?.restaurant_id?.name}
              </h1>
              <ul className='grid gap-3'>
                {order?.items?.map((item) => (
                  <li
                    key={item?.food_item_id?.id}
                    className='flex items-center justify-between'
                  >
                    <span className='text-muted-foreground'>
                      {item?.food_item_id?.name} x <span>{item?.quantity}</span>
                    </span>

                    <span>
                      &#2547; {Math.round(item?.quantity * item?.price)}
                    </span>
                  </li>
                ))}
              </ul>
              <Separator className='my-2' />
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Subtotal</span>
                  <span>&#2547; {Math.round(subtotal)}</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Shipping</span>
                  <span>&#2547; {order?.restaurant_id?.delivery_charge}</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span className='text-muted-foreground'>Tax</span>
                  <span> &#2547; {order?.service_charge ?? 0}</span>
                </li>
                <li className='flex items-center justify-between font-semibold'>
                  <span className='text-muted-foreground'>Total</span>
                  <span>
                    &#2547; {subtotal + order?.restaurant_id?.delivery_charge}
                  </span>
                </li>
              </ul>
            </div>
            <Separator className='my-4' />
            <div className='grid grid-cols-2 gap-4'>
              <div className='grid gap-3'>
                <div className='font-semibold'>Shipping Information</div>
                <address className='grid gap-0.5 not-italic text-muted-foreground'>
                  {shippingAddress.map((address, index) => (
                    <span key={index + address}>{address}</span>
                  ))}
                </address>
              </div>
              <div className='grid auto-rows-max gap-3'>
                <div className='font-semibold'>Billing Information</div>
                <address className='grid gap-0.5 not-italic text-muted-foreground'>
                  {billingAddress.map((address, index) => (
                    <span key={index + address}>{address}</span>
                  ))}
                </address>
              </div>
            </div>
            <Separator className='my-4' />
            <div className='grid gap-3'>
              <div className='font-semibold'>Customer Information</div>
              <dl className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Customer</dt>
                  <dd>{order?.user_id?.name}</dd>
                </div>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Email</dt>
                  <dd>
                    <a href='mailto:'>{order?.user_id?.email}</a>
                  </dd>
                </div>
                <div className='flex items-center justify-between'>
                  <dt className='text-muted-foreground'>Phone</dt>
                  <dd>
                    <a href='tel:'>{order?.user_id?.phone}</a>
                  </dd>
                </div>
              </dl>
            </div>
            <Separator className='my-4' />
            <div className='grid gap-3'>
              <div className='font-semibold'>Payment Information</div>
              <dl className='grid gap-3'>
                <div className='flex items-center justify-between'>
                  <dt className='flex items-center gap-1 text-muted-foreground'>
                    <CreditCard className='h-4 w-4' />
                    {order?.payment_method}
                  </dt>
                  <dd>{order?.paymentId}</dd>
                </div>
              </dl>
            </div>
          </CardContent>
          <CardFooter className='flex flex-row items-center border-t bg-muted/50 px-6 py-3'>
            <div className='text-xs text-muted-foreground'>
              Updated <time dateTime='2023-11-23'>{updatedAt}</time>
            </div>
          </CardFooter>
        </Card>
        <div
          className='absolute top-2 right-2.5 w-8 h-8 rounded-full flex justify-center items-center ring-[1px] ring-slate-900/10 drop-shadow-sm hover:ring-customYellow cursor-pointer group'
          onClick={onClose}
        >
          <X className='text-slate-600 group-hover:text-customYellow' />
        </div>
      </div>
    </div>
  );
}

export default ViewOrderModal;
