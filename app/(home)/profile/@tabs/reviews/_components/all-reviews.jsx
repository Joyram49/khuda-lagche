"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import StarRating from "@/app/(home)/_components/star-rating";
import EmptyOrder from "@/components/not-found/empty-orders";
import CustomPagination from "@/components/pagination/custom-pagination";
import getFormatedTime from "@/lib/getFormatedTime";
import Link from "next/link";
import { useMemo, useState } from "react";
import ReviewImageLoader from "./review-image-loader";

function AllReviews({ reviews }) {
  const [selectedType, setSelectedType] = useState("all");
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized filtered reviews based on selected type
  const filteredReviews = useMemo(() => {
    setCurrentPage(1);
    switch (selectedType) {
      case "restaurant":
        return reviews.filter((review) => review.type === "restaurant");
      case "food":
        return reviews.filter((review) => review.type === "food");
      default:
        return reviews;
    }
  }, [selectedType, reviews]);

  // Paginated reviews
  let paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredReviews.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredReviews, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);

  const handleItemsPerPage = (value) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 0) {
      setItemsPerPage(parsedValue); // Only update if it's a valid number
    } else if (value === "") {
      setItemsPerPage(""); // Allow clearing the input
    }
    setCurrentPage(1);
  };

  return (
    <div className='flex flex-col gap-y-6'>
      {/* Header and Filter */}
      <div className='flex flex-col-reverse xs:flex-row justify-between items-start xs:items-center gap-y-2 '>
        <h1 className='text-lg font-medium'>
          Your Reviews ({filteredReviews.length})
        </h1>
        <Select onValueChange={setSelectedType}>
          <SelectTrigger className='w-[180px] bg-topBackground border-[1px] border-border dark:border-borderF'>
            <SelectValue placeholder='Filter reviews' />
          </SelectTrigger>
          <SelectContent className='bg-topBackground  border-[1px] border-border dark:border-borderF'>
            <SelectGroup>
              <SelectItem value='all' className='focus:bg-backgroundF'>
                All
              </SelectItem>
              <SelectItem value='restaurant' className='focus:bg-backgroundF'>
                Restaurant
              </SelectItem>
              <SelectItem value='food' className='focus:bg-backgroundF'>
                Food
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className='w-full flex flex-col gap-y-4'>
        {paginatedReviews.length === 0 ? (
          <div className='self-center'>
            <EmptyOrder
              text='Looks like you haven’t reviewed any products it. Browse product items and get started!'
              status='Reviews'
            />
          </div>
        ) : (
          paginatedReviews.map((review) => {
            const isRestaurantReview = review.type === "restaurant";
            const item = isRestaurantReview
              ? review.restaurant_id
              : review.fooditem_id;

            return (
              <Link
                href={
                  isRestaurantReview
                    ? `/restaurants/${item?.id}`
                    : `/foods/${item?.id}`
                }
                key={review.id}
                className='w-full bg-white border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-sm p-4 flex flex-col md:flex-row gap-4 hover:bg-[#fffafa] hover:shadow-[0_4px_19px_3px_rgba(0,0,0,0.05)]  hover:border-[#fed5c0] dark:bg-topBackground hover:dark:bg-backgroundF'
              >
                <ReviewImageLoader
                  src={item?.image_url ?? item?.imageUrl}
                  alt={item?.name}
                />
                <div className='flex-1 flex flex-col'>
                  <div className='flex items-center gap-x-2 '>
                    <h1>{item?.name}</h1>
                    <div
                      className={`${
                        review?.type === "food"
                          ? "bg-success"
                          : "bg-customYellow"
                      } max-w-fit max-h-fit px-3 rounded-md `}
                    >
                      <p className='text-white font-robotoSlab font-medium text-sm'>
                        {review?.type}
                      </p>
                    </div>
                  </div>

                  <p className='text-sm mt-2'>
                    Published On:{" "}
                    <span className='px-3 py-1 bg-topBackground border-[1px] border-border dark:border-borderF rounded-full'>
                      {getFormatedTime(review.created_at)}
                    </span>
                  </p>
                  <div className='flex gap-x-2 items-center'>
                    <StarRating rating={review.rating} />
                    <span>{review.rating}</span>
                  </div>
                  <div className='p-2 border-[1px] border-border dark:border-borderF drop-shadow-sm rounded-md text-sm bg-topBackground'>
                    <p>{review.comment}</p>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {paginatedReviews.length > 0 && (
        <CustomPagination
          itemsPerPage={itemsPerPage}
          handleItemsPerPage={handleItemsPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}

export default AllReviews;
