"use client";
import { deleteOrderByOrderId } from "@/app/actions/orders";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

function DeleteOrderModal({ onClose, order }) {
  const deleteOrder = async (orderId) => {
    try {
      const response = await deleteOrderByOrderId(orderId);
      if (response?.status === 200) {
        onClose();
        toast.success("Successfully delete the order");
      }
    } catch (error) {
      toast.error(error.message || `Error deleting order`);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='absolute top-2 left-1/2 -translate-x-1/2 w-full max-w-md  h-auto max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-md overflow-x-hidden flex flex-col justify-center items-center gap-y-6'>
        <div className='flex flex-col'>
          <h1 className='font-robotoSlab'>
            Do you want to remove the order with orderId
            <span
              dangerouslySetInnerHTML={{
                __html: ` &quot;<strong>${order?.id}</strong>&quot;`,
              }}
            />{" "}
            from database?
          </h1>
          <p className='text-initial font-robotoSlab text-sm'>
            This action will remove the order permanantly from database!!.
          </p>
        </div>
        <div className='self-end flex items-center gap-x-2 '>
          <Button
            variant='warning'
            className='capitalize  md:text-sm font-medium'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button variant='destructive' onClick={() => deleteOrder(order?.id)}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DeleteOrderModal;
