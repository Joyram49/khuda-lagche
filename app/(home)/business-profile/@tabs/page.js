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
    <Tabs defaultValue='user-profile' className='w-full bg-white p-6'>
      <TabsList className='hidden sm:grid w-full grid-cols-4'>
        <TabsTrigger
          className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
          value='user-profile'
        >
          User Profile
        </TabsTrigger>
        <TabsTrigger
          className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
          value='update-profile'
        >
          Update Profile
        </TabsTrigger>
        <TabsTrigger
          className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
          value='update-address'
        >
          Update Address
        </TabsTrigger>
        <TabsTrigger
          className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
          value='change-password'
        >
          Change Password
        </TabsTrigger>
      </TabsList>
      {/* tab list for smaller screen */}
      <TabsList className='w-full grid sm:hidden'>
        <Carousel className='w-[300px]'>
          <CarouselContent>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
                value='user-profile'
              >
                User Profile
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
                value='update-profile'
              >
                Update Profile
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
                value='update-address'
              >
                Update Address
              </TabsTrigger>
            </CarouselItem>
            <CarouselItem className='text-center '>
              <TabsTrigger
                className='data-[state=active]:bg-[#fffafa] data-[state=active]:text-hoverYellow data-[state=active]:border-[1px] data-[state=active]:border-[#fed5c0] '
                value='change-password'
              >
                Change Password
              </TabsTrigger>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious className='left-0 translate-x-0' />
          <CarouselNext className='right-0 translate-x-0' />
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
