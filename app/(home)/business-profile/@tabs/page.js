import { auth } from "@/auth";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserByEmail } from "@/queries/account";
import ChangePassword from "../../profile/@tabs/_components/change-password";
import UpdateAddress from "../../profile/@tabs/_components/update-address";
import UpdateProfile from "../../profile/@tabs/_components/update-profile";
import UserProfile from "../../profile/@tabs/_components/user-profile";

export const metadata = {
  title: "Profile | Khuda-Lagche",
  description: "Profile Information for particular user",
};

async function BusinessProfilePage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  return (
    <Tabs
      defaultValue='user-profile'
      className='w-full bg-backgroundF rounded-sm p-0 sm:p-6 sm:border-[1px] border-border dark:border-borderF'
    >
      <TabsList className='hidden sm:grid w-full grid-cols-4 bg-topBackground border-[1px] border-border dark:border-borderF'>
        <TabsTrigger
          className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
          value='user-profile'
        >
          User Profile
        </TabsTrigger>
        <TabsTrigger
          className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
          value='update-profile'
        >
          Update Profile
        </TabsTrigger>
        <TabsTrigger
          className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
          value='update-address'
        >
          Update Address
        </TabsTrigger>
        <TabsTrigger
          className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
          value='change-password'
        >
          Change Password
        </TabsTrigger>
      </TabsList>
      {/* tab list for smaller screen */}
      <TabsList className='w-full grid sm:hidden bg-topBackground'>
        <Carousel className='w-[280px]'>
          <CarouselContent>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
                value='user-profile'
              >
                User Profile
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
                value='update-profile'
              >
                Update Profile
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
                value='update-address'
              >
                Update Address
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='text-pText bg-topBackground hover:bg-[#fffafa] hover:border-[1px] hover:border-[#fed5c0] data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] dark:data-[state=active]:bg-backgroundF dark:hover:bg-backgroundF dark:hover:border-[1px] dark:border-borderF'
                value='change-password'
              >
                Change Password
              </TabsTrigger>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='left-0 translate-x-0 border-[1px] border-border dark:border-borderF' />
          <CarouselNext className='right-0 translate-x-0 border-[1px] border-border dark:border-borderF' />
        </Carousel>
      </TabsList>
      <TabsContent value='user-profile'>
        <UserProfile user={loggedInUser} />
      </TabsContent>
      <TabsContent value='update-profile'>
        <UpdateProfile user={loggedInUser} />
      </TabsContent>
      <TabsContent value='update-address'>
        <UpdateAddress user={loggedInUser} />
      </TabsContent>
      <TabsContent value='change-password'>
        <ChangePassword email={session?.user?.email} />
      </TabsContent>
    </Tabs>
  );
}

export default BusinessProfilePage;
