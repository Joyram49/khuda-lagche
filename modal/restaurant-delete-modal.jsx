"use client";
import { deleteRestaurantById } from "@/app/actions/restaurants";
import { Button } from "@/components/ui/button";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Image from "next/image";
import { toast } from "sonner";

const urlEndpoint = process.env.NEXT_PUBLIC_URL_ENDPOINT;

function RestaurantDeleteModal({ onClose, restaurantInfo }) {
  const deleteOrder = async (restaurantId) => {
    try {
      const response = await deleteRestaurantById(restaurantId);
      if (response?.status === 200) {
        toast.success(response?.message);
        onClose();
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-auto min-w-sm  h-auto max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-6 bg-background rounded-md overflow-x-hidden flex flex-col justify-center items-center gap-y-6'>
        <div className='flex flex-col space-y-4'>
          <h1 className='font-robotoSlab'>
            Do you want to remove
            <span
              dangerouslySetInnerHTML={{
                __html: ` &quot;<strong>${restaurantInfo?.name}</strong>&quot;`,
              }}
            />{" "}
            from database?
          </h1>
          <div className='flex flex-col items-center'>
            <div className='w-56 h-40 relative overflow-hidden rounded-md hidden md:block'>
              <Image
                fill
                src={urlEndpoint + restaurantInfo?.thumbnail}
                alt={restaurantInfo?.name}
                loader={({ src, width }) =>
                  imageKitLoader({ src, width: 400, quality: 60 })
                }
                className='absolute object-cover  object-center  '
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div>
              <p className='text-pText font-medium text-sm'>
                This restaurant has completed{" "}
                <strong>{restaurantInfo?.orders?.length} </strong> order(s)
              </p>
            </div>
          </div>
          <p className='text-initial font-robotoSlab text-sm'>
            This action will remove the food item permanantly!!.
          </p>
        </div>
        <div className='self-end flex items-center gap-x-2'>
          <Button
            variant='warning'
            className='capitalize  md:text-sm font-medium'
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant='destructive'
            onClick={() => deleteOrder(restaurantInfo?.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default RestaurantDeleteModal;
