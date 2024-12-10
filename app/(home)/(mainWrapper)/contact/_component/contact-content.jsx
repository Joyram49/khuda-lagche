import { imageKitLoader } from "@/lib/imageKitLoader";
import ContactForm from "./contact-form";

function ContactInfo() {
  const bgImageUrl = imageKitLoader({
    src: "heroImage/main_bg.jpg",
    width: 1920,
    quality: 60,
  });
  return (
    <section
      className={`h-auto w-full bg-backgroundF bg-center bg-cover bg-no-repeat`}
    >
      <div className='container w-full'>
        <div className=' h-full flex flex-col justify-around items-center gap-y-10 md:gap-y-20 py-10 md:py-20'>
          {/* contact information */}
          <div className='grid grid-cols-1 md:grid-cols-3 items-center text-center gap-y-10 md:gap-y-0 md:gap-x-10 xl:gap-x-20 '>
            <div
              className={` p-10 bg-topBackground bg-center bg-contain rounded-[16px] flex flex-col items-center gap-y-5 border-[1px] border-border dark:border-borderF `}
            >
              <h1 className='text-xl sm:text-2xl xl:text-4xl   font-robotoSlab uppercase text-foreground '>
                {" "}
                Address
              </h1>
              <p className=' text-customYellow = font-robotoSlab text-sm pt-1 sm:pt-2 '>
                123, Neville Street New York, NY 60606
              </p>
            </div>
            <div
              className={` p-10 bg-topBackground bg-center bg-contain rounded-[16px] flex flex-col items-center gap-y-5 border-[1px] border-border dark:border-borderF `}
            >
              <h1 className='text-xl sm:text-2xl xl:text-4xl   font-robotoSlab uppercase text-foreground '>
                {" "}
                Phone
              </h1>
              <p className=' text-customYellow = font-robotoSlab text-sm pt-1 sm:pt-2 '>
                123-456-7890
              </p>
            </div>
            <div
              className={` p-10 bg-topBackground bg-center bg-contain rounded-[16px] flex flex-col items-center gap-y-5 border-[1px] border-border dark:border-borderF `}
            >
              <h1 className='text-xl sm:text-2xl xl:text-4xl   font-robotoSlab uppercase text-foreground '>
                Email
              </h1>
              <p className=' text-customYellow = font-robotoSlab text-sm pt-1 sm:pt-2 '>
                info@yoursite.com
              </p>
            </div>
          </div>

          {/* connect with me */}
          <div className='flex flex-col justify-around items-center gap-y-10 md:gap-y-20 '>
            <div className='flex flex-col  items-center text-center'>
              <h1 className='text-xl sm:text-3xl xl:text-5xl 3xl:text-6xl  font-robotoSlab uppercase text-foreground '>
                Drop <span className='text-customYellow mr-4'>a</span>
                Line
              </h1>
              <p className=' text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
                Get In Touch
              </p>
            </div>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactInfo;
