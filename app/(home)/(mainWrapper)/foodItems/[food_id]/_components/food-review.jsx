import StarRating from "@/app/(home)/_components/star-rating";
import ReviewForm from "@/components/review-form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getFormatedTime from "@/lib/getFormatedTime";
import { getFoodById } from "@/queries/foodItems";
import { Dot } from "lucide-react";

async function FoodReview({ foodId, userInfo }) {
  const data = await getFoodById(foodId);
  return (
    <div className='w-full flex flex-col items-start justify-start gap-y-10'>
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
          <ReviewForm itemId={data?.id} />
        </div>
      </div>
      {/* reviews */}
      <div className=' flex flex-col gap-y-4'>
        <h1 className='text-lg text-[#414549] font-medium font-robotoSlab'>
          Reviews({data?.reviews?.length})
        </h1>

        {data?.reviews?.map((review) => (
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
    </div>
  );
}

export default FoodReview;
