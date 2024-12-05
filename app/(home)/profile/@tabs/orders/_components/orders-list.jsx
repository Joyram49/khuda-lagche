"use client";

import EmptyOrder from "@/components/not-found/empty-orders";
import OrderedFoods from "./ordered-foods";

const OrderList = ({ filteredOrders }) => {
  return (
    <div className='w-full flex flex-col gap-y-6 items-start'>
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => (
          <OrderedFoods key={order?.id} order={order} />
        ))
      ) : (
        <div className='self-center'>
          <EmptyOrder
            text='Looks like you haven’t ordered anything yet. Browse food items and get started!'
            status='Order'
          />
        </div>
      )}
    </div>
  );
};

export default OrderList;
