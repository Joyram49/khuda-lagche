import StarRating from "@/app/(home)/_components/star-rating";

import getFormatedTime from "@/lib/getFormatedTime";
import Link from "next/link";
import ReviewImageLoader from "./review-image-loader";
function ReviewItem({ review }) {
  return (
    <Link
      href={`/foodItems/${review?.fooditem_id?.id}`}
      key={review?.id}
      className='w-full bg-white ring-[1px] ring-slate-900/10 drop-shadow-sm rounded-sm p-4 flex flex-col md:flex-row gap-4 hover:bg-[#fffafa] hover:shadow-[0_4px_19px_3px_rgba(0,0,0,0.05)]  hover:ring-[#fed5c0]'
    >
      <ReviewImageLoader
        src={review?.fooditem_id?.image_url}
        alt={review?.fooditem_id?.name}
      />
      <div className='flex flex-col'>
        <h1>{review?.fooditem_id?.name}</h1>
        <p className='text-sm mt-2 '>
          Published On:{" "}
          <span className='px-3 py-1 bg-deepBackground rounded-full max-w-fit mt-4 xs:mt-0'>
            {getFormatedTime(review?.created_at)}
          </span>
        </p>
        <div className='flex gap-x-2 items-center'>
          <StarRating rating={review?.rating} />
          <span>{review?.rating}</span>
        </div>
        <div className='p-2 border-[1px] border-gray-500/30 drop-shadow-sm rounded-md text-sm bg-deepBackground'>
          <p className='font-inter tracking-tight'>{review?.comment}</p>
        </div>
      </div>
    </Link>
  );
}

export default ReviewItem;
