import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { truncateContent } from "@/lib/truncate-content";
import Link from "next/link";
import React from "react";
import StarRating from "../star-rating";
import DishCardBtn from "./dash-card-btn";
import ImageLoader from "./image-loader";

function DishCard({ data }) {
  return (
    <Card className='max-w-[295px] shadow-lg rounded-[16px] justify-self-center'>
      <CardContent className='w-full p-0 '>
        <ImageLoader data={data} />
        <div className='flex flex-col items-center justify-center my-6 gap-y-2'>
          <div className='flex flex-wrap justify-center bg-deepBackground text-center px-3 rounded-sm drop-shadow-sm'>
            {data?.tags?.map((tag, index) => (
              <React.Fragment key={index}>
                <span className='text-initial font-robotoSlab uppercase text-[12px] font-medium hover:text-hoverYellow mr-2 transition-colors duration-200 ease-linear cursor-default'>
                  {tag}
                </span>
                {index < data.tags.length - 1 && (
                  <span className='text-initial font-medium -m-[6px] pr-2'>
                    ,
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <Link href={`/foodItems/${data?.id}`}>
            <h1 className='text-xl font-robotoSlab text-foreground text-center hover:text-hoverYellow transition-colors duration-200 ease-linear cursor-pointer'>
              {data?.name}
            </h1>
          </Link>

          <StarRating rating={data?.averageRating} />
          <CardDescription className='font-robotoSlab  text-center '>
            {truncateContent(data?.description, 15)}
          </CardDescription>
        </div>
      </CardContent>
      <CardFooter className='w-full flex justify-center items-center '>
        <DishCardBtn data={data} />
      </CardFooter>
    </Card>
  );
}

export default DishCard;
