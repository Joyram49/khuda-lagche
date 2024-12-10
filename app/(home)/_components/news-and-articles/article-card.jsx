import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { truncateContent } from "@/lib/truncate-content";
import ArticleImageLoader from "./article-image-loader";

function ArticleCard({ data }) {
  return (
    <Card className='max-w-[375px] shadow-lg rounded-[16px] bg-backgroundF border-[1px] dark:border-borderF'>
      <CardContent className='p-0 '>
        <ArticleImageLoader data={data} />
        <div className='flex flex-col items-center justify-center my-6 gap-y-2 px-4 md:px-10'>
          <div className='flex items-center gap-x-4'>
            <p className='text-destructive text-sm font-robotoSlab uppercase font-medium'>
              {data.publishedOn}
            </p>
            <div className='w-[2px] h-4 bg-initial' />
            <p className='text-initial uppercase text-sm font-medium font-robotoSlab'>
              By {data.author}
            </p>
          </div>
          <h1 className='text-xl font-robotoSlab text-foreground text-center hover:text-hoverYellow transition-colors duration-200 ease-linear cursor-pointer'>
            {data?.title}
          </h1>
          <CardDescription className='font-robotoSlab  text-center text-pretty  text-pText'>
            {truncateContent(data.content, 15)}
          </CardDescription>
        </div>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;
