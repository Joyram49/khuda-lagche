import { FaUserGraduate } from "react-icons/fa";
import LoginForm from "../_components/login-form";

export const metadata = {
  title: "Admin Login | Khuda-Lagche",
  description: "Some description about login page",
};

function AdminLoginPage() {
  return (
    <div className='container  flex justify-center items-center min-h-[calc(100vh-70px)]'>
      <div className='w-full max-w-md h-auto ring-[1px] ring-slate-800/10 drop-shadow-sm p-10 bg-background rounded-lg'>
        <div className='w-full flex flex-col justify-center items-center '>
          <div className='flex flex-col justify-center items-center gap-y-2 mb-5'>
            <FaUserGraduate className='fill-initial' size={44} />
            <h1 className='font-robotoSlab capitalize  text-muted-foreground text-3xl'>
              Admin Login
            </h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default AdminLoginPage;
