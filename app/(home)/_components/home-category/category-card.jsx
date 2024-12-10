import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { truncateContent } from "@/lib/truncate-content";
import CategoryImageLoader from "./category-image-loader";

function CategoryCard({ data }) {
  return (
    <Card className='max-w-[295px] shadow-lg rounded-[16px] justify-self-center bg-backgroundF border-[1px] border-border dark:border-borderF '>
      <CardContent className='w-full p-0 '>
        <CategoryImageLoader
          imageUrl={data?.imageUrl}
          title={data?.name}
          id={data?.id}
        />
        <CardFooter className='flex flex-col items-center justify-center my-6 '>
          <h1 className='text-2xl font-robotoSlab text-pText '>{data?.name}</h1>
          <CardDescription className='font-robotoSlab text-pText'>
            {truncateContent(data?.description, 15)}
          </CardDescription>
        </CardFooter>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
