import { cn } from "@/lib/utils";
import { Headset } from "lucide-react";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Logo } from "./logo";

export function SiteFooter({ className }) {
  return (
    <footer className={cn(className)}>
      <div className='container flex flex-col items-center justify-between gap-y-10 py-20 font-robotoSlab text-pText '>
        <div className='flex flex-col xs:flex-row  items-center justify-center gap-y-6 xs:gap-y-0 xs:gap-x-6'>
          <div className='text-sm flex gap-x-4 xs:gap-x-0 justify-center items-center xs:flex-col flex-row-reverse '>
            <p>Narsingdi, Dhaka</p>
            <p>270/A, Madhabdi-1604</p>
          </div>
          <Logo />
          <div className='text-sm flex gap-x-4 xs:gap-x-0 justify-center items-center xs:flex-col'>
            <p>Call us 24/7</p>
            <div className='flex justify-center items-center gap-x-2'>
              <Headset
                className='text-customYellow'
                strokeWidth={2.5}
                size={20}
              />
              <p className='font-medium '>223-334-444</p>
            </div>
          </div>
        </div>
        {/* social icons from here start */}
        <div className='flex justify-center items-center gap-y-10 gap-x-4'>
          <Link
            href='# '
            className={`bg-backgroundF w-12 h-12 rounded-full border-[1px] border-border dark:border-borderF    relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:w-full after:-translate-x-[150%] after:bg-customYellow hover:after:translate-x-0 after:transition-transform after:duration-300 after:ease-linear hover:ring-0 group`}
          >
            <div className='w-full h-full absolute z-10 flex justify-center items-center'>
              <FaXTwitter className=' group-hover:text-white transition-colors duration-500 ease-linear font-medium' />
            </div>
          </Link>
          <Link
            href='# '
            className={`bg-backgroundF w-12 h-12 rounded-full border-[1px] border-border dark:border-borderF    relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:w-full after:-translate-x-[150%] after:bg-customYellow hover:after:translate-x-0 after:transition-transform after:duration-300 after:ease-linear hover:ring-0 group`}
          >
            <div className='w-full h-full absolute z-10 flex justify-center items-center'>
              <FaFacebookF className=' group-hover:text-white transition-colors duration-500 ease-linear font-medium' />
              {/* ring-1 ring-slate-800/30 drop-shadow-sm */}
            </div>
          </Link>
          <Link
            href='# '
            className={`bg-backgroundF w-12 h-12 rounded-full border-[1px] border-border dark:border-borderF   relative overflow-hidden after:content-[''] after:absolute after:inset-0 after:w-full after:-translate-x-[150%] after:bg-customYellow hover:after:translate-x-0 after:transition-transform after:duration-300 after:ease-linear hover:ring-0 group`}
          >
            <div className='w-full h-full absolute z-10 flex justify-center items-center'>
              <FaInstagram className=' group-hover:text-white transition-colors duration-500 ease-linear font-medium' />
            </div>
          </Link>
        </div>
        <p className='text-center text-sm leading-loose md:text-left'>
          Built by{" "}
          <a
            href='#'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            shadcn
          </a>
          . Hosted on{" "}
          <a
            href='https://vercel.com'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            Vercel
          </a>
          . Illustrations by{" "}
          <a
            href='https://popsy.co'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            Popsy
          </a>
          . The source code is available on{" "}
          <a
            href='#'
            target='_blank'
            rel='noreferrer'
            className='font-medium underline underline-offset-4'
          >
            GitHub
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
