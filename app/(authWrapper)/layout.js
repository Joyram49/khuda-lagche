"use client";
import AuthSkeletonLoader from "@/components/loader/auth-loader";
import { MainNav } from "@/components/main-nav";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const navLinks = [
  { title: "home", href: "/" },
  { title: "about", href: "/about" },
  { title: "gallery", href: "/gallery" },
  { title: "foodItems", href: "/foodItems" },
  { title: "contact", href: "/contact" },
];

function AuthLayout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  let pathName = usePathname();
  pathName = pathName
    .split("/")
    .map((path) => path.trim())
    .filter(Boolean)[0];

  if (status === "loading") return <AuthSkeletonLoader />;
  if (session && session?.error !== "RefreshAccessTokenError") {
    router.push("/");
  }

  return (
    <div className='min-h-screen flex flex-col w-auto'>
      <header className='z-40 bg-topBackground-opacity60 backdrop-blur-md fixed top-0 left-0 right-0 border-b-[1px] border-border dark:border-borderF h-auto py-4'>
        <div className='container flex items-center justify-between py-4 '>
          <MainNav items={navLinks} session={session} path={pathName} />
        </div>
      </header>
      <main className='h-auto mt-[102px] py-10 flex flex-col bg-backgroundF'>
        {children}
      </main>
    </div>
  );
}

export default AuthLayout;
