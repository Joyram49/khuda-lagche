"use client";
import AuthSkeletonLoader from "@/components/loader/auth-loader";
import { Logo } from "@/components/logo";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function AuthLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") return <AuthSkeletonLoader />;
  if (session && session?.error !== "RefreshAccessTokenError") {
    router.push("/");
  }

  return (
    <div className='min-h-screen flex flex-col w-auto'>
      <header className='z-40 bg-background/60 backdrop-blur-md fixed top-0 left-0 right-0 border-b h-auto py-4'>
        <div className='container'>
          <Link href='/'>
            <Logo />
          </Link>
        </div>
      </header>
      <main className='h-auto mt-[70px] flex flex-col bg-deepBackground'>
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
