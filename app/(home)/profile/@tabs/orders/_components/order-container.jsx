"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import CustomPagination from "@/components/pagination/custom-pagination";
import { useEffect, useMemo, useState } from "react";
import OrderList from "./orders-list";

function OrderContainer({ orders }) {
  const [selectedType, setSelectedType] = useState("all");
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized value of sorted orders based on selectedType
  const memoizedFilteredOrders = useMemo(() => {
    switch (selectedType) {
      case "delivered":
        return orders.filter((order) => order.order_status === "delivered");
      case "pending":
        return orders.filter((order) => order.order_status === "pending");
      case "cancelled":
        return orders.filter((order) => order.order_status === "cancelled");
      default:
        return orders;
    }
  }, [selectedType, orders]);

  useEffect(() => {
    setFilteredOrders(memoizedFilteredOrders);
    setCurrentPage(1); // Reset to page 1 when the filter changes
  }, [memoizedFilteredOrders]);

  // Pagination logic
  const totalItems = filteredOrders.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleItemsPerPage = (value) => {
    const parsedValue = parseInt(value, 10); // Convert to number
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setItemsPerPage(parsedValue); // Only update if it's a valid number
    } else if (value === "") {
      setItemsPerPage(""); // Allow clearing the input
    }
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col gap-y-4 font-robotoSlab text-pText'>
      <div className='flex flex-col-reverse xs:flex-row justify-between items-start xs:items-center gap-y-2  '>
        <h1 className='font-medium text-lg'>
          Your Orders <span className='font-bold'>{totalItems}</span>
        </h1>
        {/* Select dropdown for filtering orders */}
        <Select onValueChange={setSelectedType}>
          <SelectTrigger className='w-[180px] bg-topBackground border-[1px] border-border dark:border-borderF'>
            <SelectValue placeholder='Filter Orders' />
          </SelectTrigger>
          <SelectContent className='bg-topBackground  border-[1px] border-border dark:border-borderF'>
            <SelectGroup>
              <SelectItem value='all' className='focus:bg-backgroundF'>
                All
              </SelectItem>
              <SelectItem value='delivered' className='focus:bg-backgroundF'>
                Delivered
              </SelectItem>
              <SelectItem value='pending' className='focus:bg-backgroundF'>
                Pending
              </SelectItem>
              <SelectItem value='cancelled' className='focus:bg-backgroundF'>
                Cancelled
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <OrderList filteredOrders={paginatedOrders} />
      <CustomPagination
        itemsPerPage={itemsPerPage}
        handleItemsPerPage={handleItemsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default OrderContainer;
