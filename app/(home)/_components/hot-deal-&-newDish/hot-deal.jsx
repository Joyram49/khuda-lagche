import HoverLink from "@/components/hover-link";
import RippleButton from "@/components/ripple-effect";
import { imageKitLoader } from "@/lib/imageKitLoader";
import Counter from "./counter";

function HotDeal() {
  const bgImageUrl = imageKitLoader({
    src: "heroImage/hero-image5.jpg",
    width: 1920,
    quality: 30,
  });
  return (
    <div className='h-auto w-full lg:mx-[10vw] bg-topBackground rounded-[16px] md:rounded-[24px] shadow-slate-800/30 shadow-sm md:shadow-none md:drop-shadow-md overflow-hidden border-[1px] border-border dark:border-borderF'>
      <div
        className={` h-[180px] md:h-[350px] w-full bg-cover bg-no-repeat bg-center relative`}
        style={{
          backgroundImage: `url(${bgImageUrl})`,
        }}
      >
        <div className=' absolute inset-0 bg-slate-800/30 backdrop-blur-sm'></div>
        <div className='absolute inset-0 z-10 '>
          <Counter />
        </div>
      </div>

      {/* hot deal info */}
      <div className='w-full flex flex-col gap-y-4 md:gap-y-6 justify-center items-center my-10'>
        <h2 className='text-muted-foreground font-medium font-robotoSlab text-sm pt-1 sm:pt-2 '>
          Restaurant "Fusion"
        </h2>
        <p className='text-deepInitial font-robotoSlab text-xl lg:text-4xl text-center '>
          Vegetarian Pasta <del>$22.00</del>{" "}
          <span className='text-red-400'>$19.00</span>
        </p>
        <div className='flex flex-col sm:flex-row gap-y-4 justify-center items-center gap-x-4 md:gap-x-10'>
          <HoverLink text='View Info' link='#' />

          <RippleButton
            variant='warning'
            size='custom'
            className='tracking-tight drop-shadow-sm text-shadow-default text-deepBackground '
          >
            Order Deal!
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

export default HotDeal;
