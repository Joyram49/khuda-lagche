"use client";
import { addNewCategory } from "@/app/actions/category";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import UploadImage from "@/components/upload-image";
import { useLockBody } from "@/hooks/use-lock-body";
import { zodResolver } from "@hookform/resolvers/zod";
import { X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  name: z
    .string({ required_error: "category name is required" })
    .min(2, { message: "category name must be at least 2 characters" }),
  description: z.string().optional(),
  imageUrl: z.any().optional(),
});

function AddCategoryModal({ onClose }) {
  useLockBody();
  const [imagePath, setImagePath] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const form = useForm({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: null,
    },
  });

  const name = form.getValues("name") || "categoryImg";

  const onSubmit = async (data) => {
    const requestedData = {
      name: data?.name,
      description: data?.description,
      imageUrl: imagePath,
    };
    try {
      const response = await addNewCategory(data);
      if (response?.status === 201) {
        toast.success(response?.message);
        onClose();
      }
    } catch (error) {
      setError(error?.message);
      toast.error(error?.message || "failed to add category");
    }
  };

  const { isLoading } = form.formState;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999]'>
      <div className='w-full max-w-xl  h-full   max-h-[calc(100vh-70px)] border-[1px] border-border dark:border-borderF drop-shadow-sm p-10 bg-backgroundF rounded-lg flex justify-center items-center'>
        <div className='w-full flex flex-col gap-y-10'>
          <h1 className='text-center font-robotoSlab text-pText text-3xl'>
            Add New Category
          </h1>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='w-full flex flex-col justify-start gap-y-4 '
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder='write category name'
                        className=' text-pText placeholder:text-initial font-robotoSlab bg-topBackground border-[1px] border-border dark:border-borderF '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='block' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder='Write about category here...'
                        className='max-h-[400px] text-pText placeholder:text-initial font-robotoSlab bg-topBackground border-[1px] border-border dark:border-borderF '
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className='block' />
                  </FormItem>
                )}
              />
              <UploadImage
                folderName='/category'
                setUploading={setUploading}
                name={name}
                setImagePath={setImagePath}
                imagePath={imagePath}
                type='category image'
              />
              <Button variant='warning' type='submit' className='capitalize '>
                {isLoading ? "Submitting" : "Submit"}
              </Button>
            </form>
          </Form>
        </div>
        <div
          className='absolute top-2 right-2.5 w-8 h-8 rounded-full flex justify-center items-center  border-[1px] border-border dark:border-borderF drop-shadow-sm hover:ring-customYellow cursor-pointer group'
          onClick={onClose}
        >
          <X className='text-pText group-hover:text-customYellow' />
        </div>
      </div>
    </div>
  );
}

export default AddCategoryModal;
