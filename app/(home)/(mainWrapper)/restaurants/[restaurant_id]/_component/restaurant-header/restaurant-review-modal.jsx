import StarRating from "@/app/(home)/_components/star-rating";
import ReviewForm from "@/components/review-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useLockBody } from "@/hooks/use-lock-body";
import getFormatedTime from "@/lib/getFormatedTime";
import { Dot, X } from "lucide-react";
function RestaurantReviewModal({ restaurantId, userInfo, reviews, onClose }) {
  useLockBody();
  const handleClose = (e) => {
    e.stopPropagation();
    onClose();
  };
  return (
    <div className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-[999] '>
      <div className='w-full max-w-xl  h-full   max-h-[calc(100vh-70px)] ring-[1px] ring-slate-800/10 drop-shadow-sm p-10 bg-background rounded-lg flex flex-col items-start justify-start gap-y-10 overflow-y-auto scrollbar-thin scrollbar-thumb-customYellow scrollbar-track-gray-200'>
        <h1 className='self-center font-robotoSlab text-2xl font-medium'>
          Restaurant Reviews
        </h1>
        <div className='w-full flex flex-col gap-y-4'>
          <h1 className='text-lg font-medium text-[#414549] font-robotoSlab'>
            Leave a Review
          </h1>
          <div className='flex gap-x-4'>
            <Avatar className='w-12 h-12 rounded-full overflow-hidden border-[1px] border-border drop-shadow-sm flex justify-center items-center'>
              {userInfo?.profilePicture ? (
                <AvatarImage
                  src={`https://ik.imagekit.io/rdjoy${userInfo.profilePicture}`}
                  alt={userInfo?.name}
                />
              ) : (
                <AvatarImage
                  src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${
                    userInfo?.name ?? "guest"
                  }`}
                  alt={userInfo?.name}
                />
              )}

              <AvatarFallback className='w-full h-full flex justify-center items-center font-robotoSlab'>
                {userInfo?.name}
              </AvatarFallback>
            </Avatar>
            <ReviewForm itemId={restaurantId} fromRestaurant={true} />
          </div>
        </div>
        <div className='w-full flex flex-col gap-y-4'>
          <h1 className='text-lg text-[#414549] font-medium font-robotoSlab'>
            Reviews({reviews?.length})
          </h1>

          {reviews?.map((review) => (
            <div key={review?.id} className='flex gap-x-4'>
              <Avatar className='w-12 h-12 rounded-full overflow-hidden border-[1px] border-border drop-shadow-sm flex justify-center items-center p-[6px]'>
                {review?.user?.profilePicture ? (
                  <AvatarImage
                    src={`https://ik.imagekit.io/rdjoy${review.user.profilePicture}`}
                    className='object-cover rounded-full object-center'
                    alt={review?.user?.name}
                  />
                ) : (
                  <AvatarImage
                    src={`https://api.dicebear.com/9.x/adventurer/svg?seed=${
                      review?.user?.name ?? "guest"
                    }`}
                    alt={review?.user?.name}
                  />
                )}
                <AvatarFallback className='w-full h-full flex justify-center items-center font-robotoSlab'>
                  CN
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col justify-start items-start  font-robotoSlab text-[#414549]'>
                <div className='flex justify-start items-center gap-x-2'>
                  <h1 className='textlg'>{review?.user?.name}</h1>
                  <div className='flex items-center text-[12px] text-initial font-inter mt-1'>
                    <Dot />
                    <span className='-translate-x-1'>
                      {getFormatedTime(review?.created_at)}
                    </span>
                  </div>
                </div>
                <p className='text-sm'>{review.comment}</p>
                <StarRating rating={review.rating} fontSize={22} />
              </div>
            </div>
          ))}
        </div>
        <div
          className='absolute top-2 right-2.5 w-8 h-8 rounded-full flex justify-center items-center ring-[1px] ring-slate-900/10 drop-shadow-sm hover:ring-customYellow cursor-pointer group'
          onClick={handleClose}
        >
          <X className='text-slate-600 group-hover:text-customYellow' />
        </div>
      </div>
    </div>
  );
}

export default RestaurantReviewModal;
