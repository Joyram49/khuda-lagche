import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import TeamMemberCard from "./team-member-card";

const team = [
  {
    id: 1,
    name: "Richard Veber",
    imageUrl: "person/person-4.jpg",
    description:
      "Driving the financial planning of the company by analyzing its performance and risks.",
    links: [
      { linkId: 1, link: "https://www.facebook.com", icon: FaFacebookF },
      { linkId: 2, link: "https://www.x.com", icon: FaXTwitter },
      { linkId: 3, link: "https://www.instagram.com", icon: FaInstagram },
    ],
  },
  {
    id: 2,
    name: "Mark Priston",
    imageUrl: "person/person-5.jpg",
    description:
      "Developing the marketing strategy for new and existing services.",
    links: [
      { linkId: 1, link: "https://www.facebook.com", icon: FaFacebookF },
      { linkId: 2, link: "https://www.x.com", icon: FaXTwitter },
      { linkId: 3, link: "https://www.instagram.com", icon: FaInstagram },
    ],
  },
  {
    id: 3,
    name: "Lory Grand",
    imageUrl: "person/person-6.jpg",
    description:
      "Responsible for the successful leadership and management of the company.",
    links: [
      { linkId: 1, link: "https://www.facebook.com", icon: FaFacebookF },
      { linkId: 2, link: "https://www.x.com", icon: FaXTwitter },
      { linkId: 3, link: "https://www.instagram.com", icon: FaInstagram },
    ],
  },
];
function TeamMember() {
  return (
    <section className='h-auto bg-backgroundF '>
      <div className='container '>
        <div className=' h-full flex-col  flex justify-around items-center gap-y-10 md:gap-y-20 py-10 md:py-20'>
          {/* popular dishes header */}
          <div className='flex flex-col  items-center text-center'>
            <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
              Our Team
            </h1>
            <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
              The Best of Professionals
            </p>
          </div>

          {/* popular dishes card content */}
          <div className='w-full'>
            <div className='w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-x-10 lg:gap-x-40 gap-y-6 justify-items-center'>
              {team.map((t, index) => (
                <div
                  key={t.id}
                  className={`w-full max-w-[375px] ${
                    index === team.length - 1
                      ? "md:col-span-2 lg:col-span-1 md:self-center"
                      : ""
                  }`}
                >
                  <TeamMemberCard data={t} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TeamMember;
