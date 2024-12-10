import { FaUserCircle } from "react-icons/fa";
import LoginForm from "../_components/login-form";
import SocialLogins from "../_components/social-login";

export const metadata = {
  title: "Login | Khuda-Lagche",
  description: "Some description about login page",
};

function LoginPage() {
  return (
    <div className='container  flex justify-center items-center min-h-[calc(100vh-70px)]'>
      <div className='max-w-xl h-auto border-[1px] border-border dark:border-borderF drop-shadow-sm p-4 md:p-10 bg-topBackground rounded-lg'>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col justify-center items-center gap-y-2 mb-5'>
            <FaUserCircle className='fill-initial' size={44} />
            <h1 className='font-robotoSlab capitalize  text-pText text-3xl'>
              Sign In
            </h1>
          </div>
          <LoginForm />
          <SocialLogins />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
