import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import ProfileSidebar from "./_components/profile-sidebar";

async function ProfileLayout({ tabs, params }) {
  const session = await auth();
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }
  return (
    <section className='w-full pb-16  bg-backgroundF'>
      <div className='w-full p-2 xs:container  mt-10 '>
        <div className='w-full lg:flex'>
          <ProfileSidebar loggedInUser={loggedInUser} />
          <div className='lg:w-3/4 lg:px-3 mt-[30px] lg:mt-0'>{tabs}</div>
        </div>
      </div>
    </section>
  );
}

export default ProfileLayout;
