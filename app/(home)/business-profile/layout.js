import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import BusinessProfileSidebar from "./_components/businessProfileSidebar";

async function BusinessProfileLayout({ tabs }) {
  const session = await auth();
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }
  return (
    <section className='w-full pb-16 bg-gray-50'>
      <div className='container  mt-10 '>
        <div className='w-full lg:flex'>
          <BusinessProfileSidebar loggedInUser={loggedInUser} />
          <div className='lg:w-3/4 lg:px-3 mt-[30px] lg:mt-0'>{tabs}</div>
        </div>
      </div>
    </section>
  );
}

export default BusinessProfileLayout;
