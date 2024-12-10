"use client";
import { File, ListFilter } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilteredOrdersComponent from "./filtered-orders-component";

import CustomPagination from "@/components/pagination/custom-pagination";
import dayjs from "dayjs";
import { useEffect, useMemo, useState } from "react";

// Function to get date range based on query (assumed to be defined)
const getDateRange = (range) => {
  const now = dayjs();
  switch (range) {
    case "1 week":
      return now.subtract(1, "week");
    case "1 month":
      return now.subtract(1, "month");
    case "1 year":
      return now.subtract(1, "year");
    default:
      return null;
  }
};

function OrderList({ orders }) {
  const [query, setQuery] = useState({ range: "1 year", status: "all" });
  const [filteredOrders, setFilteredOrders] = useState(orders);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const memoizedFilteredOrders = useMemo(() => {
    const rangeDate = getDateRange(query.range);
    return orders.filter((order) => {
      const orderDate = dayjs(order.placed_at);
      const inRange = rangeDate ? orderDate.isAfter(rangeDate) : true;
      const matchesStatus =
        query.status === "all" || order.order_status === query.status;
      return inRange && matchesStatus;
    });
  }, [orders, query]);

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
    <Tabs defaultValue={query.range}>
      <div className='flex items-center'>
        <TabsList>
          <TabsTrigger
            value='1 week'
            onClick={() => setQuery({ ...query, range: "1 week" })}
          >
            Week
          </TabsTrigger>
          <TabsTrigger
            value='1 month'
            onClick={() => setQuery({ ...query, range: "1 month" })}
          >
            Month
          </TabsTrigger>
          <TabsTrigger
            value='1 year'
            onClick={() => setQuery({ ...query, range: "1 year" })}
          >
            Year
          </TabsTrigger>
        </TabsList>
        <div className='ml-auto flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
                <ListFilter className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only'>Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={query.status === "delivered"}
                onClick={() => setQuery({ ...query, status: "delivered" })}
              >
                Fulfilled
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={query.status === "cancelled"}
                onClick={() => setQuery({ ...query, status: "cancelled" })}
              >
                Declined
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={query.status === "pending"}
                onClick={() => setQuery({ ...query, status: "pending" })}
              >
                Pending
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={query.status === "all"}
                onClick={() => setQuery({ ...query, status: "all" })}
              >
                All
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size='sm' variant='outline' className='h-7 gap-1 text-sm'>
            <File className='h-3.5 w-3.5' />
            <span className='sr-only sm:not-sr-only'>Export</span>
          </Button>
        </div>
      </div>
      <TabsContent value={query.range}>
        <Card x-chunk='dashboard-05-chunk-3'>
          <CardHeader className='px-7'>
            <CardTitle>Orders</CardTitle>
            <CardDescription>
              Showing{" "}
              <span className='font-medium text-pText capitalize'>
                {query.status}
              </span>{" "}
              <span className='font-medium text-pText'>
                {filteredOrders?.length}
              </span>{" "}
              order(s) in last{" "}
              <span className='font-medium text-pText'>{query.range}</span> from
              your app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FilteredOrdersComponent filteredOrders={paginatedOrders} />
            <CustomPagination
              itemsPerPage={itemsPerPage}
              handleItemsPerPage={handleItemsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

export default OrderList;
