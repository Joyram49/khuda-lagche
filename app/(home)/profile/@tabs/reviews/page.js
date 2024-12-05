import { auth } from "@/auth";

import { getUserByEmail } from "@/queries/account";
import { getReviewsByUserId } from "@/queries/reviews";
import { redirect } from "next/navigation";
import AllReviews from "./_components/all-reviews";

export const metadata = {
  title: "My Reviews | Khuda-Lagche",
  description: "Reviews Information that a  particular user interacts",
};

async function ReviewPage() {
  const session = await auth();
  if (session?.error === "RefreshAccessTokenError") {
    redirect("/login");
  }

  let loggedInUser = null;
  if (session?.user) {
    loggedInUser = await getUserByEmail(session?.user?.email);
  }

  let reviews = null;
  if (session?.user) {
    reviews = await getReviewsByUserId(loggedInUser?.id);
  }

  return (
    <div className='flex flex-col gap-y-4 font-robotoSlab text-[#414549]'>
      <AllReviews reviews={reviews} />
    </div>
  );
}

export default ReviewPage;
