import { auth } from "@/auth";
import { getUserByEmail } from "@/queries/account";
import { getAllCategory } from "@/queries/category";
import { getAllUserInfo } from "@/queries/users";
import { redirect } from "next/navigation";
import AddNewRestaurant from "./_components/add-new-restaurant";

async function DashboardAddRestaurants() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }
  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  const users = await getAllUserInfo();
  const vendors = users?.allUser?.filter((user) => user.role === "vendor");

  const allCategories = await getAllCategory();
  return (
    <div className='w-full flex flex-col gap-y-20'>
      <div className='xs:border border-slate-800/10 drop-shadow-sm rounded-sm p-4 xs:p-10  bg-gray-200'>
        <div className='w-full'>
          <h1 className='text-center font-robotoSlab  text-3xl'>
            Add New Restaurant
          </h1>
        </div>

        <AddNewRestaurant
          userId={loggedInUser?.id}
          allCategories={allCategories}
          vendors={vendors}
        />
      </div>
    </div>
  );
}

export default DashboardAddRestaurants;
