"use client";

import Portal from "@/components/portal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EmptyDataOnTable from "@/components/empty-data-table";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

import DeleteOrderModal from "@/modal/delete-order-modal";

import EditOrderModal from "@/modal/edit-order-modal";
import ViewOrderModal from "@/modal/view-order-modal";

function FoodOrderTable({ filteredOrders }) {
  const [selectOrder, setSelectOrder] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [viewOrder, setViewOrder] = useState(false);

  const handleModal = (type, order) => {
    setSelectOrder(order);
    switch (type) {
      case "view":
        setViewOrder(true);
        break;
      case "edit":
        setIsEditModalOpen(true);
        break;
      default:
        setIsDeleteModalOpen(true);
    }
  };

  const getDeliveryStatusVariant = (type) => {
    let statusVariant;
    switch (type) {
      case "cancelled":
        return "destructive";
      case "pending":
        return "secondery";
      default:
        return "success";
    }
    return statusVariant;
  };

  return (
    <>
      <Table className={`${filteredOrders.length === 0 && "min-h-[400px]"}`}>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className='hidden lg:table-cell'>RestaurantId</TableHead>
            <TableHead className='text-center hidden sm:table-cell'>
              Status
            </TableHead>
            <TableHead className='hidden 2xl:table-cell'>Date</TableHead>
            <TableHead className='hidden xl:table-cell'>paymentId</TableHead>
            <TableHead className='text-center'>Amount</TableHead>
            <TableHead className='text-right'></TableHead>
          </TableRow>
        </TableHeader>
        {filteredOrders.length > 0 ? (
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id} className='bg-accent'>
                <TableCell>
                  <div className='font-medium'>{order?.user_id?.name}</div>
                  <div className='hidden text-sm text-muted-foreground xs:inline'>
                    {order?.user_id?.email}
                  </div>
                </TableCell>
                <TableCell className='hidden lg:table-cell'>
                  {order?.restaurant_id?.id}
                </TableCell>
                <TableCell className='text-center hidden sm:table-cell'>
                  <Badge
                    className='text-xs'
                    variant={getDeliveryStatusVariant(order?.order_status)}
                  >
                    {order?.order_status}
                  </Badge>
                </TableCell>
                <TableCell className='hidden 2xl:table-cell overflow-auto'>
                  {String(order?.placed_at)}
                </TableCell>
                <TableCell className='hidden xl:table-cell'>
                  {order?.paymentId}
                </TableCell>
                <TableCell className='text-center font-medium'>
                  <p>&#2547; {Math.round(order?.total_price)}</p>
                </TableCell>
                <TableCell className='text-right'>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel className='text-center'>
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        className='cursor-pointer hover:bg-sky-500 hover:text-background'
                        onClick={() => handleModal("view", order)}
                      >
                        View Order
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className='cursor-pointer hover:bg-sky-500 hover:text-background'
                        onClick={() => handleModal("edit", order)}
                      >
                        Edit Order
                      </DropdownMenuItem>
                      {/* here I want to delete order handler */}
                      <DropdownMenuItem
                        className='cursor-pointer hover:bg-red-500 hover:text-background'
                        onClick={() => handleModal("delete", order)}
                      >
                        Delete Order
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <EmptyDataOnTable type='order' />
        )}
      </Table>

      {isDeleteModalOpen && (
        <Portal>
          <DeleteOrderModal
            onClose={() => setIsDeleteModalOpen(false)}
            order={selectOrder}
          />
        </Portal>
      )}

      {isEditModalOpen && (
        <Portal>
          <EditOrderModal
            onClose={() => setIsEditModalOpen(false)}
            order={selectOrder}
          />
        </Portal>
      )}

      {viewOrder && (
        <Portal>
          <ViewOrderModal
            onClose={() => setViewOrder(false)}
            order={selectOrder}
          />
        </Portal>
      )}
    </>
  );
}

export default FoodOrderTable;
