import { ArrowBigDown } from "lucide-react";
function OrderSteps({ Icon, step, text }) {
  return (
    <div
      className={`flex flex-col gap-y-6 justify-center items-center relative ${
        step === "3" ? "md:order-4 lg:order-none" : ""
      } ${step !== "4" && step !== "2" ? "md:custom-even-line" : ""} ${
        step === "2" ? "lg:custom-odd-line" : ""
      } `}
    >
      <Icon size={100} strokeWidth={0.5} stroke='#555' />

      <div className='bg-customYellow w-10 h-10 rounded-full flex justify-center items-center'>
        <h1 className='text-white text-xl font-robotoSlab font-semibold'>
          {step}
        </h1>
      </div>
      <h1 className='text-foreground font-robotoSlab text-xl font-medium'>
        {text}
      </h1>
      {step !== "4" && (
        <div className='absolute bottom-[-60px]  block md:hidden'>
          <ArrowBigDown
            size={50}
            strokeWidth={0.5}
            stroke='#555'
            className='fill-gray-300/30 '
          />
        </div>
      )}
    </div>
  );
}

export default OrderSteps;
