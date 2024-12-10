"use client";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { useEffect, useState } from "react";

export default function AccessDenied() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const role = searchParams.get("role");

    if (role === "customer") {
      setMessage("Customers don't have access to this page.");
    } else if (role === "vendor") {
      setMessage("Vendors are restricted from accessing this area.");
    } else if (role === "admin") {
      setMessage("Admins cannot access this page.");
    } else {
      setMessage("You don't have permission to view this page.");
    }
  }, [searchParams]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-backgroundF p-4'>
      <div className='bg-topBackground p-8 rounded-lg shadow-lg max-w-md w-full text-center border-[1px] border-border dark:border-borderF'>
        <AlertCircle className='w-16 h-16 text-red-500 animate-pulse mx-auto' />
        <h1 className='text-2xl font-semibold mt-4 text-pText'>
          Access Denied
        </h1>
        <p className='text-muted-foreground mt-2'>{message}</p>
        <Link
          href='/'
          className='inline-flex items-center px-4 py-2 mt-4 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600'
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
}
