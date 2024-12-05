import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import MemberImageLoader from "./member-image-loader";

function TeamMemberCard({ data }) {
  return (
    <Card className='w-full shadow-lg rounded-[36px] overflow-hidden bg-deepBackground justify-self-center '>
      <CardContent className='p-0'>
        <MemberImageLoader name={data?.name} imageUrl={data?.imageUrl} />
        <div className=' flex flex-col items-center gap-y-4 px-4 py-10'>
          <h1 className='font-medium font-robotoSlab text-primary hover:text-destructive transition-colors duration-200 ease-linear cursor-pointer '>
            {data?.name}
          </h1>
          <p className='font-robotoSlab  text-center text-pretty text-secondary text-sm'>
            {data.description}
          </p>
          <div className='mt-4 flex justify-center space-x-4'>
            {data.links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.linkId}
                  href={link.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={`bg-white w-10 h-10 rounded-full ring-[1px] ring-slate-900/10    relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:w-full after:-translate-x-[150%] after:bg-customYellow hover:after:translate-x-0 after:transition-transform after:duration-300 after:ease-linear hover:ring-0 group`}
                >
                  <div className='w-full h-full absolute z-50 flex justify-center items-center'>
                    <Icon className=' text-muted-foreground group-hover:text-white transition-colors duration-500 ease-linear font-medium' />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default TeamMemberCard;
