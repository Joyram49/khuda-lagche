import { FaUserCircle } from "react-icons/fa";
import RegistrationForm from "../../_components/registration-form-new";
import SocialLogins from "../../_components/social-login";

export async function generateMetadata({ params }) {
  let role = params.role;
  role = role === "customer" ? "Customer" : "vendor" ? "Vendor" : "Admin";

  return {
    title: `${role} - Register`,
    description: "Some description about register page",
  };
}

function RegistrationPage({ params: { role } }) {
  return (
    <div className='container  flex justify-center items-center min-h-[calc(100vh-70px)]'>
      <div className='max-w-xl h-auto border-[1px] border-border dark:border-borderF drop-shadow-sm p-4 md:p-10 bg-topBackground rounded-lg'>
        <div className='flex flex-col justify-center items-center gap-y-5'>
          <div className='flex flex-col justify-center items-center gap-y-2 mb-5'>
            <FaUserCircle className='fill-initial' size={44} />
            <h1 className='font-robotoSlab capitalize  text-muted-foreground text-3xl'>
              Sign Up
            </h1>
          </div>
          <RegistrationForm role={role} />
          <SocialLogins mode='register' role={role} />
        </div>
      </div>
    </div>
  );
}

export default RegistrationPage;
